import React, { useContext } from 'react'
import Search from './Search'
import Pagination from './Pagination'
import Stories from './Stories'
import "./App.css"

const App = () => {
  // const data=useContext(AppContext)
  return (
    <>
      <Search />
      <Pagination />
      <Stories />
     
    </>
  )
}

export default App