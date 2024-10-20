export default function HomeLayout({ children }) {
    return (    
        <div className='mx-3 flex flex-col h-[98vh]'>
            <h2 className='font-extrabold font-Inter px-5 pb-0 mb-7 pt-5'>Manage Content</h2>
            {children}
        </div>
    );
  }