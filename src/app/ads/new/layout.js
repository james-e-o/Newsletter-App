export default function AdsLayout({ children }) {
    return (    
        <div className='flex flex-col overflow-hidden h-[full]'>
            {children}
        </div>
    );
  }