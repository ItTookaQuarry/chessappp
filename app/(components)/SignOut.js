"use client";
import React from "react";
import Cookies, { Cookie } from "universal-cookie";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
const cookies = new Cookies();

export default function SignOut() {


  return (
    <button
      type="button"
      onClick={() => {
        cookies.remove("auth-token");
        cookies.remove("src");
        cookies.remove("email");
        cookies.remove("displayname");
        signOut()
      }}
      class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      Wyloguj się
    </button>
  );
}
