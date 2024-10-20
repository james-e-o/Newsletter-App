const fs =  require('fs')
import { NextResponse } from 'next/server'

export async function POST(request) {

  console.log(request.files)
  return new Response(request.file)
}