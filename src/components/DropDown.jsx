import { useEffect, useState, useRef } from 'react'

const DropDownItem = ({ value, onClick = () => {}, isSelected }) => {
  return (
    <div
      className={`p-3 cursor-pointer ${
        isSelected ? 'bg-gray-200' : 'hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <p>{value}</p>
    </div>
  )
}

export default function DropDown ({ setValue, values }) {
  const [selected, setSelected] = useState(0)
  const container = useRef(null)
  const selectedItem = useRef(null)

  //watches kung may clinick ba si user na key
  useEffect(() => {
    const handleKeyPress = event => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelected(prev => Math.min(prev + 1, values.length - 1)) //pipili between pinakamataas na possible value (length-1) or ung prev+1
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelected(prev => Math.max(prev - 1, 0))  //pipili between mas mababang value between (length-1) and prev-1
          break
        case 'Enter': //walang break para makukuha niya rin ung sa tab
        case 'Tab':
          event.preventDefault()
          if (values[selected]) {
            setValue(values[selected])
          }
          break
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress) //cleanup
    }
  }, [values, selected, setValue])

  //scroll kada lipat ng selected item
  useEffect(() => {
    selectedItem.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, [selected])

  useEffect(() => {
    setSelected(0)
  }, [values])

  if (values.length === 0) return null

  return (
    <div>
      <div
        ref={container}
        className='max-h-60 border-0 overflow-y-auto bg-white rounded-b-md max-w-fit mr-auto pr-10 shadow-lg'
      >
        {values.map((value, index) => (
          <div key={value} ref={index === selected ? selectedItem : null}>
            <DropDownItem
              value={value}
              onClick={() => setValue(value)}
              isSelected={index === selected}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
