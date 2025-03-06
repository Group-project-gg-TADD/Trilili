async function loadGemini() {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Use import.meta.env for Vite
    const gemini = new GoogleGenerativeAI(GEMINI_API_KEY);
    return gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

export default loadGemini;