import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "next/navigation";

function Footer() {
  const { setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const handleSignout = () => {
    // Clear user data from context
    setUserDetail(null);

    // Clear any stored tokens/data
    localStorage.removeItem("userDetail");
    sessionStorage.removeItem("userDetail");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <div className="flex space-x-4">
         
          <button
            onClick={handleSignout}
            className="text-sm text-gray-500 hover:text-red-600 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
