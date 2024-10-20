'use client'
import React,{useState}from 'react'
import HomeHeader from './header';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer"

export default function HomeLayout({ children }) {
  const [open, setOpen] = useState(false)
    return (    
       <div>
          <Drawer open={open} onOpenChange={setOpen}>
            <HomeHeader/>
            {children}
          </Drawer>
         hello  im testing
        </div>
    );
  }