import EmailInput from './components/EmailInput'
import Container from './components/Container'
import DisplayEmail from './components/DisplayEmail'
import { useState, useEffect, useRef } from 'react'
import DropDown from './components/DropDown'
import { fetchData } from './services/fetchData'
export default function Page () {
  const [emails, setEmails] = useState([])
  const [dropdownItems, setDropDownItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [tempEmail, setTempEmail] = useState('')
  const [selectedDropdown, setSelectedDropdown] = useState(-1)
  const selectedDropdownRef = useRef(selectedDropdown)

  useEffect(() => {
    selectedDropdownRef.current = selectedDropdown
  }, [selectedDropdown])

  //dropdown and temp email for adding
  useEffect(() => {
    const handleKeyPress = event => {
      if (loading) return

      switch (event.key) {
        case 'ArrowDown':
          if (dropdownItems.length > 0) {
            setSelectedDropdown(prev =>
              Math.min(prev + 1, dropdownItems.length - 1)
            )
          }
          break
        case 'ArrowUp':
          if (dropdownItems.length > 0) {
            setSelectedDropdown(prev => Math.max(prev - 1, 0))
          }
          break
        case 'Enter':
        case 'Tab':
          if (selectedDropdown !== -1 && dropdownItems[selectedDropdown]) {
            updateEmails(dropdownItems[selectedDropdown])
          } else if (tempEmail.trim() !== '') {
            updateEmails(tempEmail)
          }
          setDropDownItems([])
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [dropdownItems, selectedDropdown, tempEmail, loading])

  //getting data pag may input si user hence the [tempEmail] dependency
  useEffect(() => {
    async function getData () {
      setLoading(true)
      const data = await fetchData()
      if (!data) {
        setDropDownItems([])
        return
      }
      const cleanedData = data.filter(email =>
        email.toLowerCase().startsWith(tempEmail.toLowerCase())
      )
      const filteredData = cleanedData.filter(email => !emails.includes(email))
      setDropDownItems(filteredData)
      setLoading(false)
    }

    if (tempEmail.trim() !== '') {
      getData()
    } else {
      setDropDownItems([])
    }
  }, [tempEmail])

  //pag delete ng emails na nasa array na
  const handleEmailDelete = email => {
    let deletedEmailIndex = emails.indexOf(email)
    console.log(deletedEmailIndex)
    if (deletedEmailIndex !== -1) {
      const updatedEmails = emails.filter(
        (_, index) => index !== deletedEmailIndex
      )
      setEmails(updatedEmails)
    }
  }

  //eventlistner when nag add si user ng email
  const updateEmails = email => {
    if (emails.indexOf(email) !== -1) return
    const updatedEmails = [...emails, email]
    setEmails(updatedEmails)
    setTempEmail('')
    console.log('Set')
    setSelectedDropdown(-1)
  }

  return (
    <div className='default font w-screen h-screen bg-[#ebebeb] flex justify-center flex-col items-center relative'>
      <div>
        <Container>
          {emails.map((email, index) => (
            <DisplayEmail
              email={email}
              key={`${email} ${index}`}
              onClick={() => handleEmailDelete(email)}
            />
          ))}
          <div className='relative flex items-center flex-1'>
            <EmailInput
              value={tempEmail}
              setValue={setTempEmail}
              isEmpty={emails.length === 0}
            />
            {loading && (
              <img
                src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmMzbDY1NmNmZzZqMm01dzNvbWF0OXUxOWZrazJ3c3lqNTg4b2FzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sSgvbe1m3n93G/giphy.gif'
                className='w-5 absolute right-0'
              />
            )}
          </div>
        </Container>
        <div className='flex self-start'>
          <DropDown
            values={dropdownItems}
            setValue={updateEmails}
            selected={selectedDropdown}
          />
        </div>
      </div>
    </div>
  )
}
