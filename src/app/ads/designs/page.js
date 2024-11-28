'use client'

const Designer = () => {
  return (
    <div>

        {/* <TEST>

        {logoText.length<2?<Button onClick={()=>{logoText.length<2?setLogoText(prev => [...prev,{index:prev.length,value:'',bold:false,italics:false,underline:false,fontSize:[14],fontFamily:'',gradient:false,color:['blue','green','yellow']}]):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Plus className='h-full w-full' /></Button>:''}
        {logoText.length>0?<Button onClick={()=>{logoText.length>0?setLogoText(logoText.filter(textObject=>textObject.index && textObject.index==logoText.length-1)):''}} variant="outline" className='p-0 w-6 h-6 rounded-[2px]' size="icon"><Minus className='h-full w-full'/></Button>:''}

        {logoText && logoText.map((banner,index)=>(
                                  <TextBox 
                                    key={index} 
                                    changeText={(e)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].value = e.target.    value ;return newArray}),console.log(logoText)}} 
                                    font_Size={(e)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].fontSize = e ;return newArray}),console.log(logoText)}} 
                                    text_Bold={(bool)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].bold = !bool  ;return newArray}),console.log(logoText[index].bold,logoText[index])}}
                                    text_Italics={(bool)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].italics = !bool  ;return newArray}),console.log(logoText[index].italics)}}
                                    text_Underline={(bool)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].underline = !bool  ;return newArray}),console.log(logoText[index].underline)}}
                                    type='banner' 
                                    changeColor={(col)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].color[0] = col.hex  ;return newArray}),console.log(logoText[index].color,logoText[index])}}
                                    changeColor2={(col)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].color[1] = col.hex  ;return newArray}),console.log(logoText[index].color,logoText[index])}}
                                    changeColor3={(col)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].color[2] = col.hex  ;return newArray}),console.log(logoText[index].color,logoText[index])}}
                                    setFamily={(fam)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].fontFamily = `font-[${fam}}]`  ;return newArray}),console.log(logoText[index].fontFamily,logoText[index])}}
                                    gradValue={(grad)=>{setLogoText( prev => { let newArray = [...prev]; newArray[index].underline = !grad ;return newArray}),console.log(logoText[index].gradient,logoText[index])}}
                                    changeLogo={(e)=>setLogoImage(e.target.files[0])}
                                    placeholder='...sub text' 
                                    value={logoText[index] && logoText[index].value}
                                    modify={true}/> 


        </TEST>

 */}



    </div>
  )
}

export default Designer