import react from 'react'
import { Button, buttonVariants } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,} from "@/components/ui/drawer"


const HomeHeader = () => {
    return (
        <header className='font-sans flex justify-between border-b border-slate-300 py-5 px-10'>
            <p>hello world</p>
            <DrawerTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DrawerTrigger>
        </header>
    )
}

export default HomeHeader