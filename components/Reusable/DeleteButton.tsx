"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { DELETE_NOTE } from "@/lib/server_actions/action";
import { Loader2, Trash2 } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {});
          }}
        >
          <Trash2 />
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

        <DialogFooter className="flex gap-2 ">
          <Button
            className="w-full order-1 md:order-none"
            variant={"destructive"}
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                await DELETE_NOTE(id);
                setIsOpen(false);
              });
            }}
          >
            Delete {isPending && <Loader2 size={16} className="animate-spin" />}
          </Button>
          <Button className="w-full" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
