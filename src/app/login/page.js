'use client'
import {  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Login = () => {
  return (
    <div className='p'>
      <header className="p-5 justify-start flex">
        <h1 className="font-Madetommy font-bold text-xl">adFeed</h1>    
      </header>
      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle className='w-full text-base text-center'>Login</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="name">Name</label>
              <input id="name" className='p-2 h-8 border border-gray-400 rounded' defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <label htmlFor="username">Username</label>
              <input id="username" className='p-2 h-8 border border-gray-400 rounded' defaultValue="Pedro Duarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login