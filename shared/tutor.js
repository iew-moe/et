(function () {
  const cfg = window.ET_TUTOR_CONFIG || {};
  const lang = () => (document.documentElement.lang === "en" ? "en" : "de");
  const text = {
    de: {
      toggle: "KI-Tutor",
      title: "KI-Tutor",
      close: "Schliessen",
      placeholder: "Beschreibe kurz, wo du haengst ...",
      send: "Senden",
      setup: "Tutor noch nicht verbunden: Worker-URL fehlt.",
      loading: "Der Tutor denkt nach ...",
      error: "Der Tutor ist gerade nicht erreichbar.",
      intro: "Ich helfe dir schrittweise. Was hast du schon versucht?",
      chipNext: "Was ist der naechste Schritt?",
      chipCheck: "Pruefe meinen Ansatz.",
      chipExplain: "Erklaere den passenden Begriff.",
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
    const msg = el("div", `et-tutor-msg ${role}`, message);
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
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

    panel.append(header, messages, chips, status, form);
    root.append(toggle, panel);
    document.body.appendChild(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
