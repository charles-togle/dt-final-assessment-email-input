export default function Container ({ children }) {
  return (
    <div className='flex flex-wrap gap-1 bg-[#fdfdfd] min-w-105 p-3.5 max-w-105 rounded-md font-default'>
      {children}
    </div>
  )
}
