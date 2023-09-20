import React, { useContext } from 'react'

const FontSize = () => {
    const {fontSize, setFontSize} = useContext(AppContext)

  return (
    <div>FontSize</div>
  )
}

export default FontSize