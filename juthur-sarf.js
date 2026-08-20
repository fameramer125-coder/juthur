/*  juthur-sarf.js — المِصْباحُ الصَّرفيّ
    مطبعةُ جُذور · MCMXXVI
    صمّمه وطوّره د. عادل ف. عامر · Designed and developed by Dr. Adel F. Amer
    ──────────────────────────────────────────────
    يُلوِّنُ النصَّ المشكَّلَ على طبقتين، بلا مسٍّ لحرفٍ أو حركة:
      .ev   عينُ الفعل      — الفعلُ كلُّه
      .end  الآخرُ الإعرابي — علامةُ الإعرابِ وحدَها في آخرِ الاسم
    ثلاثُ حالات: مطفأ · الأفعال · الأفعالُ والأواخر
    القاعدةُ حاذرة: ما شكَّت فيه تركَته بلا لون.
*/
(function () {
  "use strict";
  var H = "ً-ْٰـ";                 // الحركات والتنوين والشدّة والتطويل
  var STRIP = new RegExp("[" + H + "]", "g");
  var AR_WORD = new RegExp("[\\u0621-\\u064A][\\u0621-\\u064A" + H + "]*", "g");

  // أسماءٌ تبدأ بحروف المضارعة أو تشبه وزنَ الفعل — تُستثنى صراحةً
  var NOT_VERB = (
    // أسماءٌ تبدأ بحروف المضارعة
    "يد يوم يمين يسار يقين تاج تين توت تمر تفاح تراب تينة نور نار ناس نهر نخل نجم نسيم نفس نبت نبتة" +
    " أب أم أخ أخت أرض أمر أثر أمل أمس أنف أذن أصبع أسد أرنب" +
    // أسماءُ الإشارةِ والضمائرُ والموصولات
    " أنا أنت أنتِ أنتما أنتم أنتن أين أيان أنى إذن أيضا" +
    " هذا هذه هؤلاء ذلك تلك الذي التي الذين اللاتي" +
    // ظروفٌ وحروفُ جرٍّ متّصلةٌ بضمير
    " معك معه معها معي معنا معهم بعد قبل تحت فوق أمام خلف بين وسط عند لدى منذ حتى" +
    " أن أنه أنها إن إنه إنها نفس بدل سوى غير لكن لكنه لكنها ثم بل قد لما كلما بينما" +
    // أفعلُ التفضيلِ الشائعة
    " أكثر أقل أكبر أصغر أطول أقصر أوسع أضيق أعلى أدنى أقرب أبعد أسرع أبطأ أحسن أسوأ" +
    " ألين أفضل أثبت أملس أسفل أعلى أشد أخف أثقل أهم أجمل أوضح أعمق أصفى أنقى أحلى أمر أول آخر"
  ).split(" ");

  function bare(w) { return w.replace(STRIP, ""); }

  // فعلٌ مضارع: حرفُ مضارعةٍ مفتوحٌ أو مضموم، ثمّ بنيةٌ فيها سكونٌ أو شدّة، وآخرُه ضمّةٌ أو فتحة
  function isPresent(w) {
    if (!/^[يتنأا][َُ]/.test(w)) return false;
    if (bare(w).length < 3) return false;
    if (!/[ّْ]/.test(w)) return false;              // لا بدّ من سكونٍ أو شدّة في البنية
    if (!/[َُ]$/.test(w)) return false;             // مرفوعٌ أو منصوب
    if (/ً|ٌ|ٍ/.test(w)) return false;         // التنوينُ للأسماء
    return true;
  }
  // فعلٌ ماضٍ: صِيَغٌ قاطعةٌ في آخرِه
  function isPast(w) {
    if (bare(w).length < 3) return false;
    if (/َتْ$/.test(w)) return true;                    // ـَتْ
    if (/ْتُ$/.test(w) && bare(w).length > 3 && !/^ال/.test(bare(w))) return true;   // ـْتُ (لا صَوْتُ ولا وَقْتُ ولا الصَّمْتُ)
    if (/ُوا$/.test(w) && /[َ]/.test(w)) return true; // ـُوا
    if (/ْنا$/.test(w)) return true;                    // ـْنَا
    // فَعَلَ / فَعِلَ / فَعُلَ — ثلاثُ حركاتٍ متتاليةٍ بلا سكون، آخرُها فتحة
    if (/^[ء-ي]َ[ء-ي][َُِ][ء-ي]َ$/.test(w)) return true;
    return false;
  }
  var SUF = /(ها|هم|هن|كما|كم|كن|نا|ه|ك|ي)$/;
  function isVerb(w) {
    var b = bare(w);
    if (NOT_VERB.indexOf(b) > -1) return false;
    var st = b.replace(SUF, "");
    if (st.length > 1 && NOT_VERB.indexOf(st) > -1) return false;
    return isPresent(w) || isPast(w);
  }
  // علامةُ الإعراب: تنوينٌ أو حركةٌ مفردةٌ في آخرِ الاسم
  var END_RE = /([ًٌٍ]|[َُِ])$/;

  function markup(word, level) {
    if (isVerb(word)) return '<span class="ev">' + word + "</span>";
    if (level < 2) return word;
    if (/[ْـ]$/.test(word)) return word;
    var m = word.match(END_RE);
    if (!m) return word;
    if (bare(word).length < 2) return word;
    return word.slice(0, m.index) + '<span class="end">' + m[0] + "</span>";
  }

  var SEL = "#stories article p, #stories article h2 a, #stories article h3";
  var SKIP = ".guide, .meta, .leafnav";
  var saved = null;

  function nodes() {
    return Array.prototype.filter.call(document.querySelectorAll(SEL), function (el) {
      return !el.closest(SKIP);
    });
  }
  function clear() {
    if (!saved) return;
    nodes().forEach(function (el, i) { if (saved[i] !== undefined) el.innerHTML = saved[i]; });
  }
  function paint(level) {
    var els = nodes();
    if (!saved) saved = els.map(function (el) { return el.innerHTML; });
    clear();
    if (!level) return;
    els.forEach(function (el) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var texts = [], n;
      while ((n = walker.nextNode())) texts.push(n);
      texts.forEach(function (t) {
        if (!/[ء-ي]/.test(t.nodeValue)) return;
        var out = t.nodeValue.replace(AR_WORD, function (w) { return markup(w, level); });
        if (out === t.nodeValue) return;
        var span = document.createElement("span");
        span.innerHTML = out;
        t.parentNode.replaceChild(span, t);
      });
    });
  }

  function build() {
    var host = document.getElementById("sarf-lamp");
    if (!host) return;
    var LABELS = ["مُطفأ", "الأفعال", "الأفعالُ والأواخر"];
    var TITLES = ["بلا تلوين", "عينُ الفعلِ وحدَها", "عينُ الفعلِ وعلامةُ الإعراب"];
    var level = 0;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sarf-btn";
    btn.setAttribute("aria-live", "polite");
    function render() {
      btn.textContent = "المِصباحُ الصَّرفيّ · " + LABELS[level];
      btn.title = TITLES[level];
      btn.setAttribute("aria-pressed", level ? "true" : "false");
      document.documentElement.setAttribute("data-sarf", String(level));
    }
    btn.addEventListener("click", function () {
      level = (level + 1) % 3;
      paint(level);
      render();
      try { localStorage.setItem("juthur-sarf", String(level)); } catch (e) {}
    });
    host.appendChild(btn);
    var legend = document.createElement("span");
    legend.className = "sarf-legend";
    legend.innerHTML = '<span class="ev">الفعل</span> · <span class="end">علامةُ الإعراب</span>';
    host.appendChild(legend);
    render();
    var s = null;
    try { s = localStorage.getItem("juthur-sarf"); } catch (e) {}
    if (s && s !== "0") { level = parseInt(s, 10) || 0; paint(level); render(); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
