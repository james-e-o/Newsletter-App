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
import { ArrowLeft, PictureInPicture, XIcon, ChevronsUpDown, Plus, X, Search, Brush,Bold, Italic, Underline, ImageIcon, ArrowDown, ArrowUp, ArrowLeftIcon, ArrowRight, ArrowUpLeftIcon, ArrowDownLeft, ArrowUpRight, ArrowDownRightIcon, LetterTextIcon, Minus, Text } from 'lucide-react'
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
        
        // UI
        const [activeDialog, setActiveDialog]= useState('') // AlertDialog content
        const [custom, setCustom] = useState(false) // Quick poster design
        const [response, setResponse] = useState('') // AI modify response
            // TextBox component types
            const [imageCount, setImageCount] = useState([])
          
          
     

        // DATA
        const [heading, setHeading] = useState('')
        const [description, setDescription] = useState('')
        const [bgImage, setBgImage] = useState([])
        const [logoImage, setLogoImage] = useState()
        const [posterText, setPosterText] = useState([])
        const [image, setImage] = useState([])
        const [posterStyle, setPosterStyle] = useState(designs[0])
        

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

        function modifyDescription(e){
         
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
      
        function addImage({target}){
          const img = target.files[0]
          let reader = new FileReader()
          reader.onload=({target})=>{
            setImage([...image,`${target.result}`])
            setImageCount([...imageCount,`${image.length+1}`])
          }
          reader.readAsDataURL(img) 
        }
        function addLogoImage({target}){
          const img = target.files[0]
          let reader = new FileReader()
          reader.onload=({target})=>{
            setLogoImage(target.result)
            setImageCount([...imageCount,`${image.length+1}`])
          }
          reader.readAsDataURL(img) 
        }

        // useEffect(()=>{
        //   fetch('/api/get-designs')
        //   setPosterStyle(designs[0])
        // },[posterStyle])

return (
  <Tabs defaultValue="account" className="w-full h-full flex mt-[3px] flex-col overflow-y-clip">   
    <AlertDialog>          
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger className='font-Inter font-bold' value="account">New ad</TabsTrigger>
      <TabsTrigger className='font-Inter font-bold' value="password">AI generate</TabsTrigger>
    </TabsList>
    <div className="h-full flex flex-col overflow-y-scroll my-2">
      <TabsContent value="account" className='mt-0'>          
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
                      activeDialog === 'poster-text'?<InitializePosterText type={(valuetype,font,modify,logo)=>{posterText.length<=9?setPosterText(prev => [...prev,{index:prev.length, type:valuetype, modify,logo, value:'',bold:false,italics:false,underline:false,fontSize:font,fontFamily:'',gradient:false,color:['blue','green','yellow']}]):''}} /> : ""
                     
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
                                  
                                  {/* {color? <div className="flex mb-3 justify-between items-center"> 
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
                                  </div> :'' } */}
                              </div>
                          </div>
                        <div className=' mt-2 relative'>

                          <div className="mt-1">
                            {/* <div className="p-1 flex items-center mb-1 justify-between gap-3">
                              <p className="p-1 text-xs font-semibold">headline</p>
                              <div className='flex gap-2 items-center'>
                                {posterText.length<2?<Button onClick={()=>{posterText.length<2?setPosterText(prev => [...prev,{index:prev.length,value:'',bold:false,italics:false,underline:false,fontSize:[14],fontFamily:'',gradient:false,color:['blue','green','yellow']}]):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
                                {posterText.length>0?<Button onClick={()=>{posterText.length>0?setPosterText(posterText.filter(textProp=>textProp.index && textProp.index==posterText.length-1)):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
                              </div>
                            </div> */}
                              {posterText && posterText.map((headline,index)=>(
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
                                  modify={posterText[index].modify}/>  
                                    
                              ))}          
                          </div>
                    
                          <div className="mt-1">
                            {/* <div className="p-1 flex items-center mb-1 justify-between gap-3">
                              <p className="p-1 text-xs font-semibold">add image</p>
                              <div className='flex gap-2 items-center'>
                              {imageCount.length<2?<Button onClick={(e)=>{imageCount.length<2?openImageDialog(e):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
                              {imageCount.length>=1?<Button onClick={()=>{imageCount.length>=1?(setImageCount(imageCount.filter(image=>image==`image${imageCount.length-1}`)),setImage(image.filter((img,i)=>i==image.length-1))):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}
                              </div>
                                
                            </div> */}
                            <div>
                              {image && image.map((image,index)=>(  
                                <Image key={index} height={50} width={100} alt={`image${index}`} src={image} className='relative inline-block h-[100px] border rounded-sm mr-1'/>
                              ))} 
                            </div>        
                          </div> 
                          <p className="mt-2 px-1 font-Inter flex gap-2">
                            <AlertDialogTrigger asChild><Button size='sm' disabled={posterText>=9} onClick={(e)=>{setActiveDialog('poster-text')}} className='flex-grow px-1'><Text /> add text</Button></AlertDialogTrigger>
                            <AlertDialogTrigger asChild><Button size='sm' onClick={(e)=>{image.length<3?openImageDialog(e):''}} className='flex-grow px-1'><ImageIcon/> add image</Button></AlertDialogTrigger>
                            <input type="file" name="next-image" onChange={addImage} hidden id="next-image" />
                            <input type="file" name="next-image" onChange={addLogoImage} hidden id="logo-image" />
                          </p>

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
    </div>
  </AlertDialog>
</Tabs>
  )
}

export default NewAd










const TextBox = ({changeText,font_Size,text_Bold,text_Italics,text_Underline, changeColor,changeColor2, changeColor3,setFamily,gradValue,type, logo, modify, label, placeholder,logoImageTrigger}) => {

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
          <XIcon className='w-4 h-4 mr-r' />
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

const InitializePosterText = ({type,i}) => {
  return (
    <div>
      <p className="mb-1 mr-1 font-bold text-xs">select text type</p>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[22],true,false)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>headline</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[14],false,true)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>logo</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[14],false,false)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>banner</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[14],false,false)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>button</button></AlertDialogCancel>
      <AlertDialogCancel asChild><button onClick={({target})=>{type(target.textContent,[14],true,false)}} className='rounded-2xl text-gray-800 text-xs border border-gray-500 bg-transparent px-3 mr-2 mb-2 py-0'>subtext</button></AlertDialogCancel>
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


