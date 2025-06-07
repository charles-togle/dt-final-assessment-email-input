import { useEffect, useRef } from 'react'

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

export default function DropDown ({ setValue, values, selected }) {
  const container = useRef(null)
  const selectedItem = useRef(null)

  //scroll kada lipat ng selected item
  useEffect(() => {
    selectedItem.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, [selected])

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
              onClick={() => {
                setValue(value)
              }}
              isSelected={index === selected}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
