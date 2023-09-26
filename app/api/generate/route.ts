import { OpenAIStream } from "@/app/utils/OpenAIStream";
import { Prompt } from "@/constants/Prompt";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest): Promise<Response> {
  const prompt = Prompt;

const payload = {
  model: "text-davinci-003",
  prompt,
  temperature: 0.7,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 500,
  stream: true,
  n: 1,
};
//console.log('here')
  const stream = await OpenAIStream(payload);
  console.log(stream)
  return new Response(stream);
};

