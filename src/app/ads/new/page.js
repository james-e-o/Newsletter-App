'use client'
import { useState,useEffect,useReducer,useContext } from 'react'
import { ColorPicker, useColor,Saturation, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
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
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X, Search, Brush, ImageIcon, ArrowDown, ArrowUp, ArrowLeftIcon, ArrowRight, ArrowUpLeftIcon, ArrowDownLeft, ArrowUpRight, ArrowDownRightIcon, LetterTextIcon, Minus } from 'lucide-react'
import { GearIcon } from '@radix-ui/react-icons'
import { designData } from './layout'

import customImg from '../../../../public/custom96.png'
import format1 from '../../../../public/format 1.png'
import format2 from '../../../../public/format 2.png'
import format3 from '../../../../public/format 3.png'
import format4 from '../../../../public/format 4.png'
import format5 from '../../../../public/format 5.png'
import format6 from '../../../../public/format 6.png'

const designs =[
  {src:format1,type:'hello world'}, {src:format2,type:'hello world'}, {src:format3,type:'hello world'}, {src:format4,type:'hello world'}, {src:format5,type:'hello world'}, {src:format6,type:'hello world'},]

const fontFamilies = [
  'Inter', 'Madetommy','Voces', 'Clash'
]

// function FormData(value,{color,fontSize,fontFamily,fontStyle}){
//   this.value = value
//   this.color = color
//   this.fontSize = fontSize
//   this.fontFamily = fontFamily
//   this.fontStyle = fontStyle
// }

const NewAd = ({designTrigger, categoryTrigger}) => {
        
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
        const [headlineText, setHeadlineText] = useState([])
        const [subText, setSubText] = useState('')
        const [bannerText, setBannerText] = useState('')
        const [badgeText, setBadgeText] = useState('')
        const [bgImage, setBgImage] = useState()
        const [posterStyle, setPosterStyle] = useState(designs[0])
        

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
        
        const formdata = new FormData()

        function Submit(){
          formdata.append('headline',headlineText)
          console.log(formdata,headlineText)
        }
        // useEffect(()=>{
        //   fetch('/api/get-designs')
        //   setPosterStyle(designs[0])
        // },[posterStyle])

        return (
            <Tabs defaultValue="account" className="w-full h-full flex flex-col overflow-y-clip">   
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
                                <div>
                                


                                    <PosterDesignForm 
                                      logo={true} 
                                      changeHeadlineText={(e,index)=>{setHeadlineText( prev=>{ let newArray = [...prev]; newArray[index] = e.target.value ;return newArray
                                      }),console.log(headlineText)}}
                                    />
                                  


                                </div>                              
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
                      <Button onClick={Submit} className='w-full mb-2'>Save to draft</Button>
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
                      <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-[0.8rem] mb-[0.13rem]' ><span>What's the ad for?</span></label>
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







const PosterDesignForm = ({color,gradient,bg_img,logo,headline,subtext,badge,banner,changeHeadlineText}) => {

  const [colorGradient, setColorGradient] = useState(false) 

  const [logoText, setLogoText] = useState('')
  const [logoImage, setLogoImage] = useState()
  const [image, setImage] = useState([])
  const [headlineText, setHeadlineText] = useState([])
  const [subText, setSubText] = useState('')
  const [bannerText, setBannerText] = useState('')
  const [badgeText, setBadgeText] = useState('')
  const [bgImage, setBgImage] = useState()

  const [logoCount, setLogoCount] = useState([])
  const [imageCount, setImageCount] = useState([])
  const [bannerCount, setBannerCount] = useState([])
  const [badgeCount, setBadgeCount] = useState([])
  const [headLineCount, setHeadLineCount] = useState([])
  const [subTextCount, setSubTextCount] = useState([])
  const [posterStyle, setPosterStyle] = useState(designs[0])

  function openImageDialog(e){
    e.preventDefault()
    const nextInput = document.getElementById('next-image')
    nextInput.click()
  }

  function addImage({target}){
    const img = target.files[0]
    let reader = new FileReader()
    reader.onload=({target})=>{
      setImage([...image,`${target.result}`])
      setImageCount([...imageCount,`${image.length+1}`])
    }
    reader.readAsDataURL(img) 
  }

  // function updateInput(value,type,index){
  //   ['set'+type](prev=>{
  //     let newArray = [...prev]
  //     newArray[index] = target.value
  //     return newArray
  //   })
   
  // }

  useEffect(()=>{
    
  },[])

  return (
    <div>
        <ScrollArea className='whitespace-nowrap overflow-x-scroll'>
          <div className="flex mb-1 w-max gap-2">
            {designs.map((design,index) =>(
              <div key={index} className='w-fit' onClick={()=>{setPosterStyle(designs[index]),console.log(index,designs[index])}}>
                <Card className={posterStyle.src==design.src?'mx-1 overflow-clip  w-36 h-24 border-2 border-violet-700':'mx-1 overflow-clip border-2 border-gray-200  w-36 h-24'} >
                  <Image alt={`format${index}`} src={design.src} className='scale-[1.07] relative  h-full w-full'/>
                </Card>
                <p className="text-center text-xs my-1">poster {index+1}</p>
              </div>
            ))}
          </div>
          <ScrollBar orientation='horizontal'/>
        </ScrollArea>
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
        <div className="mt-1">
          <div className="p-1 flex items-center justify-between gap-3">
            <p className="p-1 text-xs font-semibold">Logo</p>
          <div>

            {logoCount.length<1?<Button onClick={()=>{logoCount.length<1?setLogoCount([...logoCount,`logo${logoCount.length+1}`]):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
            {logoCount.length>=1?<Button onClick={()=>{logoCount.length>=1?setLogoCount(logoCount.filter(logo=>logo==`logo${logoCount.length-1}`)):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
            </div>
          </div>
            {logoCount && logoCount.map((logo,index)=>(
              <TextBox key={index} changeText={(e)=>{setLogoText(e.target.value)}} type='logo' changeLogo={(e)=>setLogoImage(e.target.files[0])} placeholder='...logo text' logo={true} modify={false}/>
            ))}          
        </div>
        <div className="mt-1">
          <div className="p-1 flex items-center justify-between gap-3">
            <p className="p-1 text-xs font-semibold">headline</p>
            <div>
            {headLineCount.length<2?<Button onClick={()=>{headLineCount.length<2?setHeadLineCount([...headLineCount,`headline${headLineCount.length+1}`]):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
            {headLineCount.length>=1?<Button onClick={()=>{headLineCount.length>=1?setHeadLineCount(headLineCount.filter(headline=>headline==`headline${headLineCount.length-1}`)):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
            </div>
          </div>
            {headLineCount && headLineCount.map((headline,index)=>(
              <TextBox key={index} changeText={(e)=>changeHeadlineText(e,index)} type='headline' placeholder='...headline text' modify={true}/>   
            ))}          
        </div>
        <div className="mt-1">
          <div className="p-1 flex items-center justify-between gap-3">
            <p className="p-1 text-xs font-semibold">subtext</p>
            <div>
            {subTextCount.length<2?<Button onClick={()=>{subTextCount.length<2?setSubTextCount([...subTextCount,`subtext${subTextCount.length+1}`]):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
            {subTextCount.length>=1?<Button onClick={()=>{subTextCount.length>=1?setSubTextCount(subTextCount.filter(subtext=>subtext==`subtext${subTextCount.length-1}`)):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
            </div>
          </div>
            {subTextCount && subTextCount.map((subtext,index)=>(
              <TextBox key={index} changeText={(e)=>{setSubText(e.target.value)}} type='subtext' placeholder='...sub text' modify={true}/>
            ))}          
        </div>
        <div className="mt-1">
          <div className="p-1 flex items-center justify-between gap-3">
            <p className="p-1 text-xs font-semibold">badge</p>
          <div>

            {badgeCount.length<2?<Button onClick={()=>{badgeCount.length<2?setBadgeCount([...badgeCount,`badge${badgeCount.length+1}`]):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
            {badgeCount.length>=1?<Button onClick={()=>{badgeCount.length>=1?setBadgeCount(badgeCount.filter(badge=>badge==`badge${badgeCount.length-1}`)):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
            </div>
          </div>
            {badgeCount && badgeCount.map((badge,index)=>(
              <TextBox key={index} changeText={(e)=>{setBadgeText(e.target.value)}} type='badge' placeholder='...badge'/>
            ))}          
        </div>
        <div className="mt-1">
          <div className="p-1 flex items-center justify-between gap-3">
            <p className="p-1 text-xs font-semibold">banner</p>
            <div>
            {bannerCount.length<2?<Button onClick={()=>{bannerCount.length<2?setBannerCount([...bannerCount,`banner${bannerCount.length+1}`]):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
            {bannerCount.length>=1?<Button onClick={()=>{bannerCount.length>=1?setBannerCount(bannerCount.filter(banner=>banner==`banner${bannerCount.length-1}`)):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
            </div>
          </div>
            {bannerCount && bannerCount.map((banner,index)=>(  
              <TextBox key={index} changeText={(e)=>{setBannerText(e.target.value)}} type='banner' placeholder='...banner' />
            ))}          
        </div>        
        <div className="mt-1">
          <div className="p-1 flex items-center justify-between gap-3">
            <p className="p-1 text-xs font-semibold">add image</p>
            <div>
            {imageCount.length<2?<Button onClick={(e)=>{imageCount.length<2?openImageDialog(e):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
            {imageCount.length>=1?<Button onClick={()=>{imageCount.length>=1?(setImageCount(imageCount.filter(image=>image==`image${imageCount.length-1}`)),setImage(image.filter((img,i)=>i==image.length-1))):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
            </div>
            <input type="file" name="next-image" onChange={addImage} hidden id="next-image" />  
          </div>
          <div>
            {image && image.map((image,index)=>(  
              <Image key={index} height={50} width={100} alt={`image${index}`} src={image} className='relative inline-block h-[100px] border rounded-sm mr-1'/>
            ))} 
          </div>        
        </div>        
      </div>
    </div>
  )
}

const TextBox = ({changeText, type, logo, modify, label, placeholder,font,setFont}) => {

  const [activeDialog, setActiveDialog]= useState('')

  //FONT
  // const [font, setFont] = useState(fontFamilies[0])
  //COLORING
  const [gradient, setGradient] = useState(false)
  const [thirdGradient, setThirdGradient] = useState(false)
  const [accordion1, setAccordion1] = useState(false)
  const [color, setColor] = useColor("salmon");
  const [color2, setColor2] = useColor("slateblue");
  const [color3, setColor3] = useColor("orange");

  const [localData, setLocalData]=useState({
    value:null,
    fontFamily:'',
    fontSize:'',
    bold:false,
    italics:false,
    underline:false,
    gradient:gradient,
    color:[color,color2,color3]
  })  

  function logoImageTrigger(e){
    e.preventDefault()
    const logoInput = document.getElementById('bg-image')
    logoInput.click()
  }
  
  return (
      <div className="rounded-md text-sm border mb-3 border-gray-200 overflow-clip">
        <AlertDialog>
          <AlertDialogContent className='rounded-md max-w-[80vw] gap-0 p-2'>
          <AlertDialogTitle className='h-0 '></AlertDialogTitle>
            <p className="p-1 h-fit flex justify-between items-center">
              <span className='font-bold text-xs'>{activeDialog}</span>
              <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
            </p>
            {
                activeDialog === 'text-color'? 
                
                <div className="p-1">  
                  {/* <h4 className="mb-2 text-sm font-medium leading-none">text color</h4> */}
                  <div className=' flex px-3 py-1 justify-between items-center' onClick={()=>{gradient && setGradient(false),setAccordion1(!accordion1) }}>
                    <span className="text-sm font-medium mr-4">color</span>
                    <button disabled={gradient==true} style={{backgroundColor:color.hex}} className={ `w-6 h-3 shadow-sm cursor-pointer disabled:opacity-45 inline-block rounded-sm]` } />
                  </div>
                  <div className={accordion1?"grid grid-rows-[1fr] px-3 transition-collapse":"grid grid-rows-[0fr] px-3 transition-collapse"}>
                    <div className='overflow-hidden'>
                    <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} />
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
                        <div className="w-full flex gap-2">
                          <TabsList className={`inline-grid w-fit gap-2 bg-gray-200 rounded-[3px]  p-[2px] h-fit ${thirdGradient?'grid-cols-3':'grid-cols-2'}`}>
                            <TabsTrigger className='p-1 rounded-sm' value="grad 1"><div style={{backgroundColor:color.hex}} className={ `color p-1 inline-block`} /></TabsTrigger>
                            <TabsTrigger className='p-1 rounded-sm' value="grad 2"><div style={{backgroundColor:color2.hex}} className={ `color p-1 inline-block`} /></TabsTrigger>
                            {thirdGradient?<TabsTrigger className='p-1 rounded-sm' value="grad 3"><div style={{backgroundColor:color3.hex}} className={ `color p-1 inline-block`} /></TabsTrigger>:''}
                          </TabsList>
                          <Button onClick={()=>setThirdGradient(!thirdGradient)} variant="outline" className='p-0 w-6 h-6' size="icon">{!thirdGradient?<Plus className='h-full w-full' />:<Minus className='h-full w-full'/>}</Button>
                        </div> 
                        <TabsContent value="grad 1" className='mt-1 p-1'>
                          <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} />
                        </TabsContent>
                        <TabsContent value="grad 2" className='mt-1 p-1'>
                          <ColorPicker color={color2} hideInput={["rgb", "hsv"]} height={100} onChange={setColor2} />
                        </TabsContent>
                        <TabsContent value="grad 3" className='mt-1 p-1'>
                          <ColorPicker color={color3} hideInput={["rgb", "hsv"]} height={100} onChange={setColor3} />
                        </TabsContent>
                    </Tabs>
                    </div>
                  </div>
                </div>
                
                : 
                // activeDialog === 'draft'? <Drafts/>: 
                activeDialog === 'font'?
                
                <div className='overflow-x-scroll'>
                  <h4 className="mb-1 mx-2 text-[0.7rem] font-semibold leading-none">text input</h4>
                  <div style={{fontFamily:localData.fontFamily}} className={`p-1 text-center border mb-1 text-[0.8125rem]`}>"{localData.value}"</div>
                  <h4 className="mb-1 mx-2 text-[0.7rem] font-semibold leading-none">font family</h4>
                  <ScrollArea className=' overflow-x-scroll'>
                    <div className="flex mb-1 w-max gap-2 ">
                      {fontFamilies.map((fam,index) =>(
                        <div key={index} className={`w-fit fam-${index}`} onClick={()=>setLocalData(prev=>({...prev,fontFamily:fontFamilies[index]}))}>
                          <Card  className={localData.fontFamily==fam?'mx-1 overflow-clip  w-fit rounded-sm h-fit border-2 border-violet-700':'mx-1 overflow-clip border-2 border-gray-200  w-fit rounded-sm h-fit'} >
                            <p style={{fontFamily:fam}} className={`font-semibold text-sm px-5 py-1`}>Aa</p>
                          </Card>
                          <p className="text-center text-xs mT-1">{fam}</p>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation='horizontal' className='hidden'/>
                  </ScrollArea>
                  <Separator/>
                  <div className="flex">
                    <Tabs className='grid-cols-2'>
                      <TabsList>

                      </TabsList>
                      <TabsContent>

                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                 : ""
            }
            
          </AlertDialogContent>
        {label && <><label htmlFor="" className='relative ml-[2px] p-1 items-center flex justify-between font-semibold text-xs mb-[0.13rem]' ><span>{label}</span> </label>
        <Separator/></> }
        
        <div className="flex justify-between px-2 py-1 items-center h-7">
          <input onChange={(e)=>{changeText(e),setLocalData(prev=>({...prev,value:`${e.target.value}`}))}} className='h-full rounded-none te border-none outline-none placeholder:italic' placeholder={placeholder} type='text' />
          {modify && <span className=' rounded-xl border border-alt bg-accent px-2 py-[1px] leading-loose italic text-[10px]'>ai modify</span>}
          {logo && <div className='flex justify-start items-center gap-2'>
          <Button size='sm' className='p-1 h-fit m-1 inline-flex rounded-sm items-center' onClick={logoImageTrigger} variant='secondary'><ImageIcon className='w-4 h-2 '/>image</Button>
        </div>}
          {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
        </div>
        <div className=" h-8 flex items-center gap-5 justify-center p-2 bg-gray-200">
          <AlertDialogTrigger asChild>
            <Brush onClick={()=>setActiveDialog('text-color')} className='w-5 rounded-lg bg-white h-5'/>
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

const ImageBox = () => {
  return (
    <div>
      hello world
    </div>
  )
}


const Coloring = ({h4}) => {

  const [gradient, setGradient] = useState(false)
  const [thirdGradient, setThirdGradient] = useState(false)
  const [accordion1, setAccordion1] = useState(false)
  const [color, setColor] = useColor("salmon");
  const [color2, setColor2] = useColor("slateblue");
  const [color3, setColor3] = useColor("orange");

  return (
      <div className="p-1">  
        <h4 className="mb-2 text-sm font-medium leading-none">{h4}</h4>
        <div className=' flex px-3 py-1 justify-between items-center' onClick={()=>{gradient && setGradient(false),setAccordion1(!accordion1) }}>
          <span className="text-sm font-medium mr-4">color</span>
          <button disabled={gradient==true} style={{backgroundColor:color.hex}} className={ `w-6 h-3 shadow-sm cursor-pointer disabled:opacity-45 inline-block rounded-sm]` } />
        </div>
        <div className={accordion1?"grid grid-rows-[1fr] px-3 transition-collapse":"grid grid-rows-[0fr] px-3 transition-collapse"}>
          <div className='overflow-hidden'>
          <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} />
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
              <div className="w-full flex gap-2">
                <TabsList className={`inline-grid w-fit gap-2 bg-gray-200 rounded-[3px]  p-[2px] h-fit ${thirdGradient?'grid-cols-3':'grid-cols-2'}`}>
                  <TabsTrigger className='p-1 rounded-sm' value="grad 1"><div style={{backgroundColor:color.hex}} className={ `color p-1 inline-block`} /></TabsTrigger>
                  <TabsTrigger className='p-1 rounded-sm' value="grad 2"><div style={{backgroundColor:color2.hex}} className={ `color p-1 inline-block`} /></TabsTrigger>
                  {thirdGradient?<TabsTrigger className='p-1 rounded-sm' value="grad 3"><div style={{backgroundColor:color3.hex}} className={ `color p-1 inline-block`} /></TabsTrigger>:''}
                </TabsList>
                <Button onClick={()=>setThirdGradient(!thirdGradient)} variant="outline" className='p-0 w-6 h-6' size="icon">{!thirdGradient?<Plus className='h-full w-full' />:<Minus className='h-full w-full'/>}</Button>
              </div> 
              <TabsContent value="grad 1" className='mt-1 p-1'>
                <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} />
              </TabsContent>
              <TabsContent value="grad 2" className='mt-1 p-1'>
                <ColorPicker color={color2} hideInput={["rgb", "hsv"]} height={100} onChange={setColor2} />
              </TabsContent>
              <TabsContent value="grad 3" className='mt-1 p-1'>
                <ColorPicker color={color3} hideInput={["rgb", "hsv"]} height={100} onChange={setColor3} />
              </TabsContent>
           </Tabs>
          </div>
        </div>
       </div>
    //  </ScrollArea> 
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


