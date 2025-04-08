import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import axios from "axios";

import React, { useContext } from "react";
import { Button } from "../button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo?.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });

      //saving users to locastorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <DialogDescription className="">
            <div className="flex flex-col items-center gap-3 justify-center">
              <h2 className="text-2xl text-center font-bold text-white">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2">{Lookup.SIGNIN_SUBHEADING}</p>
              <Button
                onClick={googleLogin}
                className="bg-green-600 mt-3 text-white hover:bg-green-400"
              >
                SIgn in with Google
              </Button>
              <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
