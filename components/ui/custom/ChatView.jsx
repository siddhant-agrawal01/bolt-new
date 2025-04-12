"use client";
import ReactMarkdown from "react-markdown";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { useConvex, useMutation } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {
  AlignHorizontalSpaceAround,
  ArrowRight,
  ChevronRight,
  Globe,
  Loader2Icon,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Prompt from "@/data/Prompt";
import axios from "axios";
const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const [userInput, setUserInput] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Add this line to define the state

  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const UpdateMessages = useMutation(api.workspace.UpadateMessages);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]); // Added id as a dependency

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    // Check if result.message exists and is an array before setting messages
    if (result?.message && Array.isArray(result.message)) {
      setMessages(result.message); // Using the correct property name 'message' from server
      console.log("Messages loaded:", result.message);
    } else {
      console.error("Invalid message format:", result);
      // Initialize with empty array if no messages found
      setMessages([]);
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;

    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    // console.log("AI response:", result.data.result);
    const aiResp = {
      content: result.data.result,
      role: "ai",
    };

    setMessages((prev) => {
      return [...prev, aiResp];
    });
    await UpdateMessages({
      message: [...messages, aiResp],
      workspaceId: id,
    });
    setLoading(false);
  };

  // const onGenerate = (input) => {
  //   setMessages((prev) => {
  //     [
  //       ...prev,
  //       {
  //         role: "user",
  //         content: input,
  //       },
  //     ];
  //   });
  //   setUserInput("");
  // };

  const onGenerate = (input) => {
    setMessages((prev) => {
      return [
        ...prev,
        {
          role: "user",
          content: input,
        },
      ];
    });
    setUserInput("");
  };

  return (
    <div className="p-4 relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll hide-scrollbar">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                backgroundColor: Colors.CHAT_BACKGROUND,
              }}
              className="mb-4 p-3 rounded-lg flex gap-2 items-start  border-b"
            >
              {msg?.role == "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="User"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
             <div className="flex flex-col">
  <ReactMarkdown>
    {msg.content}
  </ReactMarkdown>
</div>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
        {loading && (
          <div
            className="mb-4 p-3 rounded-lg flex gap-2 items-start leading-7  border-b"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating Repsonse...</h2>
          </div>
        )}
      </div>

      {/* input   */}
      <div className="relative rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl backdrop-blur-xl p-8">
        <div className="flex flex-col gap-5">
          <div className="relative">
            <textarea
              className="w-full min-h-[120px] p-4 pr-12 text-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              placeholder={Lookup.INPUT_PLACEHOLDER}
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            ></textarea>
            <div className="absolute right-3 top-3">
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Shield className="h-4 w-4" />
              <span>Your data is encrypted end-to-end</span>
            </div>
            {/* ---------------button--------- */}

            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="h-10 w-10  bg-green-600"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;

// <button
// onClick={() => onGenerate(userInput)}
// className={`flex items-center justify-center gap-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 ${
//   !userInput ? "opacity-80 cursor-not-allowed" : ""
// }`}
// disabled={!userInput}
// >
// {/* <span>Get Started</span> */}
// <ArrowRight               onClick={() => onGenerate(userInput)}
// className="h-4 w-4" />
// </button>
