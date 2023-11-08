"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies, { Cookie } from "universal-cookie";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from 'uuid';

const cookies = new Cookies();
export function NavigationEvents() {

















  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const ingame = cookies.get("ingame");


    const cookie= cookies.get("temporaryvalue")

    if(!cookie){
      cookies.set("temporaryvalue",uuidv4())
    }


    const url = `${pathname}?${searchParams}`;

    if (ingame && ingame !== url) {

        router.push(ingame)
    }
  }, [pathname, searchParams]);

  return null;
}
