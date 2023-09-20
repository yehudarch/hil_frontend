import React, { useContext } from 'react'

const DarkMode = () => {
    const {darkMode, setDarkMode} = useContext(AppContext)

  return (
    <div>DarkMode</div>
  )
}

export default DarkMode