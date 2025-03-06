async function loadGemini() {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
  
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  
  module.exports = loadGemini;