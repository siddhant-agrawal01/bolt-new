import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";

import React from "react";
import { Button } from "../button";

function SignInDialog({ openDialog, closeDialog }) {
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
              <Button className="bg-green-600 mt-3 text-white hover:bg-green-400">
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
