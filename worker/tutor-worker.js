import { SHARED_TUTOR_CONTEXT, exerciseContextFor } from "./tutor-context.js";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

function corsHeaders(origin, env) {
  const allowedOrigin = env.ALLOWED_ORIGIN || "https://iew-moe.github.io";
  const allow = origin === allowedOrigin ? origin : allowedOrigin;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function jsonResponse(body, status, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin, env),
    },
  });
}

function trimText(value, maxLen = 4000) {
  const text = String(value ?? "");
  return text.length > maxLen ? `${text.slice(0, maxLen)}...` : text;
}

function compactContext(context) {
  if (!context || typeof context !== "object") return {};
  return {
    exerciseId: context.exerciseId,
    title: trimText(context.title, 200),
    lang: context.lang === "en" ? "en" : "de",
    seed: trimText(context.seed, 80),
    values: context.values || null,
    visibleValuesText: trimText(context.visibleValuesText, 1500),
    visibleTasksText: trimText(context.visibleTasksText, 2500),
    userInputs: context.userInputs || {},
    selectedNature: context.selectedNature || null,
    checkResult: context.checkResult || null,
    topologyDescription: context.topologyDescription || null,
    activeQuestion: Number.isFinite(Number(context.activeQuestion)) ? Number(context.activeQuestion) : null,
    questions: Array.isArray(context.questions)
      ? context.questions.slice(0, 20).map((question) => ({
          number: question.number,
          id: trimText(question.id, 120),
          variant: question.variant ?? null,
          topicId: trimText(question.topicId, 120),
          topicName: trimText(question.topicName, 200),
          question: trimText(question.question, 1000),
          shownOptions: Array.isArray(question.shownOptions)
            ? question.shownOptions.map((option) => trimText(option, 600))
            : [],
          wrongOptionsTried: Array.isArray(question.wrongOptionsTried)
            ? question.wrongOptionsTried.map((option) => trimText(option, 20))
            : [],
          answeredCorrectly: !!question.answeredCorrectly,
          solvedOnFirstAttempt: !!question.solvedOnFirstAttempt,
          correctOptionForTutor: trimText(question.correctOptionForTutor, 20),
          explanationForTutor: trimText(question.explanationForTutor, 1200),
        }))
      : null,
    formulaSheetUrl: context.formulaSheetUrl || "https://iew-moe.github.io/et/Formelsammlung_ET1.html",
  };
}

function systemPrompt(helpLevel, context) {
  const exerciseContext = exerciseContextFor(context.exerciseId);
  return [
    "Du bist ein KI-Tutor für eine Einführung-in-die-Elektrotechnik-Übungsseite.",
    "Arbeite sokratisch und unterstützend.",
    "Gib nicht sofort die vollständige Lösung preis.",
    "Finde zuerst heraus, wo der/die Studierende hängt.",
    "Gib pro Antwort höchstens einen nächsten sinnvollen Hinweis.",
    "Wenn Eingaben oder Check-Ergebnisse vorliegen, lokalisiere den ersten erkennbaren Denk- oder Rechenfehler.",
    "Verwende die Werte, Symbole und Aufgabenstellung aus dem Kontext.",
    "Verweise bei Bedarf knapp auf die Formelsammlung, aber erfinde keine Quellen.",
    "Bei Hilfestufe 0: stelle vor allem eine Rückfrage.",
    "Bei Hilfestufe 1: gib einen kleinen Hinweis ohne Zahlenrechnung.",
    "Bei Hilfestufe 2: nenne die passende Formel oder den Ansatz.",
    "Bei Hilfestufe 3: zeige genau den nächsten Rechenschritt mit den gegebenen Zahlen.",
    "Bei Hilfestufe 4: führe schrittweise zur Lösung, aber erkläre jeden Schritt.",
    "Antwortsprache: Deutsch, außer der Kontext lang ist en.",
    `Aktuelle Hilfestufe: ${helpLevel}.`,
    "",
    "Verbindlicher Kontext:",
    SHARED_TUTOR_CONTEXT,
    exerciseContext,
  ].join("\n");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://iew-moe.github.io";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, env),
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin, env);
    }

    if (origin && origin !== allowedOrigin) {
      return jsonResponse({ error: "Origin not allowed" }, 403, origin, env);
    }

    if (!env.ANTHROPIC_API_KEY) {
      return jsonResponse({ error: "ANTHROPIC_API_KEY is not configured" }, 500, origin, env);
    }

    const contentLength = Number(request.headers.get("Content-Length") || "0");
    if (contentLength > 50000) {
      return jsonResponse({ error: "Request too large" }, 413, origin, env);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400, origin, env);
    }

    const message = trimText(payload.message, 2500).trim();
    const helpLevel = Math.max(0, Math.min(4, Number(payload.helpLevel || 0)));
    const context = compactContext(payload.context);
    const history = Array.isArray(payload.history) ? payload.history.slice(-8) : [];

    if (!message) {
      return jsonResponse({ error: "Message is required" }, 400, origin, env);
    }

    const userContent = [
      "Aktueller Aufgaben-Kontext als JSON:",
      JSON.stringify(context, null, 2),
      "",
      "Bisheriger kurzer Chatverlauf als JSON:",
      JSON.stringify(history, null, 2),
      "",
      "Aktuelle Frage der/des Studierenden:",
      message,
    ].join("\n");

    const anthropicBody = {
      model: env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
      max_tokens: 700,
      temperature: 0.2,
      system: systemPrompt(helpLevel, context),
      messages: [
        {
          role: "user",
          content: userContent,
        },
      ],
    };

    const apiResponse = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(anthropicBody),
    });

    const apiText = await apiResponse.text();
    if (!apiResponse.ok) {
      return jsonResponse(
        { error: "Anthropic API error", status: apiResponse.status, detail: trimText(apiText, 1000) },
        502,
        origin,
        env,
      );
    }

    let apiJson;
    try {
      apiJson = JSON.parse(apiText);
    } catch {
      return jsonResponse({ error: "Invalid Anthropic response" }, 502, origin, env);
    }

    const answer = (apiJson.content || [])
      .filter((part) => part && part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim();

    return jsonResponse({ answer, usage: apiJson.usage || null }, 200, origin, env);
  },
};
