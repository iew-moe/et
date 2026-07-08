(function () {
  const cfg = window.ET_TUTOR_CONFIG || {};
  const lang = () => (document.documentElement.lang === "en" ? "en" : "de");
  const text = {
    de: {
      toggle: "KI-Tutor",
      title: "KI-Tutor",
      close: "Schließen",
      placeholder: "Beschreibe kurz, wo du hängst ...",
      send: "Senden",
      setup: "Tutor noch nicht verbunden: Worker-URL fehlt.",
      loading: "Der Tutor denkt nach ...",
      error: "Der Tutor ist gerade nicht erreichbar.",
      intro: "Ich helfe dir schrittweise. Was hast du schon versucht?",
      chipNext: "Was ist der nächste Schritt?",
      chipCheck: "Prüfe meinen Ansatz.",
      chipExplain: "Erkläre den passenden Begriff.",
    },
    en: {
      toggle: "AI tutor",
      title: "AI tutor",
      close: "Close",
      placeholder: "Briefly describe where you are stuck ...",
      send: "Send",
      setup: "Tutor is not connected yet: worker URL is missing.",
      loading: "The tutor is thinking ...",
      error: "The tutor is not reachable right now.",
      intro: "I will help step by step. What have you tried so far?",
      chipNext: "What is the next step?",
      chipCheck: "Check my approach.",
      chipExplain: "Explain the relevant concept.",
    },
  };

  const history = [];
  let helpLevel = 0;

  function t(key) {
    return (text[lang()] && text[lang()][key]) || text.de[key] || key;
  }

  function el(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content) node.textContent = content;
    return node;
  }

  function appendFormattedInline(parent, textValue) {
    const parts = String(textValue).split(/(\*\*[^*]+\*\*)/g);
    for (const part of parts) {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        const strong = document.createElement("strong");
        strong.textContent = part.slice(2, -2);
        parent.appendChild(strong);
      } else if (part) {
        parent.appendChild(document.createTextNode(part));
      }
    }
  }

  function renderMessageContent(target, message) {
    const lines = String(message || "").split(/\r?\n/);
    let list = null;
    let paragraph = [];

    function flushParagraph() {
      if (!paragraph.length) return;
      const p = document.createElement("p");
      appendFormattedInline(p, paragraph.join(" "));
      target.appendChild(p);
      paragraph = [];
    }

    function flushList() {
      if (!list) return;
      target.appendChild(list);
      list = null;
    }

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph();
        flushList();
        continue;
      }

      const bullet = trimmed.match(/^[-*]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        if (!list) list = document.createElement("ul");
        const item = document.createElement("li");
        appendFormattedInline(item, bullet[1]);
        list.appendChild(item);
        continue;
      }

      flushList();
      paragraph.push(trimmed);
    }

    flushParagraph();
    flushList();
  }

  function ensureMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      return Promise.resolve(window.MathJax);
    }
    if (window.__etTutorMathJaxPromise) {
      return window.__etTutorMathJaxPromise;
    }

    window.MathJax = window.MathJax || {
      tex: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]],
        displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        processEscapes: true,
      },
      options: {
        skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      },
    };

    window.__etTutorMathJaxPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
      script.async = true;
      script.onload = () => resolve(window.MathJax);
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return window.__etTutorMathJaxPromise;
  }

  function collectDomFallback() {
    const inputs = {};
    document.querySelectorAll("input[id]").forEach((input) => {
      if (input.type === "radio" || input.type === "button") return;
      if (input.value && input.value.trim()) inputs[input.id] = input.value.trim();
    });
    return {
      exerciseId: cfg.exerciseId || "",
      title: cfg.exerciseTitle || document.title,
      lang: lang(),
      seed: document.getElementById("seed")?.value || "",
      visibleValuesText: document.getElementById("values")?.innerText || "",
      visibleTasksText: document.getElementById("tasks")?.innerText || "",
      userInputs: inputs,
      formulaSheetUrl: cfg.formulaSheetUrl || "../Formelsammlung_ET1.html",
    };
  }

  function getContext() {
    if (typeof window.getEtTutorContext === "function") {
      return window.getEtTutorContext();
    }
    return collectDomFallback();
  }

  function addMessage(container, role, message) {
    const msg = el("div", `et-tutor-msg ${role}`);
    renderMessageContent(msg, message);
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    ensureMathJax()
      .then((mathJax) => mathJax.typesetPromise && mathJax.typesetPromise([msg]))
      .then(() => {
        container.scrollTop = container.scrollHeight;
      })
      .catch(() => {});
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function applySavedSize(root, panel) {
    try {
      const saved = JSON.parse(localStorage.getItem("etTutorSize") || "{}");
      if (Number.isFinite(saved.width)) {
        root.style.width = `${clamp(saved.width, 340, window.innerWidth - 20)}px`;
      }
      if (Number.isFinite(saved.height)) {
        panel.style.height = `${clamp(saved.height, 420, window.innerHeight - 80)}px`;
      }
    } catch {}
  }

  function setupResize(root, panel, handle) {
    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      handle.setPointerCapture(event.pointerId);

      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = root.getBoundingClientRect().width;
      const startHeight = panel.getBoundingClientRect().height;

      function onMove(moveEvent) {
        const maxWidth = window.innerWidth - 20;
        const maxHeight = window.innerHeight - 80;
        const nextWidth = clamp(startWidth + startX - moveEvent.clientX, 340, maxWidth);
        const nextHeight = clamp(startHeight + startY - moveEvent.clientY, 420, maxHeight);
        root.style.width = `${nextWidth}px`;
        panel.style.height = `${nextHeight}px`;
      }

      function onUp() {
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", onUp);
        handle.removeEventListener("pointercancel", onUp);
        localStorage.setItem("etTutorSize", JSON.stringify({
          width: root.getBoundingClientRect().width,
          height: panel.getBoundingClientRect().height,
        }));
      }

      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", onUp);
      handle.addEventListener("pointercancel", onUp);
    });
  }

  async function askTutor(message, messagesEl, statusEl, inputEl, sendButton) {
    const workerUrl = cfg.workerUrl || "";
    if (!workerUrl || workerUrl.includes("YOUR_WORKER_URL")) {
      statusEl.textContent = t("setup");
      return;
    }

    addMessage(messagesEl, "user", message);
    history.push({ role: "user", content: message });
    inputEl.value = "";
    statusEl.textContent = t("loading");
    sendButton.disabled = true;

    try {
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          context: getContext(),
          helpLevel,
          history,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      const answer = data.answer || t("error");
      addMessage(messagesEl, "assistant", answer);
      history.push({ role: "assistant", content: answer });
      helpLevel = Math.min(4, helpLevel + 1);
      statusEl.textContent = "";
    } catch (err) {
      statusEl.textContent = `${t("error")} ${err.message || err}`;
    } finally {
      sendButton.disabled = false;
      inputEl.focus();
    }
  }

  function mount() {
    const root = el("div", "et-tutor");
    const toggle = el("button", "et-tutor-toggle", t("toggle"));
    toggle.type = "button";

    const panel = el("div", "et-tutor-panel");
    panel.hidden = true;

    const header = el("div", "et-tutor-header");
    const title = el("span", "", t("title"));
    const close = el("button", "et-tutor-close", "x");
    close.type = "button";
    close.title = t("close");
    header.append(title, close);

    const messages = el("div", "et-tutor-messages");
    addMessage(messages, "assistant", t("intro"));

    const chips = el("div", "et-tutor-chips");
    const chipTexts = [t("chipNext"), t("chipCheck"), t("chipExplain")];
    for (const chipText of chipTexts) {
      const chip = el("button", "et-tutor-chip", chipText);
      chip.type = "button";
      chip.addEventListener("click", () => {
        input.value = chipText;
        input.focus();
      });
      chips.appendChild(chip);
    }

    const status = el("div", "et-tutor-status");
    const form = el("form", "et-tutor-form");
    const input = el("textarea", "et-tutor-input");
    input.placeholder = t("placeholder");
    const send = el("button", "et-tutor-send", t("send"));
    send.type = "submit";
    form.append(input, send);
    const resize = el("div", "et-tutor-resize");
    resize.title = lang() === "en" ? "Resize" : "Größe ändern";

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = input.value.trim();
      if (message) askTutor(message, messages, status, input, send);
    });

    toggle.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      if (!panel.hidden) input.focus();
    });
    close.addEventListener("click", () => {
      panel.hidden = true;
    });

    panel.append(header, messages, chips, status, form, resize);
    root.append(toggle, panel);
    document.body.appendChild(root);
    applySavedSize(root, panel);
    setupResize(root, panel, resize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
