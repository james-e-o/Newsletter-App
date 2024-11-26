export default function AdsLayout({ children }) {
    return (    
        <div className='mx-3 flex flex-col overflow-hidden h-[98.7svh]'>
            <h2 className='font-extrabold font-Inter px-5 pb-0 mb-3 pt-4'>Adverts</h2>
            {children}
        </div>
    );
  }