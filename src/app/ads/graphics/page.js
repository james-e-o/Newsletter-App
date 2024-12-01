'use client'
import { Plus,Minus } from "lucide-react"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Graphics = () => {
  
  return (
    <div className="mt-1 font-Inter">
      <div className=" flex gap-1 items-center p-2">
        <p className="text-base inline-block font-bold">Graphics - </p>
        <p className="text-sm m1-5 inline-block font-normal"> customize poster designs</p>
      </div>
       <Tabs defaultValue="grad 1" className='w-full'>
              <div className="w-full flex gap-2">
                <TabsList className={`inline-grid w-fit overflow-x-hidden gap-3 bg-blue-400-200 rounded-[3px] border-black py-2 h-fit grid-cols-3`}>
                  <TabsTrigger className='py-1 px-2 relative border-transparent rounded-[4px] data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-slate-200 data-[state=active]:bg-slate-600' value="grad 1">Quick CSS</TabsTrigger>
                  <TabsTrigger className='py-1 px-2 relative border-transparent rounded-[4px] data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-slate-200 data-[state=active]:bg-slate-600' value="grad 2">Canva API</TabsTrigger>
                  <TabsTrigger className='py-1 px-2 relative border-transparent rounded-[4px] data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-slate-200 data-[state=active]:bg-slate-600' value="grad 3">Ai models</TabsTrigger>
                </TabsList>
                {/* <Button onClick={()=>setThirdGradient(!thirdGradient)} variant="outline" className='p-0 w-6 h-6' size="icon">{!thirdGradient?<Plus className='h-full w-full' />:<Minus className='h-full w-full'/>}</Button> */}
              </div> 
              <TabsContent value="grad 1" className='mt-1 p-1'>
                <div className="mx-auto h-5 w-5 my-2 bg-red-200"></div>
              </TabsContent>
              <TabsContent value="grad 2" className='mt-1 p-1'>
                <div className="mx-auto h-5 w-5 my-2 bg-red-500"></div>
              </TabsContent>
              <TabsContent value="grad 3" className='mt-1 p-1'>
                <div className="mx-auto h-5 w-5 my-2 bg-red-800"></div>
              </TabsContent>
           </Tabs>
    </div>
  )
}

export default Graphics