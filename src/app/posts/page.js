'use client'
import React,{useState,useEffect} from 'react'
import { Menubar, MenubarContent, MenubarItem, MenubarSeparator, Menubarlabel, MenubarMenu,} from '@radix-ui/react-menubar'
import { CardContent, Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { XIcon } from 'lucide-react'


const Posts = () => {
  const [activeMenu, setActiveMenu] = useState('drafts')

  return (
      <div className="overflow-x-clip mb-1 flex-grow w-full h-full overflow-y-scroll relative flex flex-col gap-4 px-2 pb-1">
        <Button className='w-fit' size='sm'>New post</Button>
        <Tabs defaultValue="drafts" className="w-full text-base flex flex-col flex-grow">
          <TabsList className="grid w-full border-gray-200 border gap-1 grid-cols-3">
            <TabsTrigger className={activeMenu==='drafts'? 'active':""} value='drafts' onClick={()=>setActiveMenu('drafts')} >Drafts</TabsTrigger>
            <TabsTrigger className={activeMenu==='scheduled'? 'active':""} value='scheduled' onClick={()=>setActiveMenu('scheduled')}>Scheduled</TabsTrigger>
            <TabsTrigger className={activeMenu==='published'? 'active':""} value='published' onClick={()=>setActiveMenu('published')}>Published</TabsTrigger>
          </TabsList>
          <Card className="p-3 flex mt-2 h-full flex-col">
          {
              activeMenu === 'drafts'? <Drafts/>: 
              activeMenu === 'scheduled'? <Scheduled/>: 
              activeMenu === 'published'?<Published/> : ""
            }
          </Card>
        </Tabs>
    </div>
  )
}

export default Posts








const Drafts = () => {
  return (
    <div>
      hi world
    </div>
  )
}

const Scheduled = () => {
  return (
    <div>
      hello world
    </div>
  )
}

const Published = () => {
  return (
    <div>
      hello world
    </div>
  )
}


