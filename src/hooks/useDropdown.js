import { useState, useEffect, useRef } from 'react'

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  let dropdownRef = useRef()

  useEffect(() => {
    let handler = e => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const toggle = () => setIsOpen(!isOpen)

  return { isOpen, toggle, dropdownRef }
}
