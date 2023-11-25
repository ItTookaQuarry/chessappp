"use client";
import React from "react";
import Cookies, { Cookie } from "universal-cookie";
import { SignOutButton ,useClerk} from "@clerk/nextjs";
const cookies = new Cookies();
//da
export default function SignOut() {

  const { signOut } = useClerk();
  return (
    <div
      type="button"
      onClick={() => {
        cookies.remove("auth-token");
        cookies.remove("src");
        cookies.remove("email");
        cookies.remove("displayname");
      }}
      class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      <SignOutButton  signOutCallback={() => signOut()}  />
    </div>
  );
}
