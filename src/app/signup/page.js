'use client'
import {  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Indiv,google,x } from "../signin/page"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const SignUp = () => {

  const [data, setData] = useState()

  return (
    <div className='h-full flex font-Inter flex-col'>
      <header className="p-5 justify-start flex">
        <h1 className="font-Madetommy font-bold text-xl">adFeed</h1>    
      </header>
      <p className="pt-8 pb-0 px-5 text-center text-base font-semibold">Get Started!</p>
      <div className="px-5 py-1 flex flex-col justify-start flex-grow">

        <Card className='border-none shadow-none'>
          <CardContent className="space-y-2 p-4">
            <form method='post' >
              <Indiv  error ={data && data.emailError} type={'text'} name={"email"} placehold={"Email"} />
              <Indiv icon={true} error ={data && (data.passwordError || data.passwordError2)} type={'password'} altType={'text'} name={"password"} placehold={"Password"}/> 
              <Indiv icon={true} error ={data && (data.passwordError || data.passwordError2)} type={'password'} altType={'text'} name={"password"} placehold={"re-enter Password"}/> 
                 
              <Button className="text-sm mt-4 font-semibold w-full p rounded-[0.2rem]" >Sign up</Button>  
              <p className="w-full pl-1 mt-1"><Link className="text-gray-400 text-[0.73rem] decoration-none" href={'/signin'}>already have an account?  <span className="text-gray-900 text-xs"> Sign in</span></Link></p>
              <div className="items-center mt-5 relative w-full px-2 after:absolute after:border-b after:w-2/5 after:right-0 after:border-gray-400 after:my-0 before:absolute before:border-b before:w-2/5 before:left-0 before:border-gray-400 before:my-0 flex justify-center"><span className="text-gray-500 relative -top-[2px] text-xs">or</span></div>
              <Button className="text-sm mt-4 font-medium w-full text-gray-500 border-gray-400 rounded-[0.2rem]" variant='outline' >continue with {google}</Button> 
              <Button className="text-sm mt-4 font-medium w-full text-gray-500 border-gray-400 rounded-[0.2rem]" variant='outline' >continue with {x}</Button> 
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignUp