// 'use client'
// import { createContext } from "react";
// export const designData = createContext()

export default function AdsLayout({ children }) {
  
    return (   
        // <designData.Provider value={{}}>
            <div className='flex flex-col pb-2 overflow-hidden flex-grow'>
                {children}
            </div>
        // </designData.Provider>
    );
 }