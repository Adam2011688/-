import { GoogleGenAI, Type } from "@google/genai";
import { GameScenario } from '../types';
import { FALLBACK_SCENARIOS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScenario = async (): Promise<GameScenario> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a challenging Physics scenario/problem in ARABIC suitable for 9th Grade students involving one of the six simple machines.
      
      The scenario should act like a physics quiz question:
      - Focus on specific concepts: Mechanical Advantage (الفائدة الآلية), Force (القوة), Resistance/Load (المقاومة), and Work (الشغل).
      - Use real-world engineering, construction, or daily life mechanics context.
      - Do NOT explicitly name the machine in the scenario text. Describe the mechanism or the forces involved.
      
      Return JSON with:
      - scenario: The Arabic text describing the physics problem.
      - correctMachine: The enum value of the machine used.
      - explanation: A scientific Arabic explanation explaining why it is that machine and mentioning the physics concept involved.
      - difficulty: EASY, MEDIUM, or HARD.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scenario: { type: Type.STRING },
            correctMachine: { 
              type: Type.STRING, 
              enum: [
                'LEVER',
                'WHEEL_AXLE',
                'PULLEY',
                'INCLINED_PLANE',
                'WEDGE',
                'SCREW'
              ]
            },
            explanation: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['EASY', 'MEDIUM', 'HARD'] }
          },
          required: ['scenario', 'correctMachine', 'explanation', 'difficulty']
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data as GameScenario;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a random fallback if API fails
    const fallback = FALLBACK_SCENARIOS[Math.floor(Math.random() * FALLBACK_SCENARIOS.length)];
    return {
        ...fallback,
        difficulty: 'EASY'
    };
  }
};