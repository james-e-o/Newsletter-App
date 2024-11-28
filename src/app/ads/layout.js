export default function AdsLayout({ children }) {
    return (    
        <div className='mx-3 flex flex-col relative overflow-hidden h-[99svh]'>
            {children}
        </div>
    );
}
