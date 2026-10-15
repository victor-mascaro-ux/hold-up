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
    replyRaisedTrust: 1,       // a reply that raised trust (sprint 3)
  },
};
