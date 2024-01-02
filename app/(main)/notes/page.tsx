import DeleteButton from "@/components/Reusable/DeleteButton";
import EditButton from "@/components/Reusable/EditButton";
import Chat from "@/components/chat/Chat";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/db/authOptions";
import { GET_NOTES } from "@/lib/server_actions/action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// export const runtime = "edge";

const Notes = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const notes = await GET_NOTES(session.user.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {notes.map((note) => {
        return (
          <>
            <Card key={note.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{note.title} </CardTitle>
                <CardDescription>
                  {note.createdAt.toDateString()}
                  {"   "}
                  {note.createdAt.toTimeString() ===
                  note.updatedAt.toTimeString()
                    ? ""
                    : " •Edited"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="break-words whitespace-pre-wrap">
                  {note.content}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 mt-auto">
                <DeleteButton id={note.id} />
                <EditButton props={note} />
              </CardFooter>
            </Card>
          </>
        );
      })}

      <Chat />
    </div>
  );
};

export default Notes;
