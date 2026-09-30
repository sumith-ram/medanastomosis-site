/* MedAnastomosis — shared page script: mobile menu, creator cards, profile pop-up, forms */
(function () {
  "use strict";

  /* ---------- mobile navigation ---------- */
  document.querySelectorAll(".menu").forEach(function (menu, i) {
    var summary = menu.querySelector("summary");
    var panel = menu.querySelector(".menu-panel");
    if (!summary || !panel) return;
    panel.id = panel.id || "mobile-navigation-" + i;
    summary.setAttribute("aria-controls", panel.id);
    function syncMenu() {
      summary.setAttribute("aria-expanded", String(menu.open));
      summary.setAttribute("aria-label", menu.open ? "Close menu" : "Open menu");
    }
    function closeMenu(restoreFocus) {
      menu.open = false;
      syncMenu();
      if (restoreFocus) summary.focus();
    }
    menu.addEventListener("toggle", syncMenu);
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu(false);
    });
    menu.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.open) {
        e.preventDefault();
        closeMenu(true);
      }
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target)) closeMenu(false);
    });
    document.addEventListener("focusin", function (e) {
      if (!menu.contains(e.target)) closeMenu(false);
    });
    window.addEventListener("resize", function () {
      if (!summary.getClientRects().length) closeMenu(false);
    });
    syncMenu();
  });

  /* ---------- icons ---------- */
  var ICON = {
    instagram: '<svg viewBox="0 0 24 24"><rect class="ic" x="3.5" y="3.5" width="17" height="17" rx="5"/><circle class="ic" cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><rect class="ic" x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2l5 2.8-5 2.8z" fill="currentColor"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><rect class="ic" x="3.5" y="3.5" width="17" height="17" rx="3"/><path class="ic" d="M8 10.5V16M8 7.8v.1M11.5 16v-3.2c0-1.4 1-2.3 2.2-2.3s2.3.9 2.3 2.3V16M11.5 10.5V16"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path class="ic" d="M4.5 4.5l15 15M19.5 4.5l-15 15"/></svg>',
    website: '<svg viewBox="0 0 24 24"><circle class="ic" cx="12" cy="12" r="9"/><path class="ic" d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path class="ic" d="M5 12h14M13 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path class="ic" d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  var NETWORK = { instagram: "Instagram", youtube: "YouTube", linkedin: "LinkedIn", x: "X", website: "Website" };
  var ORDER = ["instagram", "youtube", "linkedin", "x", "website"];
  var STAGE_TINT = {
    "Medical student": ["rgba(124,231,199,.55)", "rgba(158,214,238,.35)"],
    "FMG": ["rgba(143,221,214,.55)", "rgba(124,231,199,.3)"],
    "Resident": ["rgba(158,214,238,.55)", "rgba(177,195,246,.35)"],
    "Doctor": ["rgba(177,195,246,.5)", "rgba(196,177,255,.35)"],
    "Consultant": ["rgba(196,177,255,.55)", "rgba(158,214,238,.3)"]
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safeUrl(u) {
    if (typeof u !== "string" || !/^https?:\/\//i.test(u.trim()) || /\s/.test(u.trim())) return "";
    try {
      var parsed = new URL(u.trim());
      return /^(https?:)$/.test(parsed.protocol) && parsed.hostname && !parsed.username && !parsed.password ? parsed.href : "";
    } catch (e) {
      return "";
    }
  }
  function initials(name) {
    var parts = String(name || "").replace(/^Dr\.?\s+/i, "").trim().split(/\s+/);
    return ((parts[0] || "")[0] || "").toUpperCase() + ((parts[1] || "")[0] || "").toUpperCase();
  }
  function networks(c) {
    return ORDER.filter(function (k) { return c.socials && c.socials[k]; });
  }
  function photoHtml(c) {
    var tint = STAGE_TINT[c.stage] || STAGE_TINT.Doctor;
    var inner = c.photo
      ? '<img src="' + esc(c.photo) + '" alt="' + esc(c.sample ? "AI-generated illustrative portrait: " + c.title : c.name) + '" width="800" height="1000" loading="lazy" decoding="async">'
      : '<div class="ph" style="--c1:' + tint[0] + ";--c2:" + tint[1] + '"><span aria-hidden="true">' + esc(initials(c.name)) + "</span></div>";
    return (
      '<div class="photo">' + inner +
      '<span class="stage">' + esc(c.stage) + "</span>" +
      (c.sample ? '<span class="sample">Sample</span>' : "") +
      "</div>"
    );
  }
  function socialIcons(c) {
    return networks(c).map(function (k) {
      var s = c.socials[k], url = safeUrl(s.url), label = NETWORK[k] + ": " + (s.handle || "");
      return url
        ? '<a class="soc" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(label + " (opens in a new tab)") + '" title="' + esc(label) + '">' + ICON[k] + "</a>"
        : '<span class="soc" role="img" aria-label="' + esc(NETWORK[k] + " link unavailable") + '" title="' + esc(NETWORK[k] + " link unavailable") + '">' + ICON[k] + "</span>";
    }).join("");
  }
  function cardHtml(c, i) {
    var first = networks(c)[0];
    var handle = first ? c.socials[first].handle : "";
    return (
      '<article class="creator">' + photoHtml(c) +
      '<div class="cbody">' +
      "<div><h3>" + esc(c.name) + '</h3><p class="cmeta">' + esc(c.title) + (c.city ? " · " + esc(c.city) : "") + "</p></div>" +
      (handle ? '<p class="handle">' + esc(handle) + "</p>" : "") +
      '<div class="socials">' + socialIcons(c) + "</div>" +
      '<div class="cfoot"><span class="reach">' + esc(c.reach || "") + '</span>' +
      '<button class="linkbtn" type="button" data-profile="' + i + '" aria-haspopup="dialog" aria-label="' + esc("View profile: " + c.name + ", " + c.title + (c.city ? ", " + c.city : "")) + '">View profile' + ICON.arrow + "</button></div>" +
      "</div></article>"
    );
  }

  var DATA = (window.MA_CREATORS || []).slice();

  /* ---------- profile pop-up ---------- */
  var dlg = document.getElementById("profile");
  var profileTrigger = null;
  var previousOverflow = "";
  function openProfile(i, trigger) {
    var c = DATA[i];
    if (!c || !dlg || dlg.open) return;
    profileTrigger = trigger;
    var bio = c.bio && !/^\s*\[.*\]\s*$/.test(c.bio)
      ? c.bio : "Creator biography is not available yet.";
    var links = networks(c).map(function (k) {
      var s = c.socials[k], url = safeUrl(s.url);
      var row = ICON[k] + '<span class="pl-net">' + NETWORK[k] + "</span><span>" + esc(url ? (s.handle || "Visit profile") : "Link unavailable") + "</span>";
      return url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(NETWORK[k] + ": " + (s.handle || c.name) + " (opens in a new tab)") + '">' + row + "</a>" : '<div class="social-unavailable">' + row + "</div>";
    }).join("");
    dlg.removeAttribute("aria-label");
    dlg.setAttribute("aria-labelledby", "profile-name");
    dlg.setAttribute("aria-describedby", "profile-description");
    dlg.innerHTML =
      '<button class="close" type="button" aria-label="Close profile" autofocus>' + ICON.close + "</button>" +
      '<div class="pgrid">' + photoHtml(c) +
      '<div class="pinfo">' +
      '<span class="mono" style="color:var(--teal)">' + esc(c.specialty || c.stage) + "</span>" +
      '<h2 id="profile-name">' + esc(c.name) + "</h2>" +
      '<p class="small">' + esc(c.title) + (c.city ? " · " + esc(c.city) : "") + (c.reach ? " · " + esc(c.reach) : "") + "</p>" +
      (c.sample ? '<p class="sample-profile-note">Sample profile with an AI-generated temporary portrait. This is not a real creator listing.</p>' : "") +
      '<p id="profile-description" style="color:var(--muted)">' + esc(bio) + "</p>" +
      (c.topics && c.topics.length ? '<div class="topics">' + c.topics.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" : "") +
      (links ? '<div class="plinks">' + links + "</div>" : "") +
      "</div></div>";
    dlg.querySelectorAll("svg").forEach(function (svg) { svg.setAttribute("aria-hidden", "true"); });
    dlg.querySelector(".close").addEventListener("click", function () { dlg.close(); });
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dlg.showModal();
    dlg.scrollTop = 0;
    dlg.querySelector(".close").focus({ preventScroll: true });
  }
  if (dlg) {
    dlg.addEventListener("click", function (e) {
      var box = dlg.getBoundingClientRect();
      if (e.target === dlg && (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom)) dlg.close();
    });
    dlg.addEventListener("close", function () {
      document.documentElement.style.overflow = previousOverflow;
      if (profileTrigger && profileTrigger.isConnected) profileTrigger.focus({ preventScroll: true });
    });
    // Native showModal makes the background inert; wrap keyboard focus within the dialog.
    dlg.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = Array.prototype.slice.call(dlg.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'))
        .filter(function (el) { return el.getClientRects().length; });
      var first = focusable[0], last = focusable[focusable.length - 1];
      if ((e.shiftKey && document.activeElement === first) || (!e.shiftKey && document.activeElement === last)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-profile]");
    if (b) openProfile(+b.getAttribute("data-profile"), b);
  });

  /* ---------- featured row (Home) ---------- */
  document.querySelectorAll("[data-featured-creators]").forEach(function (el) {
    var limit = +el.getAttribute("data-featured-creators") || 4;
    var picks = DATA.map(function (c, i) { return [c, i]; }).filter(function (p) { return p[0].featured; }).slice(0, limit);
    el.innerHTML = picks.map(function (p) { return cardHtml(p[0], p[1]); }).join("");
  });

  /* ---------- directory (Our Creators) ---------- */
  var grid = document.getElementById("creator-grid");
  if (grid) {
    var search = document.getElementById("creator-search");
    var specialty = document.getElementById("creator-specialty");
    var count = document.getElementById("creator-count");
    var note = document.getElementById("sample-note");
    var stageBtns = Array.prototype.slice.call(document.querySelectorAll("[data-stage]"));
    var selectedStage = stageBtns.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })[0];
    var stage = selectedStage ? selectedStage.getAttribute("data-stage") : "All";

    var specs = DATA.map(function (c) { return c.specialty; }).filter(Boolean)
      .filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    specs.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s; o.textContent = s;
      if (specialty && !Array.prototype.some.call(specialty.options, function (option) { return option.value === s; })) specialty.appendChild(o);
    });
    if (note && !DATA.some(function (c) { return c.sample; })) note.hidden = true;

    function render() {
      var q = (search ? search.value : "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
      var sp = specialty ? specialty.value : "";
      var rows = DATA.map(function (c, i) { return [c, i]; }).filter(function (p) {
        var c = p[0];
        if (stage !== "All" && c.stage !== stage) return false;
        if (sp && c.specialty !== sp) return false;
        if (!q.length) return true;
        var hay = [c.name, c.title, c.city, c.specialty, c.stage].concat(c.topics || [])
          .concat(networks(c).map(function (k) { return c.socials[k].handle; })).join(" ").toLocaleLowerCase();
        return q.every(function (term) { return hay.indexOf(term) !== -1; });
      });
      grid.innerHTML = rows.length
        ? rows.map(function (p) { return cardHtml(p[0], p[1]); }).join("")
        : '<div class="empty"><p>No creators match these filters.</p><p>Try another name, city, topic or specialty.</p><button class="btn btn-g" type="button" data-clear-filters>Clear filters</button></div>';
      if (count) count.textContent = rows.length + (rows.length === 1 ? " creator" : " creators");
    }
    stageBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        stage = b.getAttribute("data-stage");
        stageBtns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        render();
      });
    });
    grid.addEventListener("click", function (e) {
      if (!e.target.closest("[data-clear-filters]")) return;
      stage = "All";
      if (search) search.value = "";
      if (specialty) specialty.value = "";
      stageBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-stage") === "All")); });
      render();
      if (search) search.focus();
    });
    if (search) search.addEventListener("input", render);
    if (specialty) specialty.addEventListener("change", render);
    render();
  }

  /* ---------- local form validation ----------
     No submission service is supplied. This handler intentionally never sends or stores
     personal information. Connecting a backend requires an explicit integration here,
     including accepted-response handling, pending/error states and delivery verification. */
  document.querySelectorAll("form[data-form], form[data-demo]").forEach(function (f, formIndex) {
    var fields = Array.prototype.slice.call(f.querySelectorAll("input, select, textarea"));
    var status = f.querySelector(".form-status");
    var attempted = false;
    f.noValidate = true;

    function errorFor(field) {
      var value = field.value.trim();
      var label = field.labels && field.labels[0] ? field.labels[0].textContent.replace(/\s*\(optional\)\s*/i, "").replace(/\*/g, "").trim() : "This field";
      if (field.required && !value) return label + " is required.";
      if (!value) return "";
      if (field.type === "email" && field.validity.typeMismatch) return "Enter a valid email address, such as name@example.com.";
      if (field.type === "url" && !safeUrl(value)) return "Enter a full website address starting with https:// or http://.";
      if (field.validity.tooShort) return "Use at least " + field.minLength + " characters.";
      if (field.validity.patternMismatch) return field.title || "Check the format of this field.";
      return "";
    }
    function validateField(field) {
      var message = errorFor(field);
      var error = document.getElementById(field.id + "-error");
      error.textContent = message;
      error.hidden = !message;
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
      return !message;
    }
    fields.forEach(function (field, i) {
      field.id = field.id || "form-" + formIndex + "-field-" + i;
      var errorId = field.id + "-error";
      var error = document.getElementById(errorId);
      if (!error) {
        error = document.createElement("p");
        error.id = errorId;
        error.className = "field-error";
        error.hidden = true;
        field.insertAdjacentElement("afterend", error);
      }
      var descriptions = (field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
      if (descriptions.indexOf(errorId) === -1) descriptions.push(errorId);
      field.setAttribute("aria-describedby", descriptions.join(" "));
      function recheck() { if (attempted) validateField(field); }
      field.addEventListener("input", recheck);
      field.addEventListener("change", recheck);
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      attempted = true;
      var invalid = fields.filter(function (field) { return !validateField(field); });
      if (status) {
        status.hidden = false;
        status.setAttribute("data-state", invalid.length ? "error" : "unavailable");
        status.textContent = invalid.length
          ? "Please check the highlighted fields. Nothing was sent."
          : "Submissions are not available yet. Nothing was sent. Your entries remain on this page; they are not saved.";
      }
      if (invalid.length) invalid[0].focus();
      else if (status) status.focus();
    });
    // An unavailable form must not submit personal data when JavaScript is disabled.
    f.querySelectorAll('button[type="submit"]').forEach(function (button) { button.disabled = false; });
  });
})();
