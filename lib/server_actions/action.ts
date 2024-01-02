"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { getEmbedding, openai } from "../openai/openai";
import notesai from "../db/pinecone";

export const CREATE_NOTE = async (values: {
  title: string;
  content: string;
  authorId: string;
}) => {
  const embedding = await getEmbeddingForNotes(values.title, values.content);

  await prisma.$transaction(async (tx) => {
    const note = await tx.note.create({
      data: {
        title: values.title,
        content: values.content,
        authorId: values.authorId,
      },
    });

    await notesai.upsert([
      {
        id: note.id,
        values: embedding,
        metadata: { authorId: values.authorId },
      },
    ]);
  });

  console.log(notesai);

  revalidatePath("/notes");
};

export const GET_NOTES = async (authorId: string) => {
  const notes = await prisma.note.findMany({
    where: {
      authorId: authorId,
    },
  });

  return notes;
};

export const DELETE_NOTE = async (id: string) => {
  await prisma.$transaction(async (tx) => {
    await tx.note.delete({
      where: {
        id: id,
      },
    });

    await notesai._deleteOne(id);
  });

  revalidatePath("/notes");
};

export const UPDATE_NOTE = async (values: {
  id: string;
  title: string;
  content: string;
  authorId: string;
}) => {
  const embedding = await getEmbeddingForNotes(values.title, values.content);
  await prisma.$transaction(async (tx) => {
    await tx.note.update({
      where: {
        id: values.id,
      },
      data: {
        title: values.title,
        content: values.content,
        
      },
    });

    await notesai.upsert([
      {
        id: values.id,
        values: embedding,
        metadata:{authorId: values.authorId}
      },
    ]);
  });

  revalidatePath("/notes");
};

const getEmbeddingForNotes = async (title: string, content?: string) => {
  const text = `${title} \n\n ${content ?? ""}`;

  const embedding = await getEmbedding(text);

  return embedding;
};
