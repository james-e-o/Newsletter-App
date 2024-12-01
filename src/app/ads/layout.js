'use client'
import Link from "next/link"
import { Search, Home, HardDrive, Brush } from "lucide-react";
import { Separator } from "@/components/ui/separator"

export default function AdsLayout({ children }) {
    return (    
        <div className='mx-3 flex flex-col relative overflow-hidden h-[99svh]'>
            <header className="px-1 pt-3 pb-1 justify-start flex">
                <Link href={'/'} className="decoration-none text-primary"><h1 className="font-Madetommy decoration-none text-primary text-xl">adFeed</h1></Link>    
            </header>
            <Separator/>
            {children}    
        </div>
    );
}
