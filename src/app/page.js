'use client'
import { Button } from "@/components/ui/button";
import { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, } from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'


export default function Home() {

  return(
  <Drawer>
    <div className="relative">
      <div className="min-h-[94svh] bg-gray-950 text-gray-50">
        <header className="p-5 justify-between flex">
          <h1 className="font-Madetommy text-xl">adFeed</h1>
          <nav className="flex gap-3">
            <Link href={'/signin'} className="decoration-none"><Button size='sm' className='bg-gray-100 decoration-none flex items-center justify-center text-black px-3 py-0'><span>Sign in</span></Button></Link>
            <DrawerTrigger asChild><Button size='sm'  className='border-white flex items-center justify-center border px-2 py-0'><span className="fill-white">{menu}</span></Button></DrawerTrigger>
          </nav>
        </header>
        <div className="p-5 flex flex-col justify-center h-fit mt-7">
          <h1 className="text-4xl text-center font-bold font-Clash">Smarter Ads? <br/>Start Here.</h1>
          <p className="text-sm text-gray-200 text-center mt-7 mx-2 leading-relaxed  font-Inter font-normal">adFeed helps you <span className="font-bold text-white">create</span>, <span className="font-bold text-white">launch</span> and <span className="font-bold text-white">control</span> your campaigns with faster and fewer clicks.</p>

          <Button className="text-sm mt-8 mx-auto px-9 bg-white font-semibold text-black w-fit font-Inter rounded-[0.2rem]" >Get Started</Button> 
        </div>
      </div> 
      
    </div>
    <DrawerContent>
      hello world
    </DrawerContent>
  </Drawer>  
  );
}



export const menu = <svg data-name="Layer 1" className="w-5 h-5" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M21.86,18.73H9.18a2,2,0,0,1,0-4H21.86a2,2,0,0,1,0,4Z"/><path d="M54.82,18.73H34.88a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,34H9.18a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,49.27H30.07a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/></svg>