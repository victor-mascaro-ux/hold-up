// Hold Up! / Peraí! — the rules for checking and scoring a post, with no
// screen code. The game (game.js) and the report (report.html) both use it,
// so they always agree. Every number comes from settings.js.
//
// A play is what the player did with one post:
//   { verdict: "share" | "stop" | "needs-context",
//     proof: a clue id or null,
//     used: { zoom: true/false, source: true/false, article: true/false } }
//
// Clue ids: "source.url" (the web address), "headline", "image", "message",
// "date", "finePrint", "source.about" (who posted it), "article.p1", "article.p2"…
window.Scoring = (function () {
  var TOOLS = ["zoom", "source", "article"];

  function settings() { return window.SETTINGS; }

  function noTools() { return { zoom: false, source: false, article: false }; }

  // Which tool reveals a clue; null means it's on the post for anyone to see
  function revealedBy(clue) {
    if (clue === "date" || clue === "finePrint") return "zoom";
    if (clue === "source.about") return "source";
    if (clue.indexOf("article.") === 0) return "article";
    return null;
  }

  // Open the article only works on posts that link to one
  function hasTool(post, tool) {
    return tool !== "article" || !!post.text.en.article;
  }

  // Every clue a post has, in the order they're offered
  function clues(post) {
    var t = post.text.en;
    var list = [];
    if (post.kind === "link") list.push("source.url");
    list.push("headline");
    if (post.image && post.image.art) list.push("image");
    list.push("message", "date");
    if (t.finePrint) list.push("finePrint");
    list.push("source.about");
    (t.article || []).forEach(function (paragraph, i) { list.push("article.p" + (i + 1)); });
    return list;
  }

  // The clues you can point at, given the tools you've used
  function cluesAvailable(post, used) {
    return clues(post).filter(function (clue) {
      var tool = revealedBy(clue);
      return !tool || used[tool];
    });
  }

  function toolTicks(tool) { return settings().toolTicks[tool] || 0; }

  // Each tool costs its ticks once per post
  function ticks(used) {
    return TOOLS.reduce(function (sum, tool) { return sum + (used[tool] ? toolTicks(tool) : 0); }, 0);
  }

  function forwards(tickCount) {
    return settings().forwardsAtStart + settings().forwardsPerTick * tickCount;
  }

  // "true", "fake" or "misleading", from the post's right answer
  function truth(post) {
    if (post.verdict === "share") return "true";
    return post.verdict === "stop" ? "fake" : "misleading";
  }

  // The points for one play, and why
  function score(post, play) {
    var points = settings().points;
    var result = { outcome: null, proof: "none", verdictPoints: 0, ticks: ticks(play.used), tickPoints: 0, total: 0 };

    if (play.verdict === post.verdict) {
      if (truth(post) === "true") {
        result.outcome = "rightShare";
        result.verdictPoints = points.rightShare;
      } else {
        if (play.proof) result.proof = post.evidence.indexOf(play.proof) !== -1 ? "right" : "wrong";
        result.outcome = result.proof === "right" ? "rightWithProof" : "rightNoProof";
        result.verdictPoints = result.proof === "right" ? points.rightVerdictRightProof : points.rightVerdictNoProof;
      }
    } else if (play.verdict === "share") {
      result.outcome = "sharedFalse";
      result.verdictPoints = points.sharedFalse;
    } else if (truth(post) === "true") {
      result.outcome = "stoppedTrue";
      result.verdictPoints = points.stoppedTrue;
    } else {
      result.outcome = "mixedUp";
      result.verdictPoints = points.mixedUp;
    }

    result.tickPoints = result.ticks * points.perTick;
    result.total = result.verdictPoints + result.tickPoints;
    return result;
  }

  // The cheapest way to see one of the clues that gave a post away
  function cheapestProof(post) {
    var best = null;
    post.evidence.forEach(function (clue) {
      var used = noTools();
      var tool = revealedBy(clue);
      if (tool) used[tool] = true;
      var cost = ticks(used);
      if (!best || cost < best.ticks) best = { clue: clue, used: used, ticks: cost };
    });
    return best;
  }

  // Three ways to play every post, for the report
  var strategies = {
    shareEverything: function () {
      return { verdict: "share", proof: null, used: noTools() };
    },
    stopEverything: function () {
      return { verdict: "stop", proof: null, used: noTools() };
    },
    perfect: function (post) {
      if (truth(post) === "true") return { verdict: "share", proof: null, used: noTools() };
      var proof = cheapestProof(post);
      return { verdict: post.verdict, proof: proof.clue, used: proof.used };
    }
  };

  // ---------------------------------------------------------------- replies
  //
  // Every verdict gets a reply, and the replies fit what you decided:
  //   stance "share": you agree with the post (after Share)
  //   stance "stop":  you correct it (after Stop or Needs context)
  // A post's replies are post.replies[stance][channel], three each, where
  // channel is "group" or "private". A reply is
  // { features: [...], cites: a trick or null, en, "pt-BR" }; sending it
  // privately adds the "private" feature. Everything follows the GDD's
  // "Answering back".

  function stanceOf(verdict) { return verdict === "share" ? "share" : "stop"; }

  var REPLY_FEATURES = ["empathy", "source", "joke", "short", "private", "trueAlternative", "question"];

  // T = round((trust − 50) / 25), from −2 to +2
  function trustBonus(trust) {
    var s = settings();
    return Math.round((trust - s.trustMiddle) / s.trustStep);
  }

  // E: does the reply name the post's real trick, nothing, or the wrong reason?
  function replyProof(post, reply) {
    var proof = settings().replyProof;
    if (!reply.cites) return { kind: "namesNothing", points: proof.namesNothing };
    if (post.tricks.indexOf(reply.cites) !== -1) return { kind: "namesTheTrick", points: proof.namesTheTrick };
    return { kind: "wrongReason", points: proof.wrongReason };
  }

  function replyFeatures(reply, channel) {
    var list = reply.features.slice();
    if (channel === "private" && list.indexOf("private") === -1) list.push("private");
    return REPLY_FEATURES.filter(function (f) { return list.indexOf(f) !== -1; });
  }

  // R = E + Σ weight × feature + T (no roasts, so J = 0)
  function receptionScore(post, reply, channel, person, trust) {
    var weights = settings().traitWeights[person];
    var proof = replyProof(post, reply);
    var features = replyFeatures(reply, channel).map(function (f) { return { name: f, weight: weights[f] || 0 }; });
    var bonus = trustBonus(trust);
    var total = proof.points + bonus + features.reduce(function (sum, f) { return sum + f.weight; }, 0);
    return { proof: proof, features: features, trustBonus: bonus, total: total };
  }

  // 4 or more accepts, 2 to 3 stung, −3 to 1 ignores, below −3 digs in
  function reaction(R) {
    var from = settings().reactionFrom;
    if (R >= from.accepts) return "accepts";
    if (R >= from.stung) return "stung";
    if (R >= from.ignores) return "ignores";
    return "digsIn";
  }

  // The whole answer to one reply: R, the reaction and the trust change.
  // The reaction table applies to every reply. On top of it: a correction
  // accepted in private saves their face, a wrong reason costs trust, and
  // agreeing with a true post counts as confirming it.
  function answer(post, reply, stance, channel, person, trust) {
    var s = settings();
    var r = receptionScore(post, reply, channel, person, trust);
    var react = reaction(r.total);
    var changes = [{ why: react, amount: s.trustChange[react] }];
    if (stance === "stop" && channel === "private" && (react === "accepts" || react === "stung")) {
      changes.push({ why: "acceptedInPrivate", amount: s.trustExtra.acceptedInPrivate });
    }
    if (r.proof.kind === "wrongReason") changes.push({ why: "wrongReason", amount: s.trustExtra.wrongReason });
    if (stance === "share" && truth(post) === "true" && r.proof.kind !== "wrongReason") {
      changes.push({ why: "confirmedTrue", amount: s.trustExtra.confirmedTrue });
    }
    var change = changes.reduce(function (sum, c) { return sum + c.amount; }, 0);
    var after = Math.max(s.trustMin, Math.min(s.trustMax, trust + change));
    return {
      R: r,
      reaction: react,
      changes: changes,
      trustBefore: trust,
      trustAfter: after,
      points: after > trust ? s.points.replyRaisedTrust : 0
    };
  }

  // Every reply a post offers after a stance, with the channel it's sent in
  function replyOptions(post, stance) {
    var list = [];
    ["group", "private"].forEach(function (channel) {
      (post.replies[stance][channel] || []).forEach(function (reply, i) {
        list.push({ channel: channel, index: i, reply: reply });
      });
    });
    return list;
  }

  return {
    stanceOf: stanceOf,
    trustBonus: trustBonus,
    receptionScore: receptionScore,
    reaction: reaction,
    answer: answer,
    replyOptions: replyOptions,
    tools: TOOLS.slice(),
    noTools: noTools,
    revealedBy: revealedBy,
    hasTool: hasTool,
    cluesAvailable: cluesAvailable,
    toolTicks: toolTicks,
    ticks: ticks,
    forwards: forwards,
    truth: truth,
    score: score,
    strategies: strategies
  };
})();
