export default function EmailInput ({ value, setValue = () => {}, isEmpty }) {
  return (
    <input
      type='text'
      value={value}
      className='border-0 outline-0 focus:border-0 focus:outline-0 text-gray-400 placeholder:text-gray-400 font-default'
      onChange={e => setValue(e.target.value)}
      placeholder={`${(isEmpty && 'Enter recipients...') || ''}`}
    />
  )
}
