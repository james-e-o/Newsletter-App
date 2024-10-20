'use client'
import { useState, useEffect } from "react"
import { CardContent, Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { XIcon } from 'lucide-react'
import Link from "next/link"

const Content = () => {
    const [fillContent, setFillContent]= useState('')
    const [fillState, setFillState] = useState(false)

    useEffect(()=>{
        const pop =document.getElementById('pop')
        fillState? pop.classList.add('transit'):
        pop.classList.remove('transit')
    })

  return (
        <div className="overflow-x-clip mb-1 flex-grow w-full h-full overflow-y-scroll relative flex flex-col gap-4 px-2 pb-5">
            
            <div className={fillState?"absolute transition-[_z-index_160ms_ease-in-out_] z-10 bg-transparent opacity-100 inset-0 flex justify-center items-center rounded-md":"absolute inset-0 flex justify-center items-center transition-[_z-index_150ms_ease-in-out_] opacity-0 -z-10"}>
                <div id='pop' className="relative scale-95 h-full w-full p-4  bg-white opacity-0 transition-[_transform_160ms_ease-in-out_] border-border border rounded-lg shadow-lg">
                    <div className='flex justify-end'>
                        <Button onClick={()=>{setFillContent(''), setFillState(false)}} variant='icon' >
                            <XIcon/>
                        </Button>
                    </div>
                    <div className="relative">
                        {
                            fillContent === 'publication'?
                            <NewPublication/>
                            :
                            ""
                        }
                    </div>
                   
                </div>
            </div>
            <div className={fillState?"relative flex w-full flex-col font-Inter gap-4 scale-95":"font-Inter relative flex w-full flex-col gap-4 transition-[_transform_160ms_ease-in-out_] scale-100"}>
                <Card className=''>
                    <CardHeader className='px-[1.125rem] pt-5 pb-3'>
                        <CardTitle className='text-base' >Write Articles</CardTitle>
                    </CardHeader>
                    <CardContent className='px-[1.125rem] pb-3'>
                        <p className='text-xs text-alt'>Write articles</p>
                    </CardContent>
                    <CardFooter className="px-[1.125rem] pb-4 block">
                        <div className="w-full flex justify-between">
                            <Link href='posts'><Button size='sm' className='border-border' variant="outline">Manage posts</Button></Link>
                            <Button size='sm' onClick={()=>{setFillContent('publication'), setFillState(true)}}>New Publication</Button>
                        </div>
                    </CardFooter>
                </Card>
                <Card className=''>
                    <CardHeader className='px-[1.125rem] pt-5 pb-3'>
                        <CardTitle className='text-base' >Stream media</CardTitle>
                    </CardHeader>
                    <CardContent className='px-[1.125rem] pb-3'>
                        <p className='text-xs text-alt'>Write articles</p>
                    </CardContent>
                    <CardFooter className="px-[1.125rem] pb-4 block">
                        <div className="w-full flex justify-between">
                            <Button size='sm'>Manage media content</Button>
                        </div>
                    </CardFooter>
                </Card>
                <Card className=''>
                    <CardHeader className='px-[1.125rem] pt-5 pb-3'>
                        <CardTitle className='text-base' >Web Ads</CardTitle>
                    </CardHeader>
                    <CardContent className='px-[1.125rem] pb-3'>
                        <p className='text-xs text-alt'>Write articles</p>
                    </CardContent>
                    <CardFooter className="px-[1.125rem] pb-4 block">
                        <div className="w-full flex justify-between">
                            <Link href='ads'><Button size='sm'>Manage Ads</Button></Link>
                        </div>
                    </CardFooter>
                </Card>
               
            </div>
        </div> 
  )
}

export default Content




export const NewPublication = () => {
    return (
      <>
          <h4>New publication</h4>
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
  
      </>
    )
  }