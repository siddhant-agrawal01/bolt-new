import { ActionContext } from "@/context/ActionContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

const SandpackPreviewClient = () => {
  const previewRef = useRef();
  const { sandpack } = useSandpack;
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    GetSandpackClient();
  }, [sandpack && action]);
  const GetSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log("Client:", client);
      const result = await client.getCodeSandboxURL();

      if (action?.actionType == "deploy") {
        window.open("https://" + result?.sandboxId + ".csb.app/");
      } else if (action?.actionType == "export") {
        window?.open(result?.editorUrl);
      }
    }
  };

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "100vh" }}
      showNavigator={true}
    />
  );
};

export default SandpackPreviewClient;
