
import { GoogleGenAI } from "@google/genai";

export const getFinancialInsights = async (userData: any) => {
  // Fix: Strictly follow Google GenAI initialization guidelines (named parameter and direct process.env.API_KEY)
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this user's cooperative financial status and provide a professional, encouraging summary in 3-4 sentences.
      User: ${userData.name}
      Role: ${userData.role}
      Total Contributions: ₦${userData.totalContributions.toLocaleString()}
      Loan Balance: ₦${userData.activeLoanBalance.toLocaleString()}
      Membership Status: ${userData.membershipStatus}
      Context: This is a Nigerian Local Government Employee Cooperative.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Error connecting to the financial advisor service.";
  }
};
