const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
console.log("API Key:", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

 const chatSession = model.startChat({
  generationConfig,
  history: [],
});

// Test function to check if Gemini AI model is working
 const testGeminiModel = async () => {
  try {
    const prompt = "Hello, can you tell me what Gemini AI is?";
    const result = await chatSession.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini AI Test Response:", text);
    return text;
  } catch (error) {
    console.error("Error testing Gemini AI:", error);
    return null;
  }
};

// Uncomment the line below to run the test when this file is imported
// testGeminiModel();
module.exports = {
  chatSession,
  testGeminiModel
};