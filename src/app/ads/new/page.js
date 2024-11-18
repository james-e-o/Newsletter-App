'use client'
import { useState,useEffect,useReducer,useContext } from 'react'
import { SketchPicker, SliderPicker, ChromePicker } from 'react-color'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from 'next/image'
import customImgWhite from '../../../../public/custom96w.png'
import { Input } from "@/components/ui/input"
import {Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge, badgeVariant } from '@/components/ui/badge'
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X, Search, Brush, ImageIcon, ArrowDown, ArrowUp, ArrowLeftIcon, ArrowRight, ArrowUpLeftIcon, ArrowDownLeft, ArrowUpRight, ArrowDownRightIcon, LetterTextIcon } from 'lucide-react'
import { GearIcon } from '@radix-ui/react-icons'
import { designData } from './layout'

import customImg from '../../../../public/custom96.png'
import format1 from '../../../../public/format 1.png'
import format2 from '../../../../public/format 2.png'
import format3 from '../../../../public/format 3.png'
import format4 from '../../../../public/format 4.png'
import format5 from '../../../../public/format 5.png'
import format6 from '../../../../public/format 6.png'


const NewAd = ({designTrigger, categoryTrigger}) => {

  const designs =[
    {src:format1,type:'hello world'}, {src:format2,type:'hello world'}, {src:format3,type:'hello world'}, {src:format4,type:'hello world'}, {src:format5,type:'hello world'}, {src:format6,type:'hello world'},]
        
        const [colorGradient, setColorGradient] = useState(false) 
        const [activeDialog, setActiveDialog]= useState('')
        const [pickState, setPickState] = useState(false)
        const [custom, setCustom] = useState(false) // Quick poster design
        const [response, setResponse] = useState('') // AI modify response

        // AD DATA
        const [heading, setHeading] = useState('')
        const [description, setDescription] = useState('')
        const [logoText, setLogoText] = useState('')
        const [logoImage, setLogoImage] = useState()
        const [headlineText, setHeadlineText] = useState('')
        const [subText, setSubText] = useState('')
        const [bannerText, setBannerText] = useState('')
        const [badgeText, setBadgeText] = useState('')
        const [bgImage, setBgImage] = useState()
        const [posterStyle, setPosterStyle] = useState('')
        
        // const [state, dispatch] = useReducer((state,action)=>{
        //   switch (action.type) {
        //     case (designs):
        //       return {count: state.count + 1};
        //     case 'decrement':
        //       return {count: state.count - 1};
        //     default:
        //       throw new Error();
        //   }
        // }, designs[0]);

        function bgImageTrigger(e){
          e.preventDefault()
          const input = document.getElementById('bg-image')
          input.click()
        }

        async function modifyHeading(prompt){
          const response = await fetch("/api/ai-modify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: prompt }),
          });
          const data = await response.json()
          console.log(data)
          setResponse(data.content)
        }

        function modifyDescription(e){
         
        }
    
        const tags = Array.from({ length: 10 }).map(
          (_, i, a) => `v1.2.0-beta.${a.length - i}`
        )
        
        useEffect(()=>{
          setPosterStyle(designs[0])
        },[])

        return (
            <Tabs defaultValue="account" className="w-full h-full flex flex-col overflow-y-clip flex-grow">   
              <AlertDialog>          
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Write ad</TabsTrigger>
                <TabsTrigger value="password">AI generate</TabsTrigger>
              </TabsList>
              <div className="h-full flex flex-col overflow-y-scroll my-2">
                <TabsContent value="account" className='mt-0'>
                  <Card className='shadow-none border-none'>
                    <CardHeader className='px-2'>
                      <CardTitle>New Ad</CardTitle>
                    </CardHeader>
                  </Card>
                    
                  <form action="" onSubmit={(e)=>e.preventDefault()} name='new-pub' className=''>             
                    
                      <Card className='mb-3 rounded-sm'>
                        
                          <AlertDialogContent className='rounded-md gap-0 max-w-[80vw] p-2'>
                            <AlertDialogTitle className='h-0 hidden'></AlertDialogTitle>
                            <p className="p-1 h-fit flex justify-end items-center">
                              <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
                            </p>
                            {
                                activeDialog === 'headline'? <AiBox result={response} useModification={()=>setHeading(response)} content={heading}/>: 
                                activeDialog === 'description'?<AiBox result={response} useModification={()=>setDescription(response)} content={description}/> : ""
                            }
                            
                          </AlertDialogContent>
                        <CardContent className='px-3 py-2'>
                        <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-sm mb-[0.13rem]' ><span>Ad details</span></label>
                          <CardDescription className='text-xs py-1'>
                            Write your advert.
                          </CardDescription>
                          <div className=' mt-2 ml-1 relative'>
                                <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs mb-1' >
                                  <span>Heading</span> 
                                  <AlertDialogTrigger disabled={heading===""} onClick={(e)=>{setActiveDialog('headline'),modifyHeading(heading)}}>
                                    <span  style={heading===""?{opacity:'0.4'}:{opacity:'1'}} className=' rounded-xl border border-alt bg-accent px-2 py-[2px] leading-loose italic text-[10px]'>ai modify</span>
                                  </AlertDialogTrigger>
                                </label>
                                <Input id='heading-text' className='' onChange={({target})=>setHeading(target.value)} value={heading} type='text' />
                                    {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                          </div>
                                <div className="mt-2 ml-1">
                                  <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs' >
                                    <span>Description</span> 
                                    <AlertDialogTrigger disabled={description===""} onClick={(e)=>{setActiveDialog('description'),modifyDescription}}>
                                      <span  style={description===""?{opacity:'0.4'}:{opacity:'1'}} className=' rounded-xl border border-alt bg-accent px-2 py-[2px] leading-loose italic text-[10px]'>ai modify</span>
                                    </AlertDialogTrigger>
                                  </label>
                                  <textarea name="" id="body-text" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent p-3 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3" onChange={({target})=>setDescription(target.value)} value={description}></textarea>

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
                        <CardContent className='px-3 py-3'>
                          <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-sm mb-[0.13rem]' ><span>Ad graphics</span></label>
                          <CardDescription className='text-xs py-1'>
                            Set up design for poster.
                          </CardDescription>
                       
                          <div className={custom?"grid grid-rows-[1fr] transition-collapse":"grid grid-rows-[0fr] transition-collapse"}>
                            <div className="overflow-hidden">
                              <div className="rounded-sm max-h-min my-2 border p-1">

                              
                              <p className="mb-2 text-xs font-semibold text-center">Quick poster</p>
                              <Separator/>
                            <label htmlFor="" className=' ml-1 p-1 mt-3 items-center flex justify-between font-semibold text-xs' ><span>poster style</span></label>
                                <ScrollArea className='whitespace-nowrap overflow-x-scroll'>
                                  <div className="flex mb-1 w-max gap-2">
                                    {designs.map((design,index) =>(
                                      <div key={index} className='w-fit' onClick={()=>setPosterStyle(designs[index])}>
                                        <Card className={posterStyle.src==design.src?'mx-1 overflow-clip  w-36 h-24 border-2 border-violet-700':'mx-1 overflow-clip border-2 border-gray-200  w-36 h-24'} >
                                          <Image alt={`format${index}`} src={design.src} className='scale-[1.07] relative  h-full w-full'/>
                                        </Card>
                                        <p className="text-center text-xs my-1">{design.type}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <ScrollBar orientation='horizontal'/>
                                </ScrollArea>

                                <div>
                                  hello tester
                                  {/* {
                                    posterStyle==(designs[0] || designs[4])?
                                    <div>
                                      greetings earth
                                    </div>
                                    :
                                    ''
                                  } */}
                                  {
                                    posterStyle==(designs[0] || designs[4])?
                                    <PosterDesignForm logo={true}/>
                                    :
                                    posterStyle==(designs[2] || designs[3] || designs[5]) ?
                                    <PosterDesignForm subtext={true}/>
                                    :
                                    <PosterDesignForm banner={true}/>
                                  }
                                </div>                
                               
                                {/* <div className="mt-2 ml-1">
                                    <label htmlFor="" className=' ml-[2px] items-center flex justify-between font-semibold text-xs' ><span>background</span></label>
                                    <div className="border px-3 mt-1 py-1 rounded">
                                        
                                        <div className="flex mb-3 justify-between items-center"> 
                                            <span className='text-xs'>background color</span>                                           
                                            <div className={ `p-1 shadow-md justify-center items-center inline-flex cursor-pointer` } onClick={()=>setPickState(!pickState) }>
                                              <Button disabled={colorGradient==true} className={ `w-6 h-3 inline-block rounded-sm bg-[slateblue]` } />
                                            </div>
                                        </div>                                                                                
                                       
                                        <div >
                                          <div className='flex justify-between max-h-min items-center'>
                                            <p className="inline-block text-xs">color gradient</p>
                                            <div>
                                                <Switch checked={colorGradient==true} onCheckedChange={()=>setColorGradient(!colorGradient)} />
                                            </div>
                                          </div>
                                          
                                            <div className={colorGradient?"grid mt-2 ml-2 grid-rows-[1fr] transition-collapse":"grid mt-2 ml-2 grid-rows-[0fr] transition-collapse"}>
                                              <div className="overflow-hidden">
                                                
                                                <div className="flex mb-3 justify-between items-center">
                                                  <AlertDialogTrigger asChild>
                                                    <Button size='sm' variant='outline' className='p-1 h-fit inline-flex rounded-sm items-center' >gradient style<ArrowUpLeftIcon className='h-2 w-3'/><ArrowDownRightIcon className='h-2 w-3'/></Button>
                                                  </AlertDialogTrigger>    
                                                </div>
                                              </div>                                            
                                            </div>                                        
                                        </div>
                                        <div className="mb-2 mt-2 flex justify-between items-center">
                                          <input type="file" name="image" onChange={(e)=>setBgImage(e.target.files[0])} hidden id="bg-image" />  
                                          <Button size='sm' onClick={bgImageTrigger} className='py-1 pl-2 pr-1 h-fit inline-flex rounded-sm items-center' variant='outline'>use image<ImageIcon className='w-4 h-2 '/></Button>
                                          <GearIcon className='w-6 h-6 text-black'/>
                                        </div>  
                                    </div>
                                </div>
                                <div className=' mt-2 ml-1 relative'>

                                    <TextBox changeText={()=>{setLogoText}} changeLogo={(e)=>setLogoImage(e.target.files[0])} placeholder='...logo text' label={'logo'} logo={true} modify={false}/>

                                    <TextBox changeText={()=>{setHeadlineText}} placeholder='...headline text' label={'headline'} modify={true}/>
                                 
                                    <TextBox changeText={()=>{setSubText}} placeholder='...mini text' label={'mini text'} modify={true}/>

                                    <TextBox changeText={()=>{setBadgeText}} placeholder='...badge' label={'badge'}/>

                                    <TextBox changeText={()=>{setBannerText}} placeholder='...banner' label={'banner'}/>
                                  
                                </div> */}
                              </div>
                            </div>
                            <div className="rounded-sm max-h-min my-2 border p-2">
                              <div className='flex justify-between items-center'>
                                <p className="inline-block text-xs">Set up quick poster</p>
                                <div>
                                    <Switch checked={custom} onCheckedChange={()=>setCustom(!custom)} />
                                </div>
                              </div>
                              <Button disabled={custom==true} size='sm' onClick={designTrigger} className=' mt-1 py-1 px-2 font-semibold text-xs border-border' variant={!custom?'':'icon'}><Image  src={!custom?customImgWhite:customImg} alt="An example image" width={20} height={20} className='mr-1'/> Customize</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Button  className='w-full mb-2'>Save to draft</Button>
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







const PosterDesignForm = ({color,gradient,bg_img,logo,headline,subtext,badge,banner}) => {

  const [colorGradient, setColorGradient] = useState(false) 

  const [logoText, setLogoText] = useState('')
  const [logoImage, setLogoImage] = useState()
  const [headlineText, setHeadlineText] = useState('')
  const [subText, setSubText] = useState('')
  const [bannerText, setBannerText] = useState('')
  const [badgeText, setBadgeText] = useState('')
  const [bgImage, setBgImage] = useState()
  return (
    <div>
      <div className="mt-2 ml-1">
          <label htmlFor="" className=' ml-[2px] items-center flex justify-between font-semibold text-xs' ><span>background</span></label>
          <div className="border px-3 mt-1 py-1 rounded">
              
              {color? <div className="flex mb-3 justify-between items-center"> 
                  <span className='text-xs'> color</span>                                           
                  <div className={ `p-1 shadow-md justify-center items-center inline-flex cursor-pointer` } onClick={()=>setPickState(!pickState) }>
                    <Button disabled={colorGradient==true} className={ `w-6 h-3 inline-block rounded-sm bg-[slateblue]` } />
                  </div>
              </div>:''}                                                                                
             
              {gradient?<div >
                <div className='flex justify-between max-h-min items-center'>
                  <p className="inline-block text-xs">color gradient</p>
                  <div>
                      <Switch checked={colorGradient==true} onCheckedChange={()=>setColorGradient(!colorGradient)} />
                  </div>
                </div>                
                <div className={colorGradient?"grid mt-2 ml-2 grid-rows-[1fr] transition-collapse":"grid mt-2 ml-2 grid-rows-[0fr] transition-collapse"}>
                  <div className="overflow-hidden">
                    
                    <div className="flex mb-3 justify-between items-center">
                      <AlertDialogTrigger asChild>
                        <Button size='sm' variant='outline' className='p-1 h-fit inline-flex rounded-sm items-center' >gradient style<ArrowUpLeftIcon className='h-2 w-3'/><ArrowDownRightIcon className='h-2 w-3'/></Button>
                      </AlertDialogTrigger>    
                    </div>
                  </div>                                            
                </div>                                        
              </div>:''}

              {bg_img?<div className="mb-2 mt-2 flex justify-between items-center">
                <input type="file" name="image" onChange={(e)=>setBgImage(e.target.files[0])} hidden id="bg-image" />  
                <Button size='sm' onClick={bgImageTrigger} className='py-1 pl-2 pr-1 h-fit inline-flex rounded-sm items-center' variant='outline'>use image<ImageIcon className='w-4 h-2 '/></Button>
                <GearIcon className='w-6 h-6 text-black'/>
              </div> :'' }
          </div>
      </div>
      <div className=' mt-2 ml-1 relative'>

         {logo? <TextBox changeText={()=>{setLogoText}} changeLogo={(e)=>setLogoImage(e.target.files[0])} placeholder='...logo text' label={'logo'} logo={true} modify={false}/>:''}

          {headline?<TextBox changeText={()=>{setHeadlineText}} placeholder='...headline text' label={'headline'} modify={true}/>:''}
        
          {subtext?<TextBox changeText={()=>{setSubText}} placeholder='...mini text' label={'mini text'} modify={true}/>:''}

          {badge?<TextBox changeText={()=>{setBadgeText}} placeholder='...badge' label={'badge'}/>:''}

          {banner?<TextBox changeText={()=>{setBannerText}} placeholder='...banner' label={'banner'}/>:''}
        
      </div>
    </div>
  )
}

const TextBox = ({changeText,changeLogo, logo, modify, label, placeholder}) => {

  const [activeDialog, setActiveDialog]= useState('')
  function logoImageTrigger(e){
    e.preventDefault()
    const logoInput = document.getElementById('bg-image')
    logoInput.click()
  }

  return (
      <div className="rounded-md text-sm border mb-3 border-gray-200 overflow-clip">
        <AlertDialog>
          <AlertDialogContent className='rounded-md max-w-[80vw] gap-0 p-2'>
          <AlertDialogTitle className='h-0'></AlertDialogTitle>
            <p className="p-1 h-fit flex justify-end items-center">
              <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
            </p>
            {
                activeDialog === 'coloring'? <Styling/>: 
                // activeDialog === 'draft'? <Drafts/>: 
                activeDialog === 'font'?<Font/> : ""
            }
            
          </AlertDialogContent>
        {label && <><label htmlFor="" className='relative ml-[2px] p-1 items-center flex justify-between font-semibold text-xs mb-[0.13rem]' ><span>{label}</span> </label>
        <Separator/></> }
        
        <div className="flex justify-between px-2 py-1 items-center h-7">
          <input onChange={changeText} className='h-full rounded-none te border-none outline-none placeholder:italic' placeholder={placeholder} type='text' />
          {modify && <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span>}
          {logo && <div className='flex justify-start items-center gap-2'>
          <Button size='sm' className='p-1 h-fit m-1 inline-flex rounded-sm items-center' onClick={logoImageTrigger} variant='secondary'><ImageIcon className='w-4 h-2 '/>image</Button>
          <input type="file" name="image" onChange={changeLogo} hidden id="logo-image" />  
        </div>}
          {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
        </div>
        <div className=" h-8 flex items-center gap-5 justify-center p-2 bg-gray-200">
          <AlertDialogTrigger asChild>
            <Brush onClick={()=>setActiveDialog('coloring')} className='w-5 rounded-lg bg-white h-5'/>
          </AlertDialogTrigger>                                  
          <AlertDialogTrigger asChild>
            <LetterTextIcon onClick={()=>setActiveDialog('font')} className='w-5 rounded-lg bg-white h-5'/>
          </AlertDialogTrigger>                                  
          <AlertDialogTrigger asChild>
            <Brush onClick={()=>setActiveDialog('font')} className='w-5 rounded-lg bg-white h-5'/>
          </AlertDialogTrigger>                                  
        
        </div>
        </AlertDialog>
      </div>
  )
}

const Gradients = () => {
  return (
    <div>
     <div className=" aspect-video rounded bg-slate-300"></div>
      <ScrollArea className=" whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
        
        </div>
      </ScrollArea>
    </div>
  )
}

const Styling = () => {
  // const tags = Array.from({ length: 10 }).map(
  //   (_, i, a) => `v1.2.0-beta.${a.length - i}`
  // )

  const [pickState, setPickState] = useState(false)
  const [color, setColor] = useState('orange')
  const [gradient, setGradient] = useState(false)
  const [accordion1, setAccordion1] = useState(false)
  const [accordion2, setAccordion2] = useState(false)
  return (
    // <ScrollArea className="h-72 w-full rounded-md">
      <div className="p-1">
        
        <h4 className="mb-2 text-sm font-medium leading-none">Text color</h4>
        <div className=' flex px-3 py-1 justify-between items-center' onClick={()=>{gradient && setGradient(false),setAccordion1(!accordion1) }}>
          <span className="text-sm font-medium mr-4">color</span>
          <Button disabled={gradient==true} className={ `w-6 h-3 shadow-sm cursor-pointer inline-block rounded-sm bg-[slateblue]` } />
        </div>
        <div className={accordion1?"grid grid-rows-[1fr] px-3 transition-collapse":"grid grid-rows-[0fr] px-3 transition-collapse"}>
          <div className='overflow-hidden'>
            <ChromePicker  color={color } onChange={(color)=>setColor({color:color.hex}) } />
          </div>
        </div>
        <div className=' flex px-3 justify-between items-center'>
           <span className="text-sm font-medium pb-1 mr-4">gradient color</span>
            <div className='py-1' >
                <Switch checked={gradient} onCheckedChange={()=>{setAccordion1(false), setGradient(!gradient)}} />
            </div>
        </div>
        <div className={gradient?"grid grid-rows-[1fr] px-3 transition-collapse":"grid grid-rows-[0fr] px-3 transition-collapse"}>
          <div className='overflow-hidden'>
           <Tabs defaultValue="grad 1" className='w-full'>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grad 2"><div className={ `color bg-[orange] inline-block`} /></TabsTrigger>
                <TabsTrigger value="grad 1"><div className={ `color bg-[orange] inline-block`} /></TabsTrigger>
              </TabsList>
              <TabsContent value="grad 1" className='mt-1 p-1'>
                <ChromePicker/>  
              </TabsContent>
              <TabsContent value="grad 2" className='mt-1 p-1'>
                <ChromePicker/>                
              </TabsContent>
           </Tabs>
          </div>
        </div>
       </div>
    //  </ScrollArea> 
  )
}

const Font = () => {
  return (
    <div>
      <h4 className="mb-2 text-sm font-medium leading-none">Font</h4>
      <div className=" px-3 py-1 justify-between items-center">
        <p className="">family</p>
        <ScrollArea ></ScrollArea>
      </div>
      <div className=" px-3 py-1 justify-between items-center">
        <p className="">family</p>
        <div className="sc"></div>
      </div>
    </div>
  )
}



const AiBox = ({result,content,useModification}) => {
  return (
    <div className=''>
      <p className="px-2 text-gray-400">
        {content}
        ?
      </p>
      <div className="rounded px-2 overflow-y-scroll overflow-x-hidden h-fit max-h-32">
        {result}
      </div>
      <div className="flex items-center px-2 mt-1 justify-between">
        <button size='sm' disabled={!result} className='rounded-2xl text-white text-xs bg-black px-3 disabled:opacity-50 py-1'>Improve</button>
        <button size='sm' disabled={!result} className='rounded-2xl text-xs text-white bg-black px-3 disabled:opacity-50 py-1' onClick={useModification}>Use</button>
      </div>
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





















{/* <div className="flex mb-3 overflow-hidden justify-between">
  <p className="text-xs">gradient direction</p>
  <div className="relative grid grid-cols-4 gap-2 justify-end">
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowDown className='h-2 w-3' /></Button>
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowUp className='h-2 w-3' /></Button>
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowLeftIcon className='h-2 w-3' /></Button>
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowRight className='h-2 w-3' /></Button>
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowDownRightIcon className='h-2 w-3' /></Button>
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowUpRight className='h-2 w-3' /></Button>
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowDownLeft className='h-2 w-3' /></Button>
    <Button variant="outline" className='p-0 w-7 h-7' size="icon"><ArrowUpLeftIcon className='h-2 w-3' /></Button>
  </div>
</div> */}