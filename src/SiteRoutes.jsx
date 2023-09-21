import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from './App'
import Home from './Home'
import LoginForm from './LoginForm'
import MainTable from './MainTable'
import ReportTable from './ReportTable'
import SignupForm from './SignupForm'

const SiteRoutes = () => {
    const {showBar} = useContext(AppContext)
  return (
    <div style={{ width: showBar ? '85%' : '99%', margin: '10px'}}>
        <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/main-table' element={<MainTable/>}/>
              <Route path='/report-table' element={<ReportTable/>}/>
              <Route path='/login' element={<LoginForm/>}/>
              <Route path='/signup' element={<SignupForm/>}/>
        </Routes>

    </div>
  )
}

export default SiteRoutes