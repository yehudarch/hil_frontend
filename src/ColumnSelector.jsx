import React, { useContext } from 'react'

const ColumnSelector = () => {
    const {selectedColumns, setSelectedColumns} = useContext(AppContext)

  return (
    <div>ColumnSelector</div>
  )
}

export default ColumnSelector