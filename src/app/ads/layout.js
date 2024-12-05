'use client'
import Link from "next/link"
import { Search, Home, HardDrive, Brush } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, } from "@/components/ui/drawer";
import dummyUser from '../../../public/dummy.jpg'

export default function AdsLayout({ children }) {
    return ( 
        <Drawer> 
        <div className='mx-3 flex flex-col relative overflow-hidden h-[99svh]'>
            <header className="px-1 pt-3 pb-1 justify-between items-center flex">
                <Link href={'/'} className="decoration-none text-primary"><h1 className="font-Madetommy decoration-none text-primary text-[24px]">adFeed</h1></Link>    
                <nav className="decoration-none items-center justify-end gap-3 flex">
                    <Link href={'/new'} className="decoration-none text-primary"><Button size='sm' className='text-sm' >Create Ad</Button></Link>
                        <DrawerTrigger>
                            <Avatar className='flex border border-gray-300 h-9 w-9 items-center justify-center'>
                                <Image src={dummyUser} className="" alt="@storeprobuilder"/>
                                {/* <AvatarFallback>JO</AvatarFallback> */}
                            </Avatar>
                        </DrawerTrigger>
                </nav>
            </header>
            <Separator/>
            {children}
            <footer className="bottom-0 py-2 z-30 bg-white absolute w-full border-t border-gray-200">
                <div className="p-1 relative flex justify-evenly gap-5 items-center">
                    <Link href={'/ads'} className='p-1 rounded-sm decoration-none'><Home className='text-black focus:bg-gray-200 w-5 h-5 '/></Link>
                    <Link href={'#'} className='p-1 decoration-none'><HardDrive className='text-black w-5 h-5'/></Link>
                    <Link href={'/ads/search'} className='p-1 decoration-none'><Search className='text-black w-5 h-5'/></Link>
                    <Link href={'/ads/graphics'} className='p-1 decoration-none'><Brush className='text-black w-5 h-5'/></Link>
                </div>
            </footer>    
        </div>
            <DrawerContent>
                <DrawerTitle>testing</DrawerTitle>
                hello world
            </DrawerContent>
        </Drawer>  
    );
}
