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
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X, Search } from 'lucide-react'


const Ads = () => {
    const [activeMenu, setActiveMenu] = useState('yourads') 

   
  return (
    <div className="overflow-clip mb-1 relative border-none flex-grow flex w-full h-full flex-col font-Inter gap-3 px-2 pb-1">
        
        
        <Tabs defaultValue="yourads" className="flex font-Inter flex-col flex-grow w-full">
            <TabsList className="flex justify-between px-[1px] w-full bg-transparent gap-1 grid-cols-3">
                <TabsTrigger value='yourads' size='sm' className="px-1 border-b-[3px] rounded-none border-transparent data-[state=active]:border-gray-400 text-[0.82rem] data-[state=active]:bg-none data-[state=active]:border-b-[3px] data-[state=active]:shadow-none" onClick={()=>setActiveMenu('yourads')}>Your ads</TabsTrigger>
                <TabsTrigger value='drafts' size='sm' className="px-1 border-b-[3px] rounded-none border-transparent data-[state=active]:border-gray-400 text-[0.82rem] data-[state=active]:bg-none data-[state=active]:border-b-[3px] data-[state=active]:shadow-none" onClick={()=>setActiveMenu('drafts')}>Drafts</TabsTrigger>
                <TabsTrigger value='saved' size='sm' className="px-1 border-b-[3px] rounded-none border-transparent data-[state=active]:border-gray-400 text-[0.82rem] data-[state=active]:bg-none data-[state=active]:border-b-[3px] data-[state=active]:shadow-none" onClick={()=>setActiveMenu('saved')}>Saved</TabsTrigger>
            </TabsList>
            <div className="relative">
            {
              activeMenu === 'yourads'? <YourAds/>: 
              activeMenu === 'drafts'? <Drafts/>: 
              activeMenu === 'saved'?<Saved/> : ""
            }
            </div>
        </Tabs>
    </div>
  )
}

export default Ads



  const Topics = () => {
    useEffect(()=>{
      const input = document.querySelector("input[placeholder='search topics...']")
      input.focus()
    })
    return (
      <div className='p-1 flex h-full flex-col'>
        <div className="flex items-center justify-between mb-1">
          <input className='w-[90%] p-3 border-none hover:outline-none hover:border-none outline-none focus:outline-none focus:border-none shadow-none'  placeholder='search topics...' type='text' />
          <Search className='w-5 mr-2 h-5'/>
        </div>
        <Separator />
        <div className="mt-1 flex-grow bg-blue-500">
bulava
        </div>
      </div>
    )
  }
  const MakeDesign = () => {
    return (
      <div className='p-1'>
        <h4>Customize design</h4>
        <div className="flex ">
          <Input className='w-4/5' type='text' />
          <Search className='w-2 h-2'/>
        </div>
        <Separator />
        <div className="mt-1"></div>
      </div>
    )
  }





const YourAds = () => {
    return (
      <div>
        hi world
      </div>
    )
  }
  
  const Drafts = () => {
    return (
      <div>
        hello world
      </div>
    )
  }
  
  const Saved = () => {
    return (
      <div>
         <form action="" name='new-pub' className=''>
                    <div className=' mt-8 relative'>
                        <label htmlFor="" className='relative ml-[2px] pb-1 items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>Publication Name</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai generate</span></label>
                        <Input className='' />
                        {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                    </div>
                    <div className=' mt-5 relative'>
                        <label htmlFor="" className='relative ml-[2px] pb-1 items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>Description</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai generate</span></label>
                        <textarea name="" id="" className=' "flex rounded-md border border-slate-200 w-full bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="5"></textarea>
                        {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                    </div>
                    <div className=' mt-5 relative'>
                        <label htmlFor="pub-logo" className='relative ml-[2px] pb-1 items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>Publication Image</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai generate</span></label>
                        <Input className='' type='file' />
                        {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                    </div>
                    
                </form>
      </div>
    )
  }


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