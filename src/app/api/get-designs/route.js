
import format1 from '../../../../public/format 1.png'
import format2 from '../../../../public/format 2.png'
import format3 from '../../../../public/format 3.png'
import format4 from '../../../../public/format 4.png'
import format5 from '../../../../public/format 5.png'
import format6 from '../../../../public/format 6.png'

const designs =[
    {src:format1,type:'hello world'}, {src:format2,type:'hello world'}, {src:format3,type:'hello world'}, {src:format4,type:'hello world'}, {src:format5,type:'hello world'}, {src:format6,type:'hello world'},
]


export async function GET(request) {
   
          return new Response(JSON.stringify(designs))
  
          
}