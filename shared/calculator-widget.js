(function () {
  const scriptUrl = document.currentScript && document.currentScript.src;
  if (!scriptUrl) return;

  const calculatorUrl = new URL("../web-calculator-emulator/index.html?embed=1", scriptUrl).href;
  const labels = {
    de: {
      toggle: "Taschenrechner",
      title: "Taschenrechner",
      close: "Schließen",
    },
    en: {
      toggle: "Calculator",
      title: "Calculator",
      close: "Close",
    },
  };

  function language() {
    return document.documentElement.lang === "en" ? "en" : "de";
  }

  function mount() {
    const root = document.createElement("div");
    root.className = "et-calculator-widget";

    const toggle = document.createElement("button");
    toggle.className = "et-calculator-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");

    const panel = document.createElement("div");
    panel.className = "et-calculator-panel";
    panel.id = "et-calculator-panel";
    panel.hidden = true;
    toggle.setAttribute("aria-controls", panel.id);

    const header = document.createElement("div");
    header.className = "et-calculator-header";
    const title = document.createElement("span");
    const close = document.createElement("button");
    close.className = "et-calculator-close";
    close.type = "button";
    close.textContent = "×";

    const frame = document.createElement("iframe");
    frame.className = "et-calculator-frame";
    frame.title = "Taschenrechner";

    let loaded = false;
    let calculatorHeight = 0;
    let customPosition = null;
    let dragState = null;

    function focusCalculatorInput() {
      if (!frame.contentWindow) return;
      frame.focus({ preventScroll: true });
      frame.contentWindow.postMessage({ type: "et-calculator-focus" }, "*");
    }

    function syncLauncherPositions() {
      const isMobile = window.matchMedia("(max-width: 620px)").matches;
      const baseBottom = isMobile ? 10 : 18;
      const baseRight = isMobile ? 10 : 18;
      const launcherGap = 8;
      const tutorRoot = document.querySelector(".et-tutor");
      const tutorPanel = document.querySelector(".et-tutor-panel");
      const tutorToggle = document.querySelector(".et-tutor-toggle");

      toggle.style.marginRight = tutorToggle
        ? `${Math.ceil(tutorToggle.getBoundingClientRect().width) + launcherGap}px`
        : "0px";

      root.style.left = "";
      root.style.top = "";
      root.style.right = `${baseRight}px`;
      root.style.bottom = `${baseBottom}px`;
      if (tutorRoot) {
        tutorRoot.style.left = "";
        tutorRoot.style.top = "";
        tutorRoot.style.right = `${baseRight}px`;
        tutorRoot.style.bottom = `${baseBottom}px`;
      }

      if (!panel.hidden && customPosition) {
        const edge = isMobile ? 4 : 8;
        const maxLeft = Math.max(edge, window.innerWidth - root.offsetWidth - edge);
        const maxTop = Math.max(edge, window.innerHeight - root.offsetHeight - edge);
        customPosition.left = Math.min(Math.max(edge, customPosition.left), maxLeft);
        customPosition.top = Math.min(Math.max(edge, customPosition.top), maxTop);
        root.style.left = `${customPosition.left}px`;
        root.style.top = `${customPosition.top}px`;
        root.style.right = "auto";
        root.style.bottom = "auto";

        if (tutorRoot) {
          const rootRect = root.getBoundingClientRect();
          tutorRoot.style.top = `${rootRect.top}px`;
          tutorRoot.style.right = `${Math.max(0, window.innerWidth - rootRect.right)}px`;
          tutorRoot.style.bottom = "auto";
        }
      } else if (!panel.hidden && tutorRoot) {
        const rootRect = root.getBoundingClientRect();
        tutorRoot.style.top = `${rootRect.top}px`;
        tutorRoot.style.right = `${Math.max(0, window.innerWidth - rootRect.right)}px`;
        tutorRoot.style.bottom = "auto";
      } else if (tutorRoot && tutorPanel && !tutorPanel.hidden) {
        const tutorRect = tutorRoot.getBoundingClientRect();
        root.style.top = `${tutorRect.top}px`;
        root.style.right = `${Math.max(0, window.innerWidth - tutorRect.right)}px`;
        root.style.bottom = "auto";
      }
    }

    function fitPanelToCalculator() {
      if (!calculatorHeight) return;
      const reservedSpace = window.matchMedia("(max-width: 620px)").matches ? 72 : 82;
      const maxPanelHeight = Math.max(320, window.innerHeight - reservedSpace);
      const desiredPanelHeight = Math.ceil(calculatorHeight + header.offsetHeight + 2);
      const fittedPanelHeight = Math.min(desiredPanelHeight, maxPanelHeight);
      panel.style.height = `${fittedPanelHeight}px`;
      frame.setAttribute("scrolling", desiredPanelHeight <= maxPanelHeight ? "no" : "auto");
      syncLauncherPositions();
    }

    function updateLabels() {
      const text = labels[language()];
      toggle.textContent = text.toggle;
      title.textContent = text.title;
      close.setAttribute("aria-label", text.close);
    }

    function closePanel() {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      syncLauncherPositions();
    }

    function openPanel() {
      const tutorClose = document.querySelector(".et-tutor-panel:not([hidden]) .et-tutor-close");
      if (tutorClose) tutorClose.click();
      if (!loaded) {
        frame.src = calculatorUrl;
        loaded = true;
      }
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      syncLauncherPositions();
      requestAnimationFrame(focusCalculatorInput);
    }

    toggle.addEventListener("click", () => {
      if (panel.hidden) openPanel();
      else closePanel();
    });
    close.addEventListener("click", closePanel);
    header.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || event.target.closest("button")) return;
      const rect = root.getBoundingClientRect();
      customPosition = { left: rect.left, top: rect.top };
      dragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startLeft: rect.left,
        startTop: rect.top,
      };
      header.setPointerCapture(event.pointerId);
      root.classList.add("is-dragging");
      event.preventDefault();
    });
    header.addEventListener("pointermove", (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      customPosition = {
        left: dragState.startLeft + event.clientX - dragState.startX,
        top: dragState.startTop + event.clientY - dragState.startY,
      };
      syncLauncherPositions();
    });
    function stopDragging(event) {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      if (header.hasPointerCapture(event.pointerId)) header.releasePointerCapture(event.pointerId);
      dragState = null;
      root.classList.remove("is-dragging");
    }
    header.addEventListener("pointerup", stopDragging);
    header.addEventListener("pointercancel", stopDragging);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) closePanel();
    });
    document.addEventListener("click", (event) => {
      if (event.target.closest(".et-tutor-toggle")) {
        closePanel();
      }
      if (event.target.closest(".et-tutor-close")) {
        requestAnimationFrame(syncLauncherPositions);
      }
    });
    window.addEventListener("message", (event) => {
      if (event.source !== frame.contentWindow
          || !event.data
          || event.data.type !== "et-calculator-height") return;
      const height = Number(event.data.height);
      if (!Number.isFinite(height) || height < 100 || height > 2000) return;
      calculatorHeight = height;
      fitPanelToCalculator();
    });
    frame.addEventListener("load", focusCalculatorInput);
    window.addEventListener("resize", () => {
      fitPanelToCalculator();
      syncLauncherPositions();
    });

    const languageObserver = new MutationObserver(updateLabels);
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    updateLabels();
    header.append(title, close);
    panel.append(header, frame);
    root.append(toggle, panel);
    document.body.appendChild(root);

    const tutorPanel = document.querySelector(".et-tutor-panel");
    const tutorToggle = document.querySelector(".et-tutor-toggle");
    const stateObserver = new MutationObserver(syncLauncherPositions);
    stateObserver.observe(panel, { attributes: true, attributeFilter: ["hidden"] });
    if (tutorPanel) {
      stateObserver.observe(tutorPanel, { attributes: true, attributeFilter: ["hidden"] });
    }
    if (window.ResizeObserver) {
      const sizeObserver = new ResizeObserver(syncLauncherPositions);
      sizeObserver.observe(panel);
      if (tutorPanel) sizeObserver.observe(tutorPanel);
      if (tutorToggle) sizeObserver.observe(tutorToggle);
    }
    syncLauncherPositions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
