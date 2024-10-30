'use client'
import { useState,useEffect } from 'react'
import { SketchPicker, SliderPicker, ChromePicker } from 'react-color'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from 'next/image'
import customImg from '../../../../public/custom96.png'
import customImgWhite from '../../../../public/custom96w.png'
import { Input } from "@/components/ui/input"
import {Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge, badgeVariant } from '@/components/ui/badge'
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X, Search, Brush } from 'lucide-react'
import { GearIcon } from '@radix-ui/react-icons'


const NewAd = ({designTrigger, categoryTrigger}) => {
        const [custom, setCustom] = useState(false)
        const [isOpen, setIsOpen] = useState(true)
        const [topics, setTopics] = useState([])
        const [loaded, setLoaded]= useState(false)
        const [color, setColor] = useState('orange')
        const [activeDialog, setActiveDialog]= useState('')
        const [pickState, setPickState] = useState(false)
    
        const tags = Array.from({ length: 10 }).map(
          (_, i, a) => `v1.2.0-beta.${a.length - i}`
        )
    
        return (
            <Tabs defaultValue="account" className="w-full flex flex-col overflow-y-hidden flex-grow">
                 <AlertDialog>
                  <AlertDialogContent className='rounded-md max-w-[80vw] p-2'>
                    <p className="p-1 h-fit flex justify-end items-center">
                      <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
                    </p>
                    
                    <AlertDialogTitle>
                      <h4 className="mb-2 text-sm font-medium leading-none">Tags</h4>
                    </AlertDialogTitle>
                      <>
                      {
                        activeDialog === 'styling'? <Styling/>: 
                        activeDialog === 'drafts'? <Drafts/>: 
                        activeDialog === 'saved'?<Saved/> : ""
                      }
                      </>
                      {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                  </AlertDialogContent>
  
              
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Write ad</TabsTrigger>
                <TabsTrigger value="password">AI generate</TabsTrigger>
              </TabsList>
              <div className="h-full flex flex-col overflow-y-scroll mt-2">
                <TabsContent value="account" className='mt-0'>
                  <Card className='shadow-none border-none'>
                    <CardHeader className='px-2'>
                      <CardTitle>New Ad</CardTitle>
                      <CardDescription>
                        Make changes to your account here. Click save when you're done.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                    
                  <form action="" name='new-pub' className=''>             
    
                      <Card className='mb-3 rounded-sm'>
                        <CardContent className='px-3 py-2'>
                        <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-sm mb-[0.13rem]' ><span>Ad details</span></label>
                          <CardDescription className='text-xs py-1'>
                            Spell out your advert.
                          </CardDescription>
                          <div className=' mt-2 ml-1 relative'>
                                <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs mb-[0.13rem]' ><span>Heading</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span></label>
                                    <Input className='' type='text' />
                                    {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                                </div>
                                <div className="mt-2 ml-1">
                                <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs' ><span>Description</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span></label>
                                    <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent p-3 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3"></textarea>
                                </div>
                        </CardContent>
                      </Card>
    
                      <Card className='mb-3 rounded-sm'>
                        <CardContent className='px-3 py-2'>
                        <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-sm mb-[0.13rem]' ><span>Ad optimization</span></label>
                          <CardDescription className='text-xs py-1'>
                            Set up your ad for better search filtering.
                          </CardDescription>
    
                          <div className="rounded-sm p-3 border">
                              <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs mb-[0.13rem]' ><span>#Hashtags</span></label>    
                              <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent px-3 py-1 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3"></textarea>
                          </div>
                         
                          <div className="rounded-sm mt-2 p-3 border">
                            <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs mb-[0.13rem]' ><span>Category</span></label>    
                            <div className="relative">
                             <Button variant='outline' className='mt-1 p-3' size='sm' onClick={categoryTrigger} >
                              <span>select categories</span>
                              <Plus className='ml-1 w-4 h-4' />
                             </Button>
                            </div>
                          </div>
                        </CardContent>
                        
                      </Card>
    
                      <Card className='mb-3 rounded-sm'>
                        <CardContent className='px-3 py-2'>
                          <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-sm mb-[0.13rem]' ><span>Ad graphics</span></label>
                          <CardDescription className='text-xs py-1'>
                            Set up design for poster.
                          </CardDescription>
                       
                          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
                            <CollapsibleContent className="">
                                <div className=' mt-2 ml-1 relative'>
                                  <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs mb-[0.13rem]' ><span>headline</span> </label>
                                  {/* <div className="rounded-md text-sm border border-gray-200 overflow-clip">
                                    <div className="flex justify-between p-2 items-center h-7">
                                      <input className='h-full rounded-none te border-none outline-none' type='text' />
                                      <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span>
                                      /* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> *
                                    </div>
                                    <div className=" h-7 flex items-center justify-start p-2 bg-gray-200">
                                      <AlertDialogTrigger onClick={()=>{setActiveDialog('styling')}} asChild>
                                        <Brush className='w-5 rounded-lg bg-white h-5'/>
                                      </AlertDialogTrigger>                                  
                                     
                                    </div>
                                  </div> */}
                                  <TextBox initAlert={()=>{setActiveDialog('styling')}}/>
                                </div>
                                <div className="mt-4 ml-1">
                                <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs' ><span>short note</span> <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span></label>
                                    <textarea name="" id="" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent p-3 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3"></textarea>
                                </div>
                                <div className="mt-2 ml-1">
                                    <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs' ><span>background</span></label>
                                    <div className="border mt-1 p-3 rounded">
                                      <p className="text-xs py-1">colors</p>
                                        <Accordion collapsible>
                                          <AccordionItem value="item-1">
                                            <div className="flex justify-between"> 
                                                <span className='text-xs'>background color</span>
                                                <AccordionTrigger>
                                                  <div className={ `p-1 shadow-md justify-center items-center inline-flex cursor-pointer` } onClick={()=>setPickState(!pickState) }>
                                                    <p className={ `w-5 h-4 inline-block rounded-sm bg-[slateblue]` } />
                                                  </div>
                                                </AccordionTrigger>
                                            </div>
                                            <AccordionContent>
                                              <ChromePicker color={color } onChange={(color)=>setColor({color:color.hex}) } />
                                            </AccordionContent>
                                          </AccordionItem>
                                        </Accordion>
                                      
                                    </div>
                                </div>
                            </CollapsibleContent>
                            
                            <div className="rounded-sm ml-1 mt-2 border p-3">
                              <div className='flex justify-between items-center'>
                                <p className="inline-block text-xs">Customize your poster design</p>
                                <CollapsibleTrigger asChild>
                                    <div>
                                        <Switch checked={custom} onCheckedChange={()=>setCustom(!custom)} />
                                    </div>
                                </CollapsibleTrigger>
                              </div>
                              <Button disabled={custom==false} size='sm' onClick={designTrigger} className=' mt-1 py-1 px-2 font-semibold text-xs border-border' variant={!isOpen?'':'icon'}><Image  src={!isOpen?customImgWhite:customImg} alt="An example image" width={20} height={20} className='mr-1'/> Customize</Button>
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
              </AlertDialog>
            </Tabs>
  )
}

export default NewAd



const TextBox = ({initAlert}) => {
  // const [activeDialog, setActiveDialog]= useState('')
  return (
      <div className="rounded-md text-sm border border-gray-200 overflow-clip">
        <div className="flex justify-between p-2 items-center h-7">
          <input className='h-full rounded-none te border-none outline-none' type='text' />
          <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span>
          {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
        </div>
        <div className=" h-7 flex items-center justify-start p-2 bg-gray-200">
          <AlertDialogTrigger onClick={initAlert} asChild>
            <Brush className='w-5 rounded-lg bg-white h-5'/>
          </AlertDialogTrigger>                                  
        
        </div>
      </div>
  )
}

const Styling = () => {
  const tags = Array.from({ length: 10 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )

  const [pickState, setPickState] = useState(false)
  const [color, setColor] = useState('orange')
  const [gradient, setGradient] = useState(false)
  return (
    // <ScrollArea className="h-72 w-full rounded-md">
      <div className="p-2">
       
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <p className="">
                <AccordionTrigger className='flex justify-start gap-2'> 
                  <span className="text-sm mr-4">text color</span>
                  <div className={ `p-1 rounded shadow inline-block cursor-pointer` } onClick={()=>setPickState(!pickState) }>
                    <div className={ `color bg-[orange]` } />
                  </div>
                </AccordionTrigger>
              </p>
              <AccordionContent>
                <ChromePicker color={color } onChange={(color)=>setColor({color:color.hex}) } />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <p className="">
                <AccordionTrigger className='flex justify-start gap-2'> 
                  <span className="text-sm mr-4">text color</span>
                  <div className={ `p-1 rounded shadow inline-block cursor-pointer` } onClick={()=>setPickState(!pickState) }>
                    <div className={ `color bg-[green]` } />
                  </div>
                </AccordionTrigger>
              </p>
              <AccordionContent>
                <ChromePicker color={color } onChange={(color)=>setColor({color:color.hex}) } />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <div className=" flex mt-1 justify-between items-center">
                <span className="text-sm font-semibold pb-1 mr-4">gradient text</span>
                <div className='py-1' >
                    <Switch checked={gradient} onCheckedChange={()=>setGradient(!gradient)} />
                </div>
              </div>
                {gradient?
                  <div className="flex items-center">
                    <AccordionTrigger className='flex p-1'>                         
                      <div className={ `p-1 rounded shadow inline-block cursor-pointer` } onClick={()=>setPickState(!pickState) }>
                        <p className={ `w-5 h-4 inline-block rounded-sm bg-[blue]` } />
                      </div>
                    </AccordionTrigger>
                    <AccordionTrigger className='flex p-1'>
                      <div className={ `p-1 rounded shadow inline-block cursor-pointer` } onClick={()=>setPickState(!pickState) }>
                        <p className={ `w-5 h-4 inline-block rounded-sm bg-[slateblue]` } />
                      </div>
                    </AccordionTrigger>
                  </div>
                    
                  :
                  ""
                }
                 
             
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div>
         
          { pickState ? <div className={ `popover` }>
            {/* <div className={ `cover` } onClick={()=>setPickState(false)}/> */}
           
          </div> : null }

        </div>
        
      </div>
    //  </ScrollArea> 
  )
}

const Drafts = () => {
  return (
    <div>
      hello world
    </div>
  )
}
