import React, { useContext, useEffect, useState } from 'react'
import TableChartIcon from '@mui/icons-material/TableChart';
import TuneIcon from '@mui/icons-material/Tune';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SideBarFilters from './SideBarFilters';
import SideBarColumns from './SideBarColumns';
import SideBarPreferences from './SideBarPreferences';
import { IconButton } from '@mui/material';
import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AppContext } from './App';


const SideBars = () => {
    const [barType, setBarType] = useState('preferences')

    const [collapsed, setCollapsed] = useState(false)

    const {showBar, setShowBar} = useContext(AppContext)

    // const { collapseSidebar } = useProSidebar();

    // useEffect(()=>{
    //     collapseSidebar()
    // }, [])

  return (
    <div>
            {/* <div> */}
        {/* <IconButton
        sx={{margin: '10px'}}
            onClick={()=>{setShowBar(!showBar)}}>
            <MenuIcon fontSize="large"/>
        </IconButton> */}
    
    {showBar &&
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <Sidebar style={{ height: "100vh", width: '10vh', backgroundColor: 'lightGrey' }}>
        {/* <IconButton
                sx={{margin: '10px'}}
                onClick={() => {
                        collapseSidebar();
                        setCollapsed(!collapsed);
                      }}>                
                      {collapsed ? <ArrowForwardIosIcon/> : <ArrowBackIosIcon/>}
        </IconButton>
 */}
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <IconButton
                sx={{margin: '10px'}}
                onClick={()=>{setBarType('filters')}}>
                <FilterAltIcon fontSize="large" className={barType === 'filters' ? 'active-icon' : ''}/>
            </IconButton>
            <IconButton
                sx={{margin: '10px'}}
                onClick={()=>{setBarType('columns')}}>
                <TableChartIcon fontSize="large" className={barType === 'columns' ? 'active-icon' : ''}/>
            </IconButton>
            <IconButton
                sx={{margin: '10px'}}
                onClick={()=>{setBarType('preferences')}}>
                <TuneIcon fontSize="large" className={barType === 'preferences' ? 'active-icon' : ''}/>
            </IconButton>
            </div>

            {barType === 'filters' && <SideBarFilters/>}
            {barType === 'columns' && <SideBarColumns/>}
            {barType === 'preferences' && <SideBarPreferences/>}
            <div>
                
            </div>
            </Sidebar>
        </div>
  }

    </div>

  )
}

export default SideBars