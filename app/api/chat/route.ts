import { OpenAIStream, StreamingTextResponse } from "ai";
import { getEmbedding, openai } from "@/lib/openai/openai";
import notesai from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/db/authOptions";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
// export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const session = await getServerSession(authOptions);

  const { messages } = await req.json();

  // Limit the stream of message into 6
  const truncatedMessages = messages.slice(-6);
  // console.log(truncatedMessages);

  // generate an embedding for each messages that will be use later to query in pinecone

  const embedding = await getEmbedding(
    truncatedMessages.map((message: any) => message.content).join("\n")
  );

  // use the embedding to query in pinecone
  // i created a function that will carry the sessio id

  const vectorQueryEmbedding = await notesai.query({
    vector: embedding,
    topK: 4,
    filter: { authorId: session?.user.id },
  });

  //get the notes in mongodb based on the vectorqueryembedding

  const relevantNotes = await prisma.note.findMany({
    where: {
      id: {
        in: vectorQueryEmbedding.matches.map((match) => match.id),
      },
    },
  });

  //   console.log(notes);

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are an Intelligent note taking assistant, you will answer questions based on provided notes, Make your answer precise and accurate, avoid lenghty words, call the user with their name" +
          `the user name ${session?.user.name}` +
          `The relevant notes are ${relevantNotes
            .map((note) => `Title: ${note.title}\n\nContent: ${note.content}`)
            .join("\n")}`,
      },
      ...truncatedMessages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
