import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../sidebar";

function WorkspaceHistory() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkspaceList] = useState();

  const convex = useConvex();

  const { toggleSidebar } = useSidebar();
  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);
  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkspaceList(result);
    console.log(result);
  };
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-3">
        Workspace History
      </h2>
      <div className="space-y-1.5">
        {workspaceList && workspaceList.length > 0 ? (
          workspaceList?.map((workspace, index) => (
            <div
              key={index}
              className="flex flex-col p-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-800">
                  {workspace?.name || workspace?.title || "Untitled workspace"}
                </span>
                <div className="text-xs text-gray-500">
                  {workspace?.createdAt
                    ? new Date(workspace.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </div>
              </div>
              {workspace?.message && workspace?.message[0]?.content && (
                <Link href={"/workspace/" + workspace?._id} key={index}>
                  <p
                    onClick={toggleSidebar}
                    className="text-xs text-gray-600 line-clamp-2 opacity-80"
                  >
                    {workspace.message[0].content}
                  </p>
                </Link>
              )}
              <div className="w-full border-b border-gray-100 mt-3"></div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-md">
            No workspaces found
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceHistory;
