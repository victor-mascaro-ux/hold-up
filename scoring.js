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

  return {
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
