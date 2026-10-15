// Flat pictures for posts (link previews and social posts), drawn as SVG in
// the ART.md style: flat colours from the palette, no outlines, no real photos.
// Posts name their picture in `image.art`:
//
//   Illustrations.svg("gift-box", "Picture: a gift box")
//
// Previews are 254 x 104 and stretch to the width of the card.
window.Illustrations = (function () {
  var ART = {
    "gift-box": {
      viewBox: "0 0 254 104",
      body:
        '<rect width="254" height="104" fill="#F6D27A"/>' +
        '<rect x="92" y="40" width="70" height="50" rx="6" fill="#E07A55"/>' +
        '<rect x="86" y="30" width="82" height="16" rx="5" fill="#B4472A"/>' +
        '<rect x="122" y="30" width="10" height="60" fill="#FBF3E6"/>' +
        '<path d="M127 30c-8-12-22-12-20-3 1 5 12 4 20 3zM127 30c8-12 22-12 20-3-1 5-12 4-20 3z" fill="#FBF3E6"/>' +
        '<g transform="rotate(12 196 40)"><rect x="168" y="22" width="56" height="36" rx="6" fill="#FBF3E6"/>' +
        '<rect x="176" y="34" width="26" height="5" rx="2.5" fill="#F2B33D"/></g>' +
        '<circle cx="48" cy="26" r="4" fill="#FBF3E6"/><circle cx="66" cy="70" r="3" fill="#FBF3E6"/>' +
        '<circle cx="214" cy="80" r="3.5" fill="#FBF3E6"/>'
    },

    // A TV doctor on his show's set, with the show's name bar in the corner
    "tv-doctor": {
      viewBox: "0 0 254 104",
      body:
        '<rect width="254" height="104" fill="#B9D3B0"/>' +
        '<g fill="#FBF3E6" opacity=".5"><circle cx="40" cy="24" r="14"/><circle cx="214" cy="30" r="18"/><circle cx="196" cy="84" r="9"/></g>' +
        '<path d="M80 104C80 80 101 66 127 66C153 66 174 80 174 104Z" fill="#FFFFFF"/>' +
        '<path d="M117 66L127 86L137 66Z" fill="#3F7F86"/>' +
        '<rect x="120" y="52" width="14" height="16" rx="4" fill="#E2AE86"/>' +
        '<ellipse cx="127" cy="40" rx="15" ry="17" fill="#E2AE86"/>' +
        '<path d="M111.5 39c-.6-12 6.4-20 15.5-20s16.1 8 15.5 20c-3-6-8.5-9.4-15.5-9.4s-12.5 3.4-15.5 9.4z" fill="#D9D0C3"/>' +
        '<g fill="#E07A63" opacity=".45"><circle cx="116.5" cy="47" r="3"/><circle cx="137.5" cy="47" r="3"/></g>' +
        '<g fill="#3B2A20"><circle cx="121" cy="41.5" r="1.7"/><circle cx="133" cy="41.5" r="1.7"/></g>' +
        '<path d="M121.5 49.5q5.5 4 11 0" fill="none" stroke="#3B2A20" stroke-width="1.8" stroke-linecap="round"/>' +
        '<path d="M108 71q-6 18 8 23q11 3 14-8" fill="none" stroke="#6B5444" stroke-width="2.6" stroke-linecap="round"/>' +
        '<circle cx="130.5" cy="85" r="3.4" fill="#6B5444"/>' +
        '<rect x="10" y="80" width="64" height="15" rx="5" fill="#B4472A"/>' +
        '<rect x="17" y="86" width="34" height="3" rx="1.5" fill="#FBF3E6"/>'
    },

    // The fake account's profile picture: the doctor, with a check mark that
    // is part of the picture itself (that's the trick)
    "tv-doctor-avatar": {
      viewBox: "0 0 64 64",
      body:
        '<rect width="64" height="64" fill="#B9D3B0"/>' +
        '<path d="M8 64C8 51 19 44 32 44C45 44 56 51 56 64Z" fill="#FFFFFF"/>' +
        '<path d="M27 44L32 54L37 44Z" fill="#3F7F86"/>' +
        '<rect x="27" y="35" width="10" height="11" rx="3" fill="#E2AE86"/>' +
        '<ellipse cx="32" cy="27" rx="11.5" ry="13" fill="#E2AE86"/>' +
        '<path d="M20.2 26c-.4-9.2 5-15.4 11.8-15.4S44.2 16.8 43.8 26c-2.3-4.6-6.5-7.2-11.8-7.2S22.5 21.4 20.2 26z" fill="#D9D0C3"/>' +
        '<g fill="#3B2A20"><circle cx="27.5" cy="28" r="1.4"/><circle cx="36.5" cy="28" r="1.4"/></g>' +
        '<path d="M28.5 34q3.5 2.6 7 0" fill="none" stroke="#3B2A20" stroke-width="1.5" stroke-linecap="round"/>' +
        '<circle cx="50" cy="50" r="9" fill="#3F6B47"/>' +
        '<path d="M45.6 50.2l3 3 5.8-6" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
    },

    "wine-and-sneakers": {
      viewBox: "0 0 254 104",
      body:
        '<rect width="254" height="104" fill="#F6D27A"/>' +
        '<g fill="#FBF3E6"><circle cx="40" cy="30" r="4"/><circle cx="220" cy="22" r="3"/><circle cx="58" cy="80" r="3"/></g>' +
        '<path d="M84 18h38c0 22-7 36-19 36s-19-14-19-36z" fill="#FBF3E6"/>' +
        '<path d="M86.5 31h33c-1.5 12.5-7 19.5-16.5 19.5s-15-7-16.5-19.5z" fill="#8E3B46"/>' +
        '<rect x="101" y="53" width="4" height="25" rx="2" fill="#FBF3E6"/>' +
        '<ellipse cx="103" cy="80" rx="15" ry="4.5" fill="#FBF3E6"/>' +
        '<path d="M138 60c0-9 6-14 13-14 4.5 0 7 3.5 11 7.5l19 10c8.5 4.2 15 6.6 15 13v3.5h-58z" fill="#E07A55"/>' +
        '<rect x="136" y="76" width="62" height="9" rx="4.5" fill="#FBF3E6"/>' +
        '<g stroke="#FBF3E6" stroke-width="3" stroke-linecap="round"><path d="M156 55l6 4"/><path d="M161 51l6 4"/></g>'
    },

    "coin-jar": {
      viewBox: "0 0 254 104",
      body:
        '<rect width="254" height="104" fill="#B9D3B0"/>' +
        '<g fill="#FBF3E6" opacity=".5"><circle cx="46" cy="28" r="12"/><circle cx="210" cy="70" r="16"/></g>' +
        '<rect x="100" y="26" width="54" height="66" rx="13" fill="#FBF3E6"/>' +
        '<g fill="#F2B33D"><circle cx="114" cy="80" r="8"/><circle cx="131" cy="82" r="8"/><circle cx="146" cy="78" r="7"/>' +
        '<circle cx="122" cy="66" r="7.5"/><circle cx="139" cy="64" r="7.5"/><circle cx="129" cy="51" r="7"/></g>' +
        '<g fill="#F6D27A"><circle cx="114" cy="80" r="4"/><circle cx="131" cy="82" r="4"/><circle cx="139" cy="64" r="3.6"/><circle cx="129" cy="51" r="3.4"/></g>' +
        '<rect x="104" y="17" width="46" height="11" rx="4" fill="#B4472A"/>' +
        '<rect x="121" y="21" width="12" height="3" rx="1.5" fill="#FBF3E6"/>' +
        '<g fill="#F2B33D"><ellipse cx="178" cy="90" rx="10" ry="3.5"/><ellipse cx="178" cy="85" rx="10" ry="3.5"/><ellipse cx="178" cy="80" rx="10" ry="3.5"/></g>'
    }
  };

  function svg(art, label) {
    var a = ART[art];
    if (!a) return "";
    var name = label ? 'role="img" aria-label="' + label.replace(/"/g, "&quot;") + '"' : 'aria-hidden="true"';
    return '<svg viewBox="' + a.viewBox + '" ' + name + ' preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:auto">' +
      a.body + "</svg>";
  }

  return { svg: svg };
})();
