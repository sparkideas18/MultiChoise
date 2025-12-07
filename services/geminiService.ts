import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Standard efficient model for quick tasks
const FLASH_MODEL = 'gemini-2.5-flash';

// Powerful model for deep reasoning
const PRO_MODEL = 'gemini-3-pro-preview';

export const generateThinkingResponse = async (prompt: string, signal?: AbortSignal): Promise<string> => {
  try {
    // Using gemini-3-pro-preview with max thinking budget for complex queries
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, // Max thinking budget for deep reasoning
      },
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error in generateThinkingResponse:", error);
    throw error;
  }
};

export const generateStandardResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error in generateStandardResponse:", error);
    throw error;
  }
};

export const categorizeTransaction = async (description: string): Promise<string> => {
  try {
    const prompt = `Categorize this financial transaction description into one word (e.g., Food, Transport, Rent, Salary, Utilities, Entertainment, Health): "${description}". Return only the category word.`;
    const response = await ai.models.generateContent({
      model: FLASH_MODEL,
      contents: prompt,
    });
    return response.text?.trim() || "Uncategorized";
  } catch (e) {
    return "Uncategorized";
  }
};
