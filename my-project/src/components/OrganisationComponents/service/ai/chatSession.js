import openai from "./openaiClient";
import { generationConfig } from "../../constants/options.jsx";
export async function chatSession(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    ...generationConfig,
  });

  return response.choices[0].message.content;
}
