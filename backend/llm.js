import OpenAI from "openai";
import * as fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function processExpense(file) {
  const base64ImageFile = fs.readFileSync(file.path, {
    encoding: "base64",
  });

  const dataUrl = `data:${file.mimetype};base64,${base64ImageFile}`;

  const response = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-lite-001",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: dataUrl },
          },
          {
            type: "text",
            text: "analyse the attached image and give the meaningful things like the organization name, commodity name, commodity amount, commodity price",
          },
        ],
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

export { processExpense };