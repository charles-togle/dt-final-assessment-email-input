import { useState } from 'react'

export default function DisplayEmail ({ onClick = () => {}, email }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailRegex.test(email)
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className={`group w-fit flex items-center flex-row gap-2   text-sm p-1 py-2 pr-6  relative rounded-sm ${
        !isValidEmail ? 'bg-red-300' : 'hover:bg-gray-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className='default-font font-bold'>{email}</p>
      <span
        className={`${
          isValidEmail
            ? 'hidden group-hover:block right-3'
            : 'text-base w-4 h-4 flex justify-center items-center bg-red-500 rounded-full text-white'
        } cursor-pointer absolute right-1 font-bold text-xs`}
        onClick={() => onClick()}
      >
        {isValidEmail ? 'X' : isHovered ? 'X' : '!'}
      </span>
    </div>
  )
}
