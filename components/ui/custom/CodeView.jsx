"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import { MessagesContext } from "@/context/MessagesContext";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";

const CodeView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);

  const UpdateFiles = useMutation(api.workspace.UpadateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    console.log("Result:", result);
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role == "user") {
        GenerativeAiCode();
      }
    }
  }, [messages]);

  const GenerativeAiCode = async () => {
    setLoading(true);
    const PROMPT =
      // messages[messages?.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT;
      JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;

    const result = await axios.post("/api/ai-code", {
      prompt: PROMPT,
    });

    console.log("Result:", result.data);
    const aiResp = result.data;

    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFiles({
      workspaceId: id,
      files: aiResp?.files,
    });
    setLoading(false);
  };
  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div
          className="flex items-center flex-wrap shrink-0 
       bg-black p-1 justify-center rounded-full 
       w-[140px] gap-3"
        >
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer 
            ${activeTab == "code" && "text-blue-500  bg-blue-500/25 p-1 px-2 rounded-full"}`}
          >
            Code
          </h2>

          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer 
            ${activeTab == "preview" && "text-blue-500 bg-blue-500/25 p-1 px-2 rounded-full"}`}
          >
            Preview
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="absolute inset-0 z-50 w-full">
          <div className="flex flex-col justify-center items-center h-[calc(100vh-60px)] backdrop-filter backdrop-blur-xl bg-transparent border border-gray-800/20">
            <div className="flex space-x-3">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    animationDuration: "1.5s",
                  }}
                ></div>
              ))}
            </div>
            <h1 className="mt-5 text-2xl text-blue-500 font-bold drop-shadow-md">
              Loading...
            </h1>
          </div>
        </div>
      ) : (
        <SandpackProvider
          files={files}
          template="react"
          theme={"dark"}
          customSetup={{
            dependencies: {
              ...Lookup.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout>
            {activeTab == "code" ? (
              <>
                <SandpackFileExplorer style={{ height: "100vh" }} />
                <SandpackCodeEditor style={{ height: "100vh" }} />
              </>
            ) : (
              <>
                <SandpackPreview
                  style={{ height: "100vh" }}
                  showNavigator={true}
                />
              </>
            )}
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
};

export default CodeView;
