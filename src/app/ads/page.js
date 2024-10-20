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
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X } from 'lucide-react'

const Ads = () => {
    const [activeMenu, setActiveMenu] = useState('yourads')
    const [fillContent, setFillContent]= useState('')
    const [fillState, setFillState] = useState(false)
    const [sliderState, setSliderState] = useState(false)

    useEffect(()=>{
        const pop =document.getElementById('pop')
        const popSlide =document.getElementById('pop-slide')
        const ad =document.getElementById('createad')
        fillState? pop.classList.add('transit'):
        pop.classList.remove('transit')
        fillState? ad.classList.add('transit2'):
        ad.classList.remove('transit2')
        sliderState? popSlide.classList.add('pop-slide'):
        popSlide.classList.remove('pop-slide')
    },[fillState,sliderState])
  return (
    <div className={"overflow-x-clip mb-1 relative border-none flex-grow flex w-full h-full flex-col font-Inter gap-3 px-2 pb-1"}>
        <div className={fillState?"absolute -translate-y-2 transition-[_z-index_160ms_ease-in-out_] z-10 bg-transparent opacity-100 inset-0 flex justify-center items-center rounded-md":"absolute inset-0 flex justify-center items-center transition-[_z-index_150ms_ease-in-out_] opacity-0 -z-10"}>
                <div id='pop' className="relative scale-95 h-full overflow-hidden w-full box-border p-2 flex bg-white opacity-0 transition-[_transform_160ms_ease-in-out_] border-border border rounded-lg shadow-lg">
                  {/* <div className="h-full w-[200%] flex"> */}
                  <div className="h-full flex flex-col">
                      <div className='flex justify-end p-2'>
                          <Button onClick={()=>{setFillContent(''), setFillState(false)}} variant='icon' >
                              <XIcon/>
                          </Button>
                      </div>
                      <>
                          {
                              fillContent === 'newad'?
                              <NewAd designTrigger={(e)=>{e.preventDefault(),setSliderState(true)}}/>
                              :
                              ""
                          }
                      </>
                    </div>
                    <div id='pop-slide' className='h-full w-full p-2 absolute bg-yellow-500 left-[106%] flex flex-col'>
                      <div className='flex justify-start p-2'>
                            <Button onClick={()=>{setSliderState(false)}} variant='icon' >
                               <ArrowLeft/>
                            </Button>
                        </div>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde modi dicta aspernatur numquam neque nam ipsum voluptatum nobis excepturi distinctio iusto voluptatibus impedit, deleniti sunt sed pariatur et ut?
                    </div>
                  {/* </div> */}
                </div>
            </div>
        <Button id='createad' onClick={()=>{setFillContent('newad'), setFillState(true)}} className='flex w-full justify-center items-center transition-[_margin_150ms_ease-in-out_]' size='sm'><span className='font-Inter' >Create new ad</span></Button>
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


const NewAd = ({designTrigger}) => {
    const [custom, setCustom] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    return (
        <Tabs defaultValue="account" className="w-full flex flex-col overflow-y-hidden flex-grow">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Write ad</TabsTrigger>
            <TabsTrigger value="password">AI generate</TabsTrigger>
          </TabsList>
          <div className="h-full flex flex-col overflow-y-scroll mt-2">
            <TabsContent value="account" className='mt-0'>
              <Card className='shadow-none border-none'>
                <CardHeader className='px-2'>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
              </Card>
                
              <form action="" name='new-pub' className=''>
                  <div className=' mt-5 relative'>
                      <label htmlFor="" className='relative ml-[2px] pb-1 items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>Description</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span></label>
                      <textarea name="" id="" className=' "flex rounded-md border border-slate-200 w-full bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="5"></textarea>
                      {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                  </div>
                  <div className=' mt-5 relative'>
                      <label htmlFor="" className='relative ml-[2px] pb-1 items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>Headline</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span></label>
                      <Input className='' />
                      {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                  </div>
                  <div className=' mt-5 relative'>
                      <label htmlFor="pub-logo" className='relative ml-[2px] pb-1 items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>Publication Image</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai generate</span></label>
                      <Input className='' type='file' />
                      {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                  </div>
                  <div className=' mt-5 relative'>
                      <label htmlFor="pub-logo" className='relative ml-[2px] pb-1 items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>Ad graphics</span></label>
                      <Input className='' type='file' />
                      {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                  </div>
                  

                  <Card className='mb-2'>
                    <CardContent className='px-3 py-2'>
                      <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>for Whom?</span></label>
                      <CardDescription className='text-xs py-1'>
                        Identify ad audience
                      </CardDescription>
                      <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent px-3 py-1 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3"></textarea>
                    </CardContent>
                  </Card>

                  <Card className='mb-2 rounded-sm'>
                    <CardContent className='px-3 py-2'>
                      <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-sm mb-[0.13rem]' ><span>Ad graphics</span></label>
                      <CardDescription className='text-xs py-1'>
                        Set up design for poster.
                      </CardDescription>
                   
                      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
                        <CollapsibleContent className="space-y-2">
                            <div className=' mt-2 ml-1 relative'>
                                <label htmlFor="pub-logo" className='relative ml-[2px] pb-1 items-center flex justify-between font-medium text-[0.8rem] mb-[0.13rem]' ><span>headline</span></label>
                                <Input className='' type='text' />
                                {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                            </div>
                            <div className="mt-2 ml-1">
                                <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-medium text-[0.8rem] mb-[0.13rem]' ><span>short note</span></label>
                                <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent p-3 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3"></textarea>
                            </div>
                        </CollapsibleContent>
                        
                        <div className="rounded-sm ml-1 mt-1 border p-3">
                          <div className='flex justify-between items-center'>
                            <p className="inline-block text-xs">Customize your poster design</p>
                            <CollapsibleTrigger>
                              <Switch checked={custom} onCheckedChange={()=>setCustom(!custom)} />
                            </CollapsibleTrigger>
                          </div>
                          <Button disabled={custom==false} size='sm' onClick={designTrigger} className=' mt-1 py-1 px-2 font-semibold text-xs border-border' variant={custom?'':'icon'}><Image  src={custom?customImgWhite:customImg} alt="An example image" width={20} height={20} className='mr-1'/> Customize</Button>
                        </div>
                      </Collapsible>
                    </CardContent>
                  </Card>
              </form> 
            </TabsContent>

            
            <TabsContent value="password" className='mt-0'>
              <Card className='shadow-none border-none'>
                <CardHeader className='px-3'>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged out.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className='mb-2'>
                <CardContent className='px-3 py-2'>
                  <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>What’s the ad for?</span></label>
                  <CardDescription className='text-xs py-1'>
                    Note: this here will generate a short headline and description for your ad.
                  </CardDescription>
                  <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent px-3 py-1 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="4"></textarea>

                </CardContent>
              </Card>
              <Card className='mb-2'>
                <CardContent className='px-3 py-2'>
                  <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>for Whom?</span></label>
                  <CardDescription className='text-xs py-1'>
                    Identify ad audience
                  </CardDescription>
                  <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent px-3 py-1 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3"></textarea>

                </CardContent>
              </Card>
              <Card className='mb-2'>
                <CardContent className='px-3 py-2'>
                  <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>for Whom?</span></label>
                  <CardDescription className='text-xs py-1'>
                    Identify ad audience
                  </CardDescription>
                  <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent px-3 py-1 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3"></textarea>

                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
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
  