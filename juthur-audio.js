/* جُذور — المكتبةُ الصوتيّة. مشغّلٌ فقط: بلا حركة، بلا تشغيلٍ تلقائيّ، والتنزيلُ متاح. */
(function () {
  "use strict";
  var KEY = document.documentElement.getAttribute("data-audio-id");
  if (!KEY) return;
  fetch("/juthur/audio/manifest.json", { cache: "no-cache" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (m) {
      if (!m || !m.items || !m.items.length) return;
      var it = null, i;
      for (i = 0; i < m.items.length; i++) if (m.items[i].id === KEY) { it = m.items[i]; break; }
      if (!it || !it.src) return;
      var host = document.querySelector("main.wrap") || document.body;
      var box = document.createElement("section");
      box.className = "audiobox";
      box.setAttribute("aria-label", "القراءةُ المرجعيّة");
      box.innerHTML =
        '<h2 style="margin-top:0">القِراءةُ المَرجِعيّة</h2>' +
        '<audio controls preload="none" src="' + it.src + '" style="width:100%"></audio>' +
        '<p style="font-size:.82rem;margin:.6rem 0 0">' +
        (it.reciter ? '<span>' + it.reciter + '</span> · ' : '') +
        (it.duration ? '<span>' + it.duration + '</span> · ' : '') +
        '<a href="' + it.src + '" download>نزِّلِ التسجيلَ للاستماعِ بلا شبكة</a></p>';
      var anchor = host.querySelector("h2");
      if (anchor) host.insertBefore(box, anchor); else host.appendChild(box);
    })
    .catch(function () {});
})();
