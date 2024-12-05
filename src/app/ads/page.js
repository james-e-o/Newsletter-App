'use client'
import { useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from 'next/image'
import customImg from '../../../public/custom96.png'
import customImgWhite from '../../../public/custom96w.png'
import { Input } from "@/components/ui/input"
import {Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge, badgeVariant } from '@/components/ui/badge'
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X, Search, Home, FileBox, Brush, HardDrive } from 'lucide-react'
import { usePathname } from "next/navigation";


const Ads = () => {
  // const path = usePathname()
  // const [activeMenu, setActiveMenu] = useState('')
  // let split = path.split('/')
  // const commonTitle = items.map(item=>item.title.toLowerCase())
  
  // useEffect(()=>{
  //    let Heading = commonTitle.filter(value => split.includes(value))
  //    setActiveMenu(Heading[Heading.length-1])
  // },[path])  

  return (
    <div className="overflow-x-clip flex w-full h-full flex-col font-Inter gap-2 pb-1">
      Dashboard
    
        
      
    </div>
  )
}

export default Ads




  // <div className={fillState?"absolute -translate-y-2 transition-[_z-index_160ms_ease-in-out_] z-10 bg-transparent opacity-100 inset-0 flex justify-center items-center rounded-md":"absolute inset-0 flex justify-center items-center transition-[_z-index_150ms_ease-in-out_] opacity-0 -z-10"}>
  //               <div id='pop' className="relative scale-95 h-full overflow-hidden w-full box-border p-2 flex bg-white opacity-0 transition-[_transform_160ms_ease-in-out_] border-border border rounded-lg shadow-lg">
                  
  //                 <div className="h-full flex flex-col">
  //                     <div className='flex justify-end p-2'>
  //                         <Button onClick={()=>{setFillContent(''),setActiveSlide(''), setFillState(false)}} variant='icon' >
  //                             <XIcon/>
  //                         </Button>
  //                     </div>
  //                     <>
  //                         {
  //                             fillContent === 'newad'?
  //                             <div className="p1">hello 2</div>
                              
  //                             :
  //                             ""
  //                         }
  //                     </>
  //                   </div>
  //                   <div id='pop-slide' className='h-full w-full p-2 absolute border bg-white left-[106%] flex flex-col'>
  //                       <div className='flex justify-start p-2'>
  //                           <Button onClick={()=>{setSliderState(false)}} variant='icon' >
  //                              <ArrowLeft/>
  //                           </Button>
  //                       </div>
  //                       <>
  //                         {
  //                           activeSlide === 'topics'? <Topics/>: 
  //                           // activeSlide === 'draft'? <Drafts/>: 
  //                           activeSlide === 'customize'?<MakeDesign/> : ""
  //                         }
  //                       </>
  //                   </div>
                
  //               </div>
  //           </div>

//   useEffect(()=>{
//     const pop =document.getElementById('pop')
//     const popSlide =document.getElementById('pop-slide')
//     const ad =document.getElementById('createad')
//     fillState? pop.classList.add('transit'):
//     pop.classList.remove('transit')
//     fillState? ad.classList.add('transit2'):
//     ad.classList.remove('transit2')
//     sliderState? popSlide.classList.add('pop-slide'):
//     popSlide.classList.remove('pop-slide')
// },[fillState,sliderState])
// const [fillContent, setFillContent]= useState('')
// const [fillState, setFillState] = useState(false)
// const [sliderState, setSliderState] = useState(false)
// const [activeSlide, setActiveSlide] =useState('')