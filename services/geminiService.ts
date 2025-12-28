import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";
import { GEMINI_MODEL } from "../constants";

// Initialize Gemini Client
// Note: process.env.API_KEY is handled by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Counts tokens using the Gemini API (for the English baseline).
 */
export const countTokens = async (text: string): Promise<number> => {
  if (!text.trim()) return 0;
  try {
    const response = await ai.models.countTokens({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text }] }],
    });
    return response.totalTokens || 0;
  } catch (error) {
    console.error("Error counting tokens:", error);
    // Fallback heuristic if API fails: roughly 4 chars per token
    return Math.ceil(text.length / 4);
  }
};

/**
 * Translates text into 4 languages to facilitate the Inequity simulation.
 * Returns a JSON object with translations.
 */
export const translateForSimulation = async (text: string): Promise<TranslationResult> => {
  if (!text.trim()) {
    return { en: '', es: '', fr: '', zh: '' };
  }

  const prompt = `Translate the following text into English, Spanish, French, and Chinese (Simplified). 
  Return ONLY a valid JSON object with keys 'en', 'es', 'fr', 'zh'.
  Text: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            en: { type: Type.STRING },
            es: { type: Type.STRING },
            fr: { type: Type.STRING },
            zh: { type: Type.STRING },
          },
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      en: result.en || '',
      es: result.es || '',
      fr: result.fr || '',
      zh: result.zh || '',
    };
  } catch (error) {
    console.error("Translation error:", error);
    // Fallback
    return {
      en: "[Error de traducción]",
      es: text,
      fr: "[Error de traducción]",
      zh: "[Error de traducción]"
    };
  }
};
