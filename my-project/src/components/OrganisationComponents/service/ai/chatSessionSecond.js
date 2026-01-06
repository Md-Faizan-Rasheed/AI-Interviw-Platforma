import openai from "./openaiClient";
import { generationConfig } from "../../constants/options.jsx";

export async function chatSessionSecond(prompt) {
  console.log("prompt in chat session",prompt)
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Act as an HR of a company hiring a Frontend Engineering Intern. Use professional HR tone.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    ...generationConfig,
  });
   console.log("Response",response)

  return response.choices[0].message.content;
}
