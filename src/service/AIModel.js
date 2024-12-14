import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const AIChatSession = model.startChat({
  generationConfig,
  history: [],
});

// Starting a chat session with an AI model to generate SEO keywords
export const AIChatSessionTags = (blogTitle) =>
  model.startChat({
    generationConfig, // Assuming this contains configuration options like model selection
    history: [
      {
        role: "user",
        parts: [
          {
            text: `For the blog titled "${blogTitle}", generate an array of 10 SEO keywords relevant to this topic. The keywords should be a mix of general and long-tail keywords to help boost search visibility. Please return just the array of keywords like ["keyword1", "keyword2", "keyword3"] without any additional text.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `['']`,
          },
        ],
      },
    ],
  });
