import OpenAI from "openai";


const OPENAI_API_KEY_FRONTEND = import.meta.env.VITE_OPENAI_API_KEY_FRONTEND ;

console.log("🔑 OpenAI API Key loaded:", OPENAI_API_KEY_FRONTEND ? "✅ Loaded" : "❌ Missing");

const openai = new OpenAI({
//   apiKey: import.meta.env.OPENAI_API_KEY,
apiKey: OPENAI_API_KEY_FRONTEND,
// apiKey:OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // REQUIRED for frontend
});

export default openai;
