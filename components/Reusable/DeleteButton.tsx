"use client";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { DELETE_NOTE } from "@/lib/server_actions/action";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {});
          }}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this note?</p>
        <p className="text-sm text-destructive">
          Warning: This action cannot be undone.
        </p>

        <DialogFooter>
          <DialogClose className="flex gap-2">
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  await DELETE_NOTE(id);
                });
              }}
            >
              Delete{" "}
              {isPending && <Loader2 size={16} className="animate-spin" />}
            </Button>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
