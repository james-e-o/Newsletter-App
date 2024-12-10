'use client'
import { useState,useEffect,useReducer,useContext } from 'react'
import { ColorPicker, useColor,Saturation,IColor, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link"
import Image from 'next/image'
import customImgWhite from '../../../public/custom96w.png'
import { Input } from "@/components/ui/input"
import {Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge, badgeVariant } from '@/components/ui/badge'
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X, Search, Brush,Bold, Italic, Underline, ImageIcon, ArrowDown, ArrowUp, ArrowLeftIcon, ArrowRight, ArrowUpLeftIcon, ArrowDownLeft, ArrowUpRight, ArrowDownRightIcon, LetterTextIcon, Minus, Text, Radio, Target, Cone } from 'lucide-react'
import { GearIcon } from '@radix-ui/react-icons'
import { designData } from './layout'

import customImg from '../../../public/custom96.png'
import format1 from '../../../public/format 1.png'
import format2 from '../../../public/format 2.png'
import format3 from '../../../public/format 3.png'
import format4 from '../../../public/format 4.png'
import format5 from '../../../public/format 5.png'
import format6 from '../../../public/format 6.png'



const designs =[
  {src:format1,type:'hello world'}, {src:format2,type:'hello world'}, {src:format3,type:'hello world'}, {src:format4,type:'hello world'}, {src:format5,type:'hello world'}, {src:format6,type:'hello world'},]
  const arrows = [{type:ArrowLeft,css:`to left,`},{type:ArrowUp,css:`to top,`},{type:ArrowDown,css:`to bottom,`},{type:ArrowRight,css:`to right,`},{type:ArrowUpLeftIcon,css:`to top left,`},{type:ArrowDownLeft,css:`to bottom left,`},       {type:ArrowDownRightIcon,css:`to bottom right,`},{type:ArrowUpRight,css:`to top right,`}]
  const fontFamilies = [
    'Inter', 'Madetommy','Voces', 'Clash'
  ]
  const gradientTypes = [
    `linear-gradient`, `conic-gradient`,`radial-gradient`
  ]
  const bgFormat = {
    gradientType:``,
    gradient:'',
    image:'',
    imageProp:'',
    color:'black',
    grad1:'black',
    grad2:'black',
    grad3:'black',
    gradDirection:`${gradientTypes[0]}(${arrows[3].css} black,black)`
  }

// function FormData(value,{color,fontSize,fontFamily,fontStyle}){
//   this.value = value
//   this.color = color
//   this.fontSize = fontSize
//   this.fontFamily = fontFamily
//   this.fontStyle = fontStyle
// }

const NewAd = ({designTrigger, categoryTrigger}) => {
        
        // UI
        const [activeDialog, setActiveDialog]= useState('') // AlertDialog content
        const [custom, setCustom] = useState(false) // Quick poster design
        const [isClient, setIsClient] = useState(false) // Ensure client side rendering    
        const [sliderState, setSliderState] = useState(false) // Sliding UI    
        
        // DATA
        const [response, setResponse] = useState('') // AI modify response    
        const [heading, setHeading] = useState('')
        const [description, setDescription] = useState('')
        const [bgData, setBgData] = useState(bgFormat)
        const [logoImage, setLogoImage] = useState()
        const [posterText, setPosterText] = useState([])
        const [posterCount, setPosterCount] = useState({logo:0,headline:0,banner:0,button:0,subtext:0})
        const [image, setImage] = useState([])
        const [posterStyle, setPosterStyle] = useState(designs[0])
        const [categories, setCategories] = useState(['cooking', 'reading'])
      
        function bgImageTrigger(e){
          e.preventDefault()
          const input = document.getElementById('bg-image')
          input.click()
        }

        async function AiModifyItem(prompt){
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

        const tags = Array.from({ length: 10 }).map(
          (_, i, a) => `v1.2.0-beta.${a.length - i}`
        )
        
        const formdata = new FormData()

        function Submit(){
          formdata.append('headline',posterText)
          console.log(formdata,posterText)
        }

        function openImageDialog(e){
          e.preventDefault()
          const nextInput = document.getElementById('next-image')
          nextInput.click()
        }
        function logoImageTrigger(e){
          e.preventDefault()
          const logoInput = document.getElementById('logo-image')
          logoInput.click()
        }
        function bgImageTrigger(e){
          e.preventDefault()
          const logoInput = document.getElementById('bg-image')
          logoInput.click()
        }
      
        function addImage({target}){
          const img = target.files[0]
          let reader = new FileReader()
          reader.onload=({target})=>{
            setImage([...image,`${target.result}`])
          }
          reader.readAsDataURL(img) 
        }
        function addLogoImage({target}){
          const img = target.files[0]
          let reader = new FileReader()
          reader.onload=({target})=>{
            setLogoImage(target.result)
          }
          reader.readAsDataURL(img) 
        }
        function addBgImage({target}){
          const img = target.files[0]
          let reader = new FileReader()
          reader.onload=({target})=>{
            setBgData(prev=> ({...prev,image:target.result}))
          }
          reader.readAsDataURL(img) 
        }

        useEffect(()=>{
          setIsClient(true)
          setPosterStyle(designs[0])
          setBgData(prev => ({...prev,gradientType:gradientTypes[0]}))
        },[])
        useEffect(()=>{
         console.log(bgData)
        },[bgData])
        useEffect(()=>{
         if (posterStyle==designs[4]){
          setBgData(prev => ({...prev,gradientType:gradientTypes[1]}))
          setBgData(prev => ({...prev,gradDirection:`${gradientTypes[1]}(at 50% 50%, black,black)`}))
         }
        },[posterStyle])

return (
      <Tabs defaultValue="account" className="w-full relative h-full font-Inter flex flex-col ">
        <header className="px-2 pt-3 pb-1 justify-start flex">
            <Link href={'/'} className="decoration-none text-primary"><h1 className="font-Madetommy decoration-none text-primary text-xl">adFeed</h1></Link>    
        </header>
        <Separator />
        <AlertDialog>          
        <TabsList className="grid mt-1 w-full grid-cols-2">
          <TabsTrigger className='font-Inter font-bold' value="account">New ad</TabsTrigger>
          <TabsTrigger className='font-Inter font-bold' value="password">AI generate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className='overflow-y-scroll flex-col font-Inter flex h-full my-2'>          
          <form action="" onSubmit={(e)=>e.preventDefault()} name='new-pub' className=''>             
            
              <Card className='mb-3 rounded-sm'>                  
                  <AlertDialogContent className='rounded-md gap-0 max-w-[80vw] p-2'>
                    <AlertDialogTitle className='h-0 hidden'><AlertDialogDescription></AlertDialogDescription></AlertDialogTitle>
                    <p className="p-1 h-fit flex justify-between items-center">
                      <span className='text-xs'>{activeDialog}</span>
                      <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
                    </p>
                    {
                        activeDialog === 'headline'? <AiBox result={response} reModify={()=>AiModifyItem(response)} useModification={()=>setHeading(response)} content={heading}/>: 
                        activeDialog === 'description'?<AiBox result={response} reModify={()=>AiModifyItem(response)} useModification={()=>setDescription(response)} content={description}/> :
                        activeDialog === 'poster-text'?<InitializePosterText  count={(val)=>{setPosterCount(prev =>({...prev,[val]:posterCount[val]++}))}} type={(valuetype,font,modify,logo)=>{posterText.length<=9?setPosterText(prev => [...prev,{index:prev.length, type:valuetype, modify,logo, value:'',bold:false,italics:false,underline:false,fontSize:font,fontFamily:'',gradient:false,color:['blue','green','yellow']}]):''}} countData={posterCount}/> :
                        activeDialog === 'choose category'?<Drafts /> : ""
                      
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
                          <AlertDialogTrigger disabled={heading===""} onClick={(e)=>{setActiveDialog('headline'),AiModifyItem(heading)}}>
                            <span  style={heading===""?{opacity:'0.4'}:{opacity:'1'}} className=' rounded-xl border border-alt bg-accent px-2 py-[2px] leading-loose italic text-[10px]'>ai modify</span>
                          </AlertDialogTrigger>
                        </label>
                        <Input id='heading-text' className='' onChange={({target})=>setHeading(target.value)} value={heading} type='text' />
                            {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
                  </div>
                        <div className="mt-2 ml-1">
                          <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs' >
                            <span>Description</span> 
                            <AlertDialogTrigger disabled={description===""} onClick={(e)=>{setActiveDialog('description'),AiModifyItem(description)}}>
                              <span  style={description===""?{opacity:'0.4'}:{opacity:'1'}} className=' rounded-xl border border-alt bg-accent px-2 py-[2px] leading-loose italic text-[10px]'>ai modify</span>
                            </AlertDialogTrigger>
                          </label>
                          <textarea name="" id="body-text" placeholder='type here...' className=' "flex rounded-md border border-slate-200 w-full bg-transparent p-3 mt-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"' rows="3" onChange={({target})=>setDescription(target.value)} value={description}></textarea>

                        </div>
                </CardContent>
                
              </Card>

              <Card className='mb-3 rounded-sm'>
                <CardContent className='p-2'>
                <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-sm mb-[0.13rem]' ><span>Ad optimization</span></label>
                  <CardDescription className='text-xs py-1'>
                    Set up your ad for better search filtering.
                  </CardDescription>
                  
                  <div className="rounded-sm min-h-16 mt-2 p-2 border">
                    <label htmlFor="" className='relative ml-[2px] items-center flex justify-between font-semibold text-xs mb-[0.13rem]' ><span>...</span></label>    
                    <div className="relative">
                    </div>
                  </div>
                  <AlertDialogTrigger asChild >
                    <Button variant='outline' className='mt-2 border-gray-300 p-3' size='sm' onClick={(e)=>{setActiveDialog('choose category')}} >
                      <Plus className='ml-1 w-4 h-4' />
                      <span>select categories</span>
                    </Button>
                  </AlertDialogTrigger>
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
                          <div className="mt-2">
                              <label htmlFor="" className=' ml-[2px] items-center flex justify-between font-semibold text-xs' ><span>background</span></label>
                              <div className="border px-2 mt-1 py-1 rounded">
                                  
                                {
                                  isClient&&(
                                    posterStyle == designs[5] ?
                                    <Drafts /> :

                                    posterStyle == designs[4] ?
                                    <BackgroundBox 
                                    //UI
                                    gradient 
                                    thirdgrad
                                    style={posterStyle}
                                    //DATA
                                    type={(val)=>{setBgData(prev=>({...prev, gradientType:val}))}}
                                    bgImageTrigger={(e)=>{bgImageTrigger(e)}}
                                    colorgradient={(bool)=>{setBgData(prev=> ({...prev,gradient:bool})),console.log(bgData.gradient)}}
                                    changeGrad1={(col,dir)=>{setBgData(prev=> ({...prev,grad1:col.hex})),setBgData(prev => ({...prev,gradDirection:`${bgData.gradientType}(${dir} ${bgData.grad1},${bgData.grad2},${bgData.grad3})`}))}}
                                    changeGrad2={(col,dir)=>{setBgData(prev=> ({...prev,grad2:col.hex})),setBgData(prev => ({...prev,gradDirection:`${bgData.gradientType}(${dir} ${bgData.grad1},${bgData.grad2},${bgData.grad3})`}))}}
                                    changeGrad3={(col,dir)=>{setBgData(prev=> ({...prev,grad3:col.hex})),setBgData(prev => ({...prev,gradDirection:`${bgData.gradientType}(${dir} ${bgData.grad1},${bgData.grad2},${bgData.grad3})`}))}}
                                    gradientDir={({dir})=>{setBgData(prev => ({...prev,gradDirection:`${bgData.gradientType}(${dir} ${bgData.grad1},${bgData.grad2},${bgData.grad3})`}))}}
                                    data={bgData}
                                    />  :

                                    posterStyle == designs[1] || posterStyle == designs[2]?
                                    <BackgroundBox 
                                    //UI
                                    colorDiv 
                                    bgImg
                                    style={posterStyle}
                                    //DATA
                                    bgImageTrigger={(e)=>{bgImageTrigger(e)}}
                                    changeBg={(col)=>{setBgData(prev=> ({...prev,color:col.hex}))}}
                                    data={bgData}
                                    />  :

                                    <BackgroundBox 
                                    //UI
                                    colorDiv 
                                    gradient 
                                    bgImg
                                    style={posterStyle}
                                    //DATA
                                    bgImageTrigger={(e)=>{bgImageTrigger(e)}}
                                    colorgradient={(bool)=>{setBgData(prev=> ({...prev,gradient:bool})),console.log(bgData.gradient)}}
                                    changeBg={(col)=>{setBgData(prev=> ({...prev,color:col.hex}))}}
                                    changeGrad1={(col,dir)=>{setBgData(prev=> ({...prev,grad1:col.hex})),setBgData(prev => ({...prev,gradDirection:`${gradientTypes[0]}(${dir} ${bgData.grad1},${bgData.grad2})`}))}}
                                    changeGrad2={(col,dir)=>{setBgData(prev=> ({...prev,grad2:col.hex})),setBgData(prev => ({...prev,gradDirection:`${gradientTypes[0]}(${dir} ${bgData.grad1},${bgData.grad2})`}))}}
                                    changeGrad3={(col,dir)=>{setBgData(prev=> ({...prev,grad3:col.hex})),setBgData(prev => ({...prev,gradDirection:`${gradientTypes[0]}(${dir} ${bgData.grad1},${bgData.grad2})`}))}}
                                    gradientDir={(dir)=>{setBgData(prev => ({...prev,gradDirection:`${gradientTypes[0]}(${dir} ${bgData.grad1},${bgData.grad2})`}))}}
                                    data={bgData}
                                    /> 
                                  )
                                }  
                                  
                              </div>
                          </div>
                          <div className=' mt-2 relative'>
                            <div className="mt-1">
                                {posterText && posterText.map((poster_text,index)=>(
                                  <TextBox 
                                    key={index} 
                                    changeText={(e)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].value = e.target.    value ;return newArray}),console.log(posterText)}} 
                                    font_Size={(e)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].fontSize = e ;return newArray}),console.log(posterText)}} 
                                    text_Bold={(bool)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].bold = !bool  ;return newArray}),console.log(posterText[index].bold,posterText[index])}}
                                    text_Italics={(bool)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].italics = !bool  ;return newArray}),console.log(posterText[index].italics)}}
                                    text_Underline={(bool)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].underline = !bool  ;return newArray}),console.log(posterText[index].underline)}}
                                    label={posterText[index].type}
                                    changeColor={(col)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].color[0] = col.hex  ;return newArray}),console.log(posterText[index].color,posterText[index])}}
                                    changeColor2={(col)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].color[1] = col.hex  ;return newArray}),console.log(posterText[index].color,posterText[index])}}
                                    changeColor3={(col)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].color[2] = col.hex  ;return newArray}),console.log(posterText[index].color,posterText[index])}}
                                    setFamily={(fam)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].fontFamily = `font-[${fam}}]`  ;return newArray}),console.log(posterText[index].fontFamily,posterText[index])}}
                                    gradValue={(grad)=>{setPosterText( prev => { let newArray = [...prev]; newArray[index].underline = !grad ;return newArray}),console.log(posterText[index].gradient,posterText[index])}}
                                    placeholder={`...${posterText[index].type} text`}
                                    value={posterText[index] && posterText[index].value}
                                    logo={posterText[index].logo}
                                    logoImageTrigger={(e)=>{posterText[index].logo?logoImageTrigger(e):''}}
                                    modify={posterText[index].modify}
                                    text_terminator={(e)=>{setPosterText(posterText.filter(textObject=>posterText[index].index!==textObject.index)),setPosterCount(prev=>({...prev,[posterText[index].type]:posterCount[posterText[index].type]--}))}}
                                  />                                      
                                ))}          
                            </div>
                      
                            <div className="mt-1">
                              <div className='grid-cols-3 grid gap-1'>
                                {image && image.map((image_,index)=>( 
                                  <div key={index} className='border inline-flex rounded w-fit h-fit flex-col'>
                                    <p className="py-1 w-full flex justify-end"><XIcon className='w-4 scale-110 h-4 mr-3' onClick={(e)=>{setImage(image.filter((img)=>image[index]!==img))}}/>
                                    </p>
                                    <Image 
                                      height={50} 
                                      width={88} 
                                      alt={`image${index}`} 
                                      src={image_} 
                                      className='relative inline-block h-[100px] border rounded'
                                    />
                                  </div> 
                                ))} 
                              </div>        
                            </div> 
                            <div className="mt-4 font-Inter flex gap-2">
                              <AlertDialogTrigger asChild><Button size='sm' disabled={posterText.length>=9} onClick={(e)=>{setActiveDialog('poster-text')}} className='flex-grow px-1'><Text /> add text</Button></AlertDialogTrigger>
                              <AlertDialogTrigger asChild><p disabled={image.length>=3} size='sm' onClick={(e)=>{image.length<3?openImageDialog(e):''}} className='flex-grow items-center text-white bg-primary rounded-md text-xs flex justify-center gap-2 px-2'><ImageIcon className='h-4 w-4'/> add image</p></AlertDialogTrigger>
                              <input type="file" name="next-image" onChange={addImage} hidden id="next-image" />
                              <input type="file" name="logo-image" onChange={addLogoImage} hidden id="logo-image" />
                              <input type="file" name="bg-image" onChange={addBgImage} hidden id="bg-image" />
                            </div>
                          </div>
                        </div>  

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
                    <Button disabled={custom==true} size='sm' onClick={designTrigger} className=' mt-2 disabled:opacity-40 py-1 px-2 font-semibold text-xs border-gray-400' variant={!custom?'':'outline'}><Image  src={!custom?customImgWhite:customImg} alt="An example image" width={20} height={20} className='mr-1'/> Customize graphics</Button>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={Submit} className='w-full mx-auto mb-2'>Save to draft</Button>
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
      </AlertDialog>
    </Tabs>
  )
}

export default NewAd










const TextBox = ({changeText,font_Size,text_Bold,text_Italics,text_Underline, text_terminator,changeColor,changeColor2, changeColor3,setFamily,gradValue,type, logo, modify, label, placeholder,logoImageTrigger}) => {

  //UI
  const [activeDialog, setActiveDialog]= useState('')

  //FONT
  const [bold, setBold] = useState(false)
  const [italics, setItalics] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [fontSize, setFontSize] = useState([14])
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
  })  
  
  return (
      <div className="rounded-md text-sm border mb-3 border-gray-200 overflow-clip">
        <AlertDialog>
          <AlertDialogContent className='rounded-md max-w-[80vw] gap-0 p-2'>
          <AlertDialogTitle className='h-0 '><AlertDialogDescription></AlertDialogDescription></AlertDialogTitle>
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
                    <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} onChangeComplete={(col)=>changeColor(col)}/>
                    </div>
                  </div>
                  <div className=' flex px-3 justify-between items-center'>
                    <span className="text-sm font-medium pb-1 mr-4">gradient color</span>
                      <div className='py-1' >
                          <Switch checked={gradient} onCheckedChange={()=>{setAccordion1(false), setGradient(!gradient), gradValue(gradient)}} />
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
                          <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} onChangeComplete={(col)=>changeColor(col)} />
                        </TabsContent>
                        <TabsContent value="grad 2" className='mt-1 p-1'>
                          <ColorPicker color={color2} hideInput={["rgb", "hsv"]} height={100} onChange={setColor2} onChangeComplete={(col)=>changeColor2(col)} />
                        </TabsContent>
                        <TabsContent value="grad 3" className='mt-1 p-1'>
                          <ColorPicker color={color3} hideInput={["rgb", "hsv"]} height={100} onChange={setColor3}  onChangeComplete={(col)=>changeColor3(col)} />
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
                  <div style={{fontFamily:localData.fontFamily}} className={`p-1 text-center border mb-1 text-sm`}>"{localData.value}"</div>
                  <h4 className="mb-1 mx-2 text-[0.7rem] font-semibold leading-none">font family</h4>
                  <ScrollArea className=' overflow-x-scroll'>
                    <div className="flex mb-1 w-max gap-2 ">
                      {fontFamilies.map((fam,index) =>(
                        <div key={index} className={`w-fit fam-${index}`} onClick={()=>{setLocalData(prev=>({...prev,fontFamily:fontFamilies[index]})),setFamily(index)}}>
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
                  <div className="mt-1">
                    <h4 className="mb-1 mx-2 text-[0.7rem] font-semibold leading-none">text size</h4>
                    <div className="flex px-2 justify-between items-center">
                       <Slider onValueChange={(e)=>{setFontSize(e),font_Size(e)}} defaultValue={[14]} min={6} max={24} step={2} className={'w-40'} />
                      <p className="text-sm border py-[3px] px-2">{fontSize[0]}</p>
                    </div>
                  </div>
                  <div className="mt-[5px]">
                    <ToggleGroup className='flex gap-2 justify-start' size='sm' variant="outline" type="multiple">
                        <ToggleGroupItem onClick={()=>{setBold(!bold),text_Bold(bold)}} value="bold" aria-label="Toggle bold">
                          <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={()=>{setItalics(!italics),text_Italics(italics)}} value="italic" aria-label="Toggle italic">
                          <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={()=>{setUnderline(!underline),text_Underline(underline)}} value="underline" aria-label="Toggle underline">
                          <Underline className="h-4 w-4" />
                        </ToggleGroupItem>
                      </ToggleGroup>
                  </div>
                </div>

                 : ""
            }
            <AlertDialogDescription/>
          </AlertDialogContent>
        <div className="flex justify-between ml-1 items-center mb-[0.13rem] p-1">
          {label && <><label htmlFor="" className='relative items-center inline-flex justify-between font-semibold text-xs' ><span>{label}</span></label></> }
          <XIcon className='w-4 scale-150 h-4 mr-3' onClick={text_terminator}/>
        </div>
        <Separator/>
        <div className="flex justify-between px-2 py-1 items-center h-7">
          <input onChange={(e)=>{changeText(e),setLocalData(prev=>({...prev,value:`${e.target.value}`}))}} className='h-full rounded-none flex-grow border-none outline-none placeholder:italic' placeholder={placeholder} type='text' />
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
        
        </div>
        </AlertDialog>
      </div>
  )
}

const BackgroundBox = ({colorDiv, gradient, colorgradient, bgImg,style,type, bgImageTrigger, gradientDir,thirdgrad, changeBg,changeGrad1,changeGrad2,changeGrad3,data}) => {

  //UI
  const [activeDialog, setActiveDialog]= useState('')
  const [colorGradient, setColorGradient] = useState(false)
  const [addImage, setAddImage] = useState(false)

  //DATA
  const [color, setColor] = useColor("black")
  const [grad1, setGrad1] = useColor("black")
  const [grad2, setGrad2] = useColor("black")
  const [grad3, setGrad3] = useColor("black")
  const [activedir, setActivedir] = useState(arrows[3].css)

  return (
    <div className='mt-1'>
      <AlertDialog>
          <AlertDialogContent className='rounded-md max-w-[80vw] gap-0 p-2'>
          <AlertDialogTitle className='h-0 '><AlertDialogDescription></AlertDialogDescription></AlertDialogTitle>
            <p className="p-1 h-fit flex justify-between items-center">
              <span className='font-bold text-xs'>{activeDialog}</span>
              <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
            </p>
            {
              activeDialog === 'background-color'? <div className="p-1"><ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} onChangeComplete={(col)=>{changeBg(col)}}/></div> :             
              activeDialog === 'background gradient 1'? <div className="p-1"><ColorPicker color={grad1} hideInput={["rgb", "hsv"]} height={100} onChange={setGrad1} onChangeComplete={(col)=>{changeGrad1(col,activedir)}}/></div> :             
              activeDialog === 'background gradient 2'? <div className="p-1"><ColorPicker color={grad2} hideInput={["rgb", "hsv"]} height={100} onChange={setGrad2} onChangeComplete={(col)=>{changeGrad2(col,activedir)}}/></div> :             
              activeDialog === 'background gradient 3'? <div className="p-1"><ColorPicker color={grad3} hideInput={["rgb", "hsv"]} height={100} onChange={setGrad3} onChangeComplete={(col)=>{changeGrad3(col,activedir)}}/></div> :  
              activeDialog === 'gradient settings'? <GradientSettings type={type} style={style} dir={(value)=>{gradientDir(value),setActivedir(value)}} data={data}/> :  ""   
            }
            <AlertDialogDescription/>
          </AlertDialogContent>


     {colorDiv? <div className="flex mb-4 justify-between items-center"> 
            <span className='text-xs pl-[2px]'>color</span>                                           
            <AlertDialogTrigger asChild><Button style={{backgroundColor:color.hex}} disabled={colorGradient==true} onClick={()=>{setActiveDialog('background-color'), setColorGradient(false),colorgradient&&colorgradient(colorGradient)}}  className={`w-6 h-3 shadow-sm cursor-pointer disabled:opacity-45 inline-block rounded-sm]`} /></AlertDialogTrigger>       
      </div>:''}                                                                                
      
        {gradient?<div >
          <div className='flex mb-4 justify-between max-h-min items-center'>
            <p className="inline-block pl-[2px] text-xs">color gradient</p>
            <div>
                <Switch checked={colorGradient==true} onCheckedChange={()=>{addImage && setAddImage(false),setColorGradient(!colorGradient),colorgradient(colorGradient)}} />
            </div>
          </div>                
          <div className={colorGradient?"grid mt-2 grid-rows-[1fr] transition-collapse":"grid mt-2 grid-rows-[0fr] transition-collapse"}>
            <div className="overflow-hidden">
              
              <div className="flex mb-3 justify-between items-center">
                <div className='flex items-center gap-2'>
                  <AlertDialogTrigger asChild><Button style={{backgroundColor:grad1.hex}} disabled={colorGradient==false} onClick={()=>{setActiveDialog('background gradient 1')}}  className={`w-6 h-3 shadow-sm cursor-pointer disabled:opacity-45 inline-block rounded-sm]`} /></AlertDialogTrigger>
                  <AlertDialogTrigger asChild><Button style={{backgroundColor:grad2.hex}} disabled={colorGradient==false} onClick={()=>{setActiveDialog('background gradient 2')}}  className={`w-6 h-3 shadow-sm cursor-pointer disabled:opacity-45 inline-block rounded-sm]`} /></AlertDialogTrigger>
                  {thirdgrad?<AlertDialogTrigger asChild><Button style={{backgroundColor:grad3.hex}} disabled={colorGradient==false} onClick={()=>{setActiveDialog('background gradient 3')}} className={`w-6 h-3 shadow-sm cursor-pointer disabled:opacity-45 inline-block rounded-sm]`} /></AlertDialogTrigger>:""}
                </div>
                <AlertDialogTrigger asChild>
                  <Button size='sm' variant='ghost' onClick={()=>{setActiveDialog('gradient settings')}} className='px-1 py-[2px] mr-2 h-fit inline-flex rounded-sm items-center' ><GearIcon className='w-6 h-6 scale-110 text-black'/></Button>
                </AlertDialogTrigger>    
              </div>
            </div>                                            
          </div>                                        
        </div>:''}

        {bgImg? <div>
          <div className="mb-2 mt-1 flex justify-between items-center">
            <p className="inline-block pl-[2px] text-xs">use image</p>        
            <div>
                <Switch checked={addImage==true} onCheckedChange={()=>{colorGradient && setColorGradient(false),setAddImage(!addImage),colorgradient&&colorgradient(colorGradient)}} />
            </div>
          </div>
          <div className={addImage?"grid mt-2 grid-rows-[1fr] transition-collapse":"grid mt-2 grid-rows-[0fr] transition-collapse"}>
            <div className="overflow-hidden">
              
              <div className="flex mb-3 justify-between items-center">
                <div className='flex items-center gap-2'>
                  <input type="file" name="image" onChange={(e)=>setBgImage(e.target.files[0])} hidden id="bg-image" />  
                  <Button size='sm' onClick={bgImageTrigger} className='py-1 px-3 pr-1 h-fit text-gray-400 border-gray-400 inline-flex rounded-[3px] items-center' variant='outline'><span className='-top-[2px] relative'>add image</span><ImageIcon className='w-4 h-2 '/></Button>
                </div>
                <AlertDialogTrigger asChild>
                  <Button size='sm' variant='ghost' className='px-1 py-[2px] mr-2 h-fit inline-flex rounded-sm items-center' ><GearIcon className='w-6 h-6 scale-110 text-black'/></Button>
                </AlertDialogTrigger>    
              </div>
            </div>                                            
          </div>
        </div> :'' }
      </AlertDialog>
    </div>
  )
}


const AiBox = ({result,content,useModification,reModify}) => {
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
        <button size='sm' disabled={!result} className='rounded-2xl text-white text-xs bg-black px-3 disabled:opacity-50 py-1' onClick={reModify}>Improve</button>
        <AlertDialogCancel asChild>
          <button size='sm' disabled={!result} className='rounded-3xl text-xs text-white bg-black px-3 disabled:opacity-50 py-1' onClick={useModification}>Use</button>
        </AlertDialogCancel>
      </div>
    </div>
  )
}

const InitializePosterText = ({count,countData,type}) => {

  const [stateCount,setStateCount]=useState(countData)

  return (
    <div>
      <p className="mb-1 mr-1 font-bold text-xs">select text type</p>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[22],true,false),count(target.textContent)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>headline</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button disabled={countData.logo>=1} onClick={({target})=>{if(countData.logo<1){type(target.textContent,[14],false,true),count(target.textContent)}else console.log(countData)}} className='rounded-2xl disabled:opacity-40 text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>logo</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[14],false,false),count(target.textContent)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>banner</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[14],false,false),count(target.textContent)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>button</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[14],true,false),count(target.textContent)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>subtext</button></AlertDialogCancel>
    </div>
  )
}


const Category = () => {
  return (
    <div>
      hello world
    </div>
  )
}
const GradientSettings = ({dir,data,style,type}) => {
  
  const [activeArrow, setActiveArrow]=useState(arrows[3])
  const [y, setY]=useState('50%')
  const [x, setX]=useState('50%')
  const [position, setPosition]=useState(`at ${x} ${y}`)
  let styleCLassName = "px-3 flex gap-2 py-2 justify-center items-center border rounded-sm mt-3 text-sm font-semibold"

  useEffect(()=>{
    setActiveArrow(arrows[3])
  },[])
  return (
    <div className='flex justify-start font-Inter items-center flex-col'>
      <div style={{background:`${data.gradDirection}`}} className="border-2 rounded-md aspect-video bg-gradient-to-r from-gradient1 to-gradient2 w-5/6"></div>
      <h4 className="mb-1 mt-3 mx-2 text-[0.7rem] font-Inter font-semibold leading-none">gradient styling</h4>
     {style==designs[4] ? <div className=" w-full mt-1 pb-1 flex gap-3 justify-between items-start">
        <div className="p-1 ">
          <p className="text-[0.7rem] text-center font-semibold">type</p>
          <p className={data.gradientType==gradientTypes[2]?`${styleCLassName} border-[slateblue]`:`${styleCLassName} border-gray-400`} onClick={(e)=>{type(gradientTypes[2]),dir(`at ${x} ${y},`)}}><Target className=' p-1'/> Radial</p>
          <p className={data.gradientType==gradientTypes[1]?`${styleCLassName} border-[slateblue]`:`${styleCLassName} border-gray-400`} onClick={(e)=>{type(gradientTypes[1]),dir(`at ${x} ${y},`)}}><Cone className=' p-1'/> Conic</p>
        </div>
        <div className="p-1">
        <p className="text-[0.7rem] text-center  font-semibold pb-1">position</p>
        <div className="grid grid-cols-2 gap-1 pb-2 mt-3 rotate-45 mr-5 grid-rows-2">
          <ArrowUpLeftIcon className={'overflow-clip p-[2px] border-2 rounded-sm border-gray-300  w-10 h-10'} onClick={(e)=>{}}/>
          <ArrowUpRight className={'overflow-clip p-[2px] border-2 rounded-sm border-gray-300  w-10 h-10'} onClick={(e)=>{}}/>
          <ArrowDownLeft className={'overflow-clip p-[2px] border-2 rounded-sm border-gray-300  w-10 h-10'} onClick={(e)=>{}}/>
          <ArrowDownRightIcon className={'overflow-clip p-[2px] border-2 rounded-sm border-gray-300  w-10 h-10'} onClick={(e)=>{}}/>
        </div>
        </div>
      </div> : 
      
      <div className=" w-[75%] mt-1 grid gap-3 justify-items-center grid-cols-4">
        {arrows&&arrows.map((arrow,index)=>(
          <arrow.type key={index} className={activeArrow.type==arrow.type?'mx-1 overflow-clip p-[2px] w-6 h-6 border-2 rounded-sm border-violet-700':'mx-1 overflow-clip p-[2px] border-2 rounded-sm border-gray-200  w-6 h-6'} onClick={(e)=>{setActiveArrow(arrows[index]),dir(arrows[index].css)}}/>
        ))}
      </div>
      }
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


