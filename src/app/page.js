'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'


export default function Home() {

  return(
    <div className="">
      <div className="min-h-[90svh] bg-gray-950 text-gray-100">
        <header className="p-5 justify-between flex">
          <h1 className="font-Madetommy text-xl">adFeed</h1>
          <nav className="flex gap-2">
            <Button size='sm'  className='border-white flex items-center justify-center border px-3 py-0'><span>Pricing</span></Button>
            <Link href={'/login'} className="decoration-none"><Button size='sm' className='bg-gray-300 decoration-none flex items-center justify-center text-black px-3 py-0'><span>Sign in</span></Button></Link>
          </nav>
        </header>
        <div className="p-5">

        </div>
      </div>
      
    </div>
  );
}
