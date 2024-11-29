'use client'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, } from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'
import profilePix from '../../public/profilepix2.jpg'


export default function Home() {

  return(
  <Drawer side='top'>
    <div className="relative h-full overflow-x-clip overflow-y-scroll">
      <div className="min-h-[94svh] bg-gray-950 text-gray-50">
        <header className="p-5 justify-between flex">
          <Link href={'/'}  className="decoration-none text-white"><h1 className="font-Madetommy text-2xl">adFeed</h1></Link>
          <nav className="flex gap-3">
            <Link href={'/signin'} className="decoration-none"><Button size='sm' className='bg-gray-100 decoration-none flex items-center justify-center text-black px-3 py-0'><span>Sign in</span></Button></Link>
            <DrawerTrigger asChild><Button size='sm'  className='border-white flex items-center justify-center border px-2 py-0'><span className="fill-white">{menu}</span></Button></DrawerTrigger>
          </nav>
        </header>
        <div className="px-1 py-5 flex flex-col justify-center h-fit mt-7">
          <h1 className="text-5xl text-center font-bold font-Clash">Smarter Ads? <br/>Start Here.</h1>
          <p className="text-lg text-gray-200 text-center mt-12 mx-2  font-Inter font-mediuml">adFeed helps you <span className="font-bold text-white">create ads</span> and <span className="font-bold text-white">manage</span> your engagements with faster and fewer clicks.</p>

          <Link href={'/signup'} className="decoration-none mx-auto"><button className="text-lg mt-10 px-9 py-2 bg-white font-semibold text-black w-fit font-Inter rounded-[0.35rem]" >Get Started</button></Link>
        </div>
      </div> 
      <footer className="p-5">
        <div className=" grid grid-cols-1">
          <div className="p-3 flex flex-col ">
            <p className="font-Madetommy p-1 text-lg font-semibold text-black">adFeed</p>
            <p className="text-sm px-1 font-extralight">Manage your ad engagements better.</p>
            <p className="p-1">Copyright &copy; {new Date().getFullYear()} - All rights reserved.</p>
          </div>
        </div>
        <div className="flex items-center mb-3 gap-1 mt-4">
          <Avatar className='flex items-center justify-center'>
            <Image src={profilePix} className="" alt="@storeprobuilder"/>
            {/* <AvatarFallback>JO</AvatarFallback> */}
          </Avatar>
          <p className="ml-2 text-base font-thin leading-5">Hello There &#128075;&#127997; I'm <span className="font-semibold text-red-900">James,</span> builder of adFeed. You can view my work on </p>
        </div>
      </footer>
    </div>
    <DrawerContent side='top'>
      hello world
    </DrawerContent>
  </Drawer>  
  );
}



export const menu = <svg data-name="Layer 1" className="w-5 h-5" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M21.86,18.73H9.18a2,2,0,0,1,0-4H21.86a2,2,0,0,1,0,4Z"/><path d="M54.82,18.73H34.88a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,34H9.18a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,49.27H30.07a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/></svg>