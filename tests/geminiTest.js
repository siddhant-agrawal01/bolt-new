// Gemini AI model test script

require("dotenv").config();

const { testGeminiModel } = require("../configs/aiModel.jsx");

// Run the test
async function runTest() {
  console.log("Starting Gemini AI model test...");

  const result = await testGeminiModel();

  if (result) {
    console.log("✅ Test successful! Gemini AI model is working properly.");
  } else {
    console.log("❌ Test failed! Check your API key and network connection.");
  }
}

runTest();
