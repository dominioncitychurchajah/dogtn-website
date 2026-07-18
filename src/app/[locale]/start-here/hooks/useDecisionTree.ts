import { DECISION_TREE } from "../lib/intents";

export function useDecisionTree() {
  const route = (userMessage: string, preDetectedIntent: string | null, messageCount: number) => {
    const text = userMessage.toLowerCase();
    let bestMatch: string | null = null;
    let bestScore = 0;

    // Direct intent from pill click
    if (preDetectedIntent && DECISION_TREE.intents[preDetectedIntent]) {
      bestMatch = preDetectedIntent;
      bestScore = 999;
    } else {
      // Score each intent
      for (const [intentKey, intentData] of Object.entries(DECISION_TREE.intents)) {
        let score = 0;
        for (const keyword of intentData.keywords) {
          const kw = keyword.toLowerCase();
          if (text.includes(kw)) {
            score += 1;
            // Bonus for whole-word match
            // Using boundary checks that are safe in JS Regex
            const regex = new RegExp("\\b" + kw + "\\b");
            if (regex.test(text)) score += 0.5;
            // Bonus for exact phrase at start
            if (text.startsWith(kw)) score += 0.3;
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestMatch = intentKey;
        }
      }
    }

    // Threshold for uncertain matches
    const isUncertain = bestScore < 1.0 && !preDetectedIntent;
    const intent = isUncertain ? DECISION_TREE.default : (DECISION_TREE.intents[bestMatch as string] || DECISION_TREE.default);

    let response: string;
    if (isUncertain && messageCount <= 2) {
      response = DECISION_TREE.default.response;
    } else if (isUncertain) {
      response = `I am not entirely sure, but let me suggest something. ${intent.response}`;
    } else {
      response = intent.response;
    }

    return {
      response,
      routing: {
        title: intent.title,
        description: intent.description,
        url: intent.url,
        cta: intent.cta,
        secondaryCta: intent.secondaryCta,
      },
    };
  };

  return { route };
}
