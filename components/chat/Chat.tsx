"use client";
import { FaRobot } from "react-icons/fa";
import { useChat } from "ai/react";
import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Chat = () => {
  const session = useSession();

  const chatContainerRef = useRef<HTMLUListElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild className=" right-8 bottom-8 fixed">
        <Button className="h-25 w-25">
          <FaRobot size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="font-bold">
          <span className="flex items-center gap-2">
            <FaRobot></FaRobot> Note Assistant
          </span>
        </DialogHeader>
        <ul
          ref={chatContainerRef}
          className="flex flex-col gap-2 overflow-y-auto h-[250px] "
        >
          {messages.map((message, index) => {
            return (
              <li
                key={index}
                className={`border rounded-md p-2 w-[80%] ${
                  message.role === "user" ? "ml-auto bg-primary text-white" : ""
                }`}
              >
                <p className="flex flex-col break-words whitespace-pre-wrap">
                  <span className="font-bold px-2 pt-2 ">
                    {message.role === "user" ? (
                      "You"
                    ) : (
                      <span className="flex items-center gap-2 ">
                        <FaRobot></FaRobot>
                        <span className="text-sm ">Note Assistant</span>
                      </span>
                    )}
                  </span>
                  <span className="p-4">{message.content}</span>
                </p>
              </li>
            );
          })}
        </ul>

        <div>
          {isLoading && "AI is thinking..."}
          {error && error.message}
        </div>

        <DialogFooter>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Say something..."
            />
            <Button type="submit">Send</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
