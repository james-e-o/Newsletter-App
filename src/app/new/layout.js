import { Separator } from "@/components/ui/separator";
import Link from "next/link"

export default function NewAdLayout({ children }) {
  
    return (   
        <div className='mx-2 flex flex-col mb-2 h-full'>
            {children}
        </div>
    );
 }