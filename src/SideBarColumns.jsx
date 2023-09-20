import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
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

import { Button } from '@mui/base';
import { Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import { AppContext } from './App';

const SideBarColumns = () => {
  
  const {selectedColumns, setSelectedColumns, columnInfo, setColumnInfo} = useContext(AppContext)

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      const originalIndex = columnInfo.findIndex((column) => column.header === name);
      console.log('index', originalIndex);
      setSelectedColumns((prevSelectedColumns) => [...prevSelectedColumns.slice(0, originalIndex), name, ...prevSelectedColumns.slice(originalIndex)]);
    } else {
      setSelectedColumns((prevSelectedColumns) =>
        prevSelectedColumns.filter((columnName) => columnName !== name)
      );
    }
  };
  console.log('bar', columnInfo);
  console.log('selectedColumns', selectedColumns);
  return (
    <div>
      <Menu>
        <MenuItem>
          <h4>Columns</h4>
        </MenuItem>

        <FormGroup style={{ marginLeft: '20px' }}>
          {columnInfo.map((field) => (
            <FormControlLabel
              key={field.header}
              control={
                <Checkbox
                  name={field.header}
                  checked={selectedColumns.includes(field.header)}
                  onChange={handleCheckboxChange}
                />
              }
              label={field.header}
            />
          ))}
        </FormGroup>
      </Menu>

    </div>
  );


  // return (
  //   <div>
  //     <Menu>
  //       <MenuItem>
  //         <h4>Columns</h4>
  //       </MenuItem>
  //       <FormGroup style={{marginLeft: '20px'}}>
  //           <FormControlLabel control={<Checkbox defaultChecked />} label="gfi_startframe" />
  //           <FormControlLabel control={<Checkbox defaultChecked />} label="gfi_endframe" />
  //           <FormControlLabel control={<Checkbox defaultChecked />} label="ego_speed" />
  //           <FormControlLabel control={<Checkbox defaultChecked />} label="yaw_rate" />
  //           {/* <FormControlLabel required control={<Checkbox />} label="Required" />
  //           <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
  //       </FormGroup>

  //     </Menu>

  //   </div>
  // )
}

export default SideBarColumns