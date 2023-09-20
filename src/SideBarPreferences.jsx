import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TuneIcon from '@mui/icons-material/Tune';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PaletteIcon from '@mui/icons-material/Palette';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import PollIcon from '@mui/icons-material/Poll';
import TableChartIcon from '@mui/icons-material/TableChart';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

// import { Button } from '@mui/base';
import { IconButton, Slider, Typography, Button } from '@mui/material';
import { AppContext } from './App';
import { BABY_BLUE, CYAN, DARK_ORANGE, FREESIA, GREEN, LIGHT_GREEN, NAVY_BLUE, ORANGE, RED, YELLOW } from './config';


const SideBarPreferences = () => {
    const {colorTheme, setColorTheme, fontSize, setFontSize} = useContext(AppContext)

  return (
    <div>
      <Menu>
      <MenuItem>
          <h4>Preferences</h4>
        </MenuItem>

        <SubMenu icon={<FormatSizeIcon  fontSize="large"/>} label="Size">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", height: '70px'}}>
            <Typography id="slider-label" gutterBottom>
                Font Size: {fontSize}
            </Typography>

            <Slider min={6} max={28} value={fontSize}
                
                style={{ width: '150px'}}
                onChange={(e)=>{setFontSize(e.target.value)}}
                />
                </div>
        </SubMenu>
        <SubMenu icon={<PaletteIcon  fontSize="large"/>} label='Color Theme'>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", margin: '10px'}}>
          <Button variant="contained" disableElevation size='small' style={{color: 'darkgreen', backgroundColor: 'orange', margin: '5px', width: '20px',
            border: colorTheme === 'green_orange' ? '2px solid black' : 'none'}}
            onClick={()=>{setColorTheme('green_orange')}}>
            <FormatColorFillIcon/>
          </Button>                
          <Button variant="contained" disableElevation size='small' style={{color: 'lightblue', backgroundColor: 'darkbkue', margin: '5px', width: '20px',
            border: colorTheme === 'blue_shades' ? '2px solid black' : 'none'}}
            onClick={()=>{setColorTheme('blue_shades')}}>
            <FormatColorFillIcon/>
          </Button>                
          <Button variant="contained" disableElevation size='small' style={{color: RED, backgroundColor: YELLOW, margin: '5px', width: '20px',
            border: colorTheme === 'colorful' ? '2px solid black' : 'none'}}
            onClick={()=>{setColorTheme('colorful')}}>
            <FormatColorFillIcon/>
          </Button>                
        </div>
        </SubMenu>

        <MenuItem icon={<DarkModeIcon  fontSize="large"/>}>Dark Mode</MenuItem>
        <MenuItem icon={<PollIcon  fontSize="large"/>}>Dashboard Settings</MenuItem>
        <MenuItem icon={<VideoSettingsIcon  fontSize="large"/>}>Ishow Settings</MenuItem>

      </Menu>
  </div>

    )
}

export default SideBarPreferences