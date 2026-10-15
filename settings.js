// Every number the game uses, in one place you can read and edit.
// The GDD's numbers join this file as the sprints that use them arrive.
window.SETTINGS = {
  // How long "typing…" shows before each post arrives, in seconds
  typingSeconds: 1.5,

  // Checking tools: how many ticks each one costs. A tool costs its ticks the
  // first time you use it on a post; opening it again is free.
  toolTicks: {
    zoom: 0,     // Zoom
    source: 1,   // Source card
    article: 1,  // Open the article
  },

  // The "Forwarded _ times" counter on a post: where it starts (the GDD's
  // example, "a post caught at S = 4"), and how much each tick adds.
  // Sprint 4 replaces this with the GDD's spread formula.
  forwardsAtStart: 4,
  forwardsPerTick: 1,

  // Points, from the GDD's "Scoring and feedback" table
  points: {
    rightVerdictRightProof: 3, // Stop or Needs context, and you pointed at what gave it away
    rightVerdictNoProof: 1,    // the right call, but the wrong proof or none
    rightShare: 3,             // Share on a true post (Victor's rule: like a proven Stop)
    sharedFalse: -3,           // Share on a fake or misleading post
    stoppedTrue: -3,           // Stop or Needs context on a true post
    mixedUp: 0,                // Stop on a misleading post, or Needs context on a fake one
    perTick: -0.5,             // each spread tick before your verdict
    replyRaisedTrust: 1,       // a reply that raised trust
  },

  // ---- Replies (GDD "Answering back"). Roasts aren't in this version.

  // Trust in you runs from 0 to 100 and starts at 50 for everyone
  trustStart: 50,
  trustMin: 0,
  trustMax: 100,

  // Trust bonus T = round((trust − trustMiddle) / trustStep): −2 at 0, +2 at 100
  trustMiddle: 50,
  trustStep: 25,

  // Proof points E: the reply names the post's real trick, names nothing, or
  // names the wrong reason
  replyProof: {
    namesTheTrick: 2,
    namesNothing: 0,
    wrongReason: -3,
  },

  // Trait weights: how much each person likes (+) or dislikes (−) each reply
  // feature. "private" counts when you message them privately.
  traitWeights: {
    nina:  { empathy: 2, source: 0, joke: 1, short: 0, private: 1, trueAlternative: 0, question: 2 },
    jorge: { empathy: 0, source: 2, joke: -2, short: 0, private: 2, trueAlternative: 0, question: 0 },
    leo:   { empathy: -1, source: 0, joke: 3, short: 2, private: 0, trueAlternative: 0, question: 0 },
    duda:  { empathy: 2, source: 1, joke: 0, short: 0, private: 0, trueAlternative: 3, question: 0 },
    bia:   { empathy: 0, source: 0, joke: 1, short: 1, private: 0, trueAlternative: 0, question: 3 },
    clara: { empathy: 1, source: 3, joke: -1, short: 0, private: 1, trueAlternative: 0, question: -1 },
    paulo: { empathy: 0, source: 2, joke: -1, short: 2, private: 2, trueAlternative: 0, question: 0 },
    rafa:  { empathy: 1, source: -1, joke: 2, short: 0, private: 0, trueAlternative: 0, question: 2 },
  },

  // Reactions: the lowest R for each one. Below "ignores", they dig in.
  reactionFrom: {
    accepts: 4,
    stung: 2,
    ignores: -3,
  },

  // How each reaction changes their trust in you
  trustChange: {
    accepts: 10,
    stung: -5,
    ignores: 0,
    digsIn: -10,
  },

  // Extra trust changes on top of the reaction
  trustExtra: {
    acceptedInPrivate: 5, // they accepted (even if stung) in private: you saved their face
    wrongReason: -10,     // your reply named the wrong reason
    confirmedTrue: 5,     // you confirmed a true post
  },
};
