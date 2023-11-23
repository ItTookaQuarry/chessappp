
"use client"
import React from 'react'
import {SessionProvider} from "next-auth/react"
export default function Session(props) {
  return (
    <SessionProvider>{props.children}</SessionProvider>
  )
}
