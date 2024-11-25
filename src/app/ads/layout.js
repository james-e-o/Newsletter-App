export default function AdsLayout({ children }) {
    return (    
        <div className='mx-3 flex flex-col overflow-hidden h-[98.5vh]'>
            <h2 className='font-extrabold font-Inter px-5 pb-0 mb-5 pt-4'>Adverts</h2>
            {children}
        </div>
    );
  }