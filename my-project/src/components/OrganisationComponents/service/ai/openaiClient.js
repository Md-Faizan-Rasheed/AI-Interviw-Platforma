import OpenAI from "openai";


const openai = new OpenAI({
//   apiKey: import.meta.env.OPENAI_API_KEY,
// apiKey: process.env.OPENAI_API_KEY,
apiKey:OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // REQUIRED for frontend
});

export default openai;
