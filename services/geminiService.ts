import { GoogleGenAI, Type } from "@google/genai";
import { GameScenario } from '../types';
import { FALLBACK_SCENARIOS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScenario = async (): Promise<GameScenario> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a challenging Physics scenario/problem in ARABIC suitable for 9th Grade students involving either one of the six simple machines OR the concept of Mechanical Work (الشغل).
      
      The scenario should act like a physics quiz question covering the curriculum requirements:
      - Concepts to cover: Work (الشغل), Force (القوة), Displacement (الإزاحة), Power (القدرة), Mechanical Advantage (الفائدة الآلية), and Levers/Pulleys/etc.
      - Use real-world engineering, construction, or daily life mechanics context.
      
      Important Rules:
      1. If the scenario is about calculating Work (W=F*d) or identifying if work is done (e.g. force perpendicular to motion, or no motion), the 'correctMachine' should be 'WORK'.
      2. If it involves a machine, describe the mechanism without explicitly naming the machine.
      
      Return JSON with:
      - scenario: The Arabic text describing the physics problem.
      - correctMachine: The enum value (WORK, LEVER, PULLEY, etc.).
      - explanation: A scientific Arabic explanation explaining the answer (mentioning Work formula if applicable, or the machine type).
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
                'WORK',
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