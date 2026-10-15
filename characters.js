// The Family cast, drawn as SVG on a 64x64 grid (see ART.md, "Characters").
// Each character is one drawing with a face setting, so a reaction only swaps
// the face:
//
//   Characters.avatar("jorge", "relieved", 44, "Grandpa Jorge")
//
// returns the round, pastel-framed portrait as HTML. Faces: neutral (ignores),
// relieved (accepts), stung (accepts, but stung), pouting (digs in).
// Jorge, Nina and Rosa are copied from art/reference/family-chat.html.
window.Characters = (function () {
  var FACES = ["neutral", "relieved", "stung", "pouting"];
  var SHOULDERS = "M6 64C6 51 18 45 32 45C46 45 58 51 58 64Z";
  var CHEEK = "#E07A63";

  var CAST = {
    jorge: {
      background: "#F6D78B",
      skin: "#E8B48A",
      top: "#A86B3C",
      ink: "#3B2A20",
      body:
        '<path d="' + SHOULDERS + '" fill="#A86B3C"/>' +
        '<path d="M25 45.5L32 54L39 45.5Z" fill="#F4EBDD"/>' +
        '<rect x="27" y="36" width="10" height="10" rx="3" fill="#E8B48A"/>' +
        '<circle cx="19.8" cy="29.5" r="3" fill="#E8B48A"/><circle cx="44.2" cy="29.5" r="3" fill="#E8B48A"/>' +
        '<ellipse cx="32" cy="28" rx="12.5" ry="13.5" fill="#E8B48A"/>' +
        '<g fill="#FFFFFF"><ellipse cx="20.6" cy="25" rx="2.8" ry="4.4"/><ellipse cx="43.4" cy="25" rx="2.8" ry="4.4"/>' +
        '<path d="M26 35.2c2-2.2 4.6-2.2 6-.7c1.4-1.5 4-1.5 6 .7c-2 1.3-4.2 1.1-6-.3c-1.8 1.4-4 1.6-6 .3z"/></g>',
      glasses:
        '<g fill="none" stroke="#3B2A20" stroke-width="1.4"><circle cx="27" cy="28.5" r="4.2"/>' +
        '<circle cx="37" cy="28.5" r="4.2"/><path d="M31.2 28.5h1.6"/></g>',
      front: "",
      eyeY: 28.8, eyeR: 1.3, highlight: false,
      browY: 22.6, browColor: "#FFFFFF", browWidth: 1.8,
      mouthY: 38.6, mouthOpen: 2.8,
      cheeks: [[23, 33], [41, 33]]
    },

    nina: {
      background: "#F4B6A6",
      skin: "#B97A56",
      top: "#D9653B",
      ink: "#2A1A14",
      body:
        '<g fill="#3A2620"><circle cx="32" cy="11.5" r="6"/><ellipse cx="32" cy="28" rx="14.5" ry="15.5"/></g>' +
        '<path d="' + SHOULDERS + '" fill="#D9653B"/>' +
        '<g stroke="#F4EBDD" stroke-width="1.6" stroke-linecap="round"><path d="M28.5 47v7"/><path d="M35.5 47v7"/></g>' +
        '<rect x="27" y="36" width="10" height="10" rx="3" fill="#B97A56"/>' +
        '<ellipse cx="32" cy="29" rx="12" ry="13" fill="#B97A56"/>' +
        '<path d="M19.6 27c1-8 6-12.5 12.4-12.5s11.4 4.5 12.4 12.5c-3.6-3.4-7.8-5-12.4-5s-8.8 1.6-12.4 5z" fill="#3A2620"/>' +
        '<circle cx="20.6" cy="35" r="2.2" fill="none" stroke="#F2B33D" stroke-width="1.4"/>',
      glasses: "",
      front: "",
      eyeY: 29.5, eyeR: 1.8, highlight: true,
      browY: 24.9, browColor: "#2A1A14", browWidth: 1.4,
      mouthY: 35.6, mouthOpen: 3.6,
      cheeks: [[24, 34], [40, 34]]
    },

    rosa: {
      background: "#B9D3B0",
      skin: "#E2AE86",
      top: "#3F7F86",
      ink: "#3B2A20",
      body:
        '<g fill="#8E3B46"><circle cx="20" cy="23" r="7"/><circle cx="25.5" cy="15.5" r="7"/><circle cx="33" cy="12.5" r="7.5"/>' +
        '<circle cx="40.5" cy="15.5" r="7"/><circle cx="45" cy="23" r="7"/><circle cx="18.5" cy="31.5" r="5.5"/>' +
        '<circle cx="45.5" cy="31.5" r="5.5"/></g>' +
        '<path d="' + SHOULDERS + '" fill="#3F7F86"/>' +
        '<rect x="27" y="36" width="10" height="11" rx="3" fill="#E2AE86"/>' +
        '<ellipse cx="32" cy="29" rx="12" ry="13" fill="#E2AE86"/>' +
        '<g fill="#8E3B46"><circle cx="26.5" cy="16.5" r="4.8"/><circle cx="32.5" cy="15" r="5"/><circle cx="38.5" cy="17" r="4.8"/></g>' +
        '<g fill="#F2B33D"><circle cx="26" cy="49" r="1.3"/><circle cx="29" cy="50.6" r="1.3"/><circle cx="32" cy="51.2" r="1.3"/>' +
        '<circle cx="35" cy="50.6" r="1.3"/><circle cx="38" cy="49" r="1.3"/></g>',
      glasses:
        '<g fill="none" stroke="#B4472A" stroke-width="1.6"><circle cx="27" cy="30" r="4.6"/>' +
        '<circle cx="37" cy="30" r="4.6"/><path d="M31.6 30h.8"/></g>',
      front: "",
      eyeY: 30, eyeR: 1.3, highlight: false,
      browY: 24.2, browColor: "#3B2A20", browWidth: 1.4,
      mouthY: 37, mouthOpen: 3.2,
      cheeks: [[23.5, 35], [40.5, 35]]
    },

    mom: {
      background: "#CFE0EA",
      skin: "#CF9670",
      top: "#D9A13B",
      ink: "#3B2A20",
      body:
        // shoulder-length wavy hair, behind the head
        '<path d="M32 13.4c-9.4 0-16 6.8-16 16.2v6.4c0 1.8-1.4 2.8-1 4.8.5 2.2 2.4 2.2 3.4 3.6.8 1.2 2 1.8 3.6 1.6h20' +
        'c1.6.2 2.8-.4 3.6-1.6 1-1.4 2.9-1.4 3.4-3.6.4-2-1-3-1-4.8v-6.4c0-9.4-6.6-16.2-16-16.2z" fill="#5A3A2A"/>' +
        '<path d="' + SHOULDERS + '" fill="#D9A13B"/>' +
        '<path d="M26.4 45.3q5.6 5.4 11.2 0z" fill="#CF9670"/>' +
        '<rect x="27" y="36" width="10" height="10" rx="3" fill="#CF9670"/>' +
        '<ellipse cx="32" cy="28.6" rx="12" ry="13" fill="#CF9670"/>' +
        // side part on her right, a wave sweeping across the forehead
        '<path d="M20.2 31C19 22 23 15 29 14.2C37 13.2 45.4 18 44.4 30C43 24.5 39 21.5 33.5 21.8' +
        'C30.6 22 28.4 20.8 27.2 18.8C24.4 21.4 21.6 25 20.2 31Z" fill="#5A3A2A"/>' +
        '<g fill="#FFFFFF"><circle cx="20.4" cy="35.2" r="1.4"/><circle cx="43.6" cy="35.2" r="1.4"/></g>',
      glasses: "",
      front: "",
      eyeY: 29.6, eyeR: 1.5, highlight: false,
      browY: 24.6, browColor: "#3A2620", browWidth: 1.4,
      mouthY: 36.4, mouthOpen: 3.4,
      cheeks: [[23.5, 34.6], [40.5, 34.6]]
    }
  };

  // A darker shade of a colour, for arms in front of the same top
  function shade(hex, amount) {
    var n = parseInt(hex.slice(1), 16);
    var channels = [n >> 16, (n >> 8) & 255, n & 255].map(function (c) {
      return Math.round(c * (1 - amount));
    });
    return "#" + channels.map(function (c) { return (c < 16 ? "0" : "") + c.toString(16); }).join("");
  }

  function strokes(color, width, paths) {
    return '<g fill="none" stroke="' + color + '" stroke-width="' + width +
      '" stroke-linecap="round" stroke-linejoin="round">' +
      paths.map(function (d) { return '<path d="' + d + '"/>'; }).join("") + "</g>";
  }

  // Two forearms crossing over the chest, elbows out of frame, hands on the
  // opposite sides
  function crossedArms(c) {
    return '<g stroke-width="8" stroke-linecap="round">' +
      '<path d="M52 59L21 51.4" stroke="' + shade(c.top, 0.28) + '"/>' +
      '<circle cx="19.6" cy="51" r="3.5" fill="' + c.skin + '" stroke="none"/>' +
      '<path d="M12 59L43 51.4" stroke="' + shade(c.top, 0.14) + '"/>' +
      '<circle cx="44.4" cy="51" r="3.5" fill="' + c.skin + '" stroke="none"/></g>';
  }

  function cheeks(c, face) {
    var r = { neutral: 2.2, relieved: 2.6, stung: 2.2, pouting: 3.2 }[face];
    var opacity = { neutral: 0.45, relieved: 0.7, stung: 0.45, pouting: 0.6 }[face];
    return '<g fill="' + CHEEK + '" opacity="' + opacity + '">' +
      c.cheeks.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '"/>'; }).join("") +
      "</g>";
  }

  function eyes(c, face) {
    var y = c.eyeY;
    if (face === "relieved") {
      // closed, happy
      return strokes(c.ink, 1.5, ["M24.9 " + (y + 0.7) + "q2.1-2.4 4.2 0", "M34.9 " + (y + 0.7) + "q2.1-2.4 4.2 0"]);
    }
    if (face === "stung") {
      // half-closed, looking aside
      return '<g fill="' + c.ink + '"><circle cx="28.1" cy="' + (y + 0.4) + '" r="' + c.eyeR + '"/>' +
        '<circle cx="38.1" cy="' + (y + 0.4) + '" r="' + c.eyeR + '"/></g>' +
        strokes(c.ink, 1.4, ["M24.8 " + (y - 0.5) + "h4.6", "M34.8 " + (y - 0.5) + "h4.6"]);
    }
    var dots = '<g fill="' + c.ink + '"><circle cx="27" cy="' + y + '" r="' + c.eyeR + '"/>' +
      '<circle cx="37" cy="' + y + '" r="' + c.eyeR + '"/></g>';
    if (c.highlight) {
      dots += '<g fill="#FFFFFF"><circle cx="27.7" cy="' + (y - 0.7) + '" r=".6"/>' +
        '<circle cx="37.7" cy="' + (y - 0.7) + '" r=".6"/></g>';
    }
    return dots;
  }

  function brows(c, face) {
    var b = c.browY;
    var paths = {
      neutral: ["M23.8 " + b + "q2.9-1.6 5.8-.4", "M34.4 " + (b - 0.4) + "q2.9-1.2 5.8.4"],
      relieved: ["M23.6 " + (b - 1.4) + "q3-2.4 6-.8", "M34.4 " + (b - 2.2) + "q3-1.6 6 .8"],
      stung: ["M23.6 " + (b - 1.8) + "q3-2.6 6-.6", "M34.6 " + (b + 0.5) + "q2.8-.4 5.6 0"],
      pouting: ["M23.8 " + (b - 0.8) + "l5.6 1.8", "M40.2 " + (b - 0.8) + "l-5.6 1.8"]
    }[face];
    return strokes(c.browColor, c.browWidth, paths);
  }

  function mouth(c, face) {
    var m = c.mouthY;
    if (face === "relieved") {
      var top = m - 0.6, h = c.mouthOpen;
      return '<path d="M28.8 ' + top + "h6.4q0 " + h + " -3.2 " + h + "t-3.2-" + h + 'z" fill="' + c.ink + '"/>';
    }
    var d = {
      neutral: "M29.8 " + m + "q2.2 1.4 4.4 0",
      stung: "M30.2 " + (m + 0.4) + "h4.2",
      pouting: "M29.8 " + (m + 1) + "q2.2-1.4 4.4 0"
    }[face];
    return strokes(c.ink, 1.4, [d]);
  }

  // The portrait alone, without its round frame
  function svg(id, face, size, label) {
    var c = CAST[id];
    if (FACES.indexOf(face) === -1) face = "neutral";
    var name = label ? 'role="img" aria-label="' + label + '"' : 'aria-hidden="true"';
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 64 64" ' + name + ' style="display:block">' +
      c.body +
      (face === "pouting" ? crossedArms(c) : "") +
      cheeks(c, face) + c.glasses + eyes(c, face) + mouth(c, face) + brows(c, face) + c.front +
      "</svg>";
  }

  // The portrait inside its round, pastel frame
  function avatar(id, face, size, label) {
    return '<span class="avatar" style="display:inline-block;flex:none;width:' + size + "px;height:" + size +
      "px;border-radius:50%;overflow:hidden;background:" + CAST[id].background + '">' +
      svg(id, face, size, label) + "</span>";
  }

  return {
    ids: Object.keys(CAST),
    faces: FACES.slice(),
    svg: svg,
    avatar: avatar
  };
})();
