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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import { Button } from '@mui/base';
import Button from 'react-bootstrap/Button';
import { FormControl, InputLabel, MenuItem as MuiMenuItem, Select, Checkbox, FormGroup, FormControlLabel, TextField, Box, Grid, Typography } from '@mui/material';
import { AppContext } from './App';


const SideBarFilters = () => {
  
  const {filterChanges, setFilterChanges, filters, setFilters, columnInfo, setColumnInfo} = useContext(AppContext)

  // Function to update filters state
  const handleFilterChange = (field, value) => {
    setFilterChanges((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (value === '') {
        delete updatedFilters[field];
      } else {
        updatedFilters[field] = value;
      }

      return updatedFilters;
    });
  };

  const handleResetFilters = () => (
    setFilterChanges({}),
    setFilters({})
  )

  const handleFiltersSubmit = () => {
    setFilters(filterChanges)
    // Update the columnInfo with filter settings
    // const updatedColumnInfo = columnInfo.map((field) => {
    //   if (field.type === 'number' && filters[field.header] !== undefined) {
    //     const { min, max } = filters[field.header];
    //     return {
    //       ...field,
    //       filter: { min, max },
    //     };
    //   } else if (field.type === 'boolean' && filters[field.header] !== undefined) {
    //     return {
    //       ...field,
    //       filter: filters[field.header] === 'true', // Convert back to boolean
    //     };
    //   }
    //   return field;
    // });

    // setColumnInfo(updatedColumnInfo);
  };
  console.log('filterChanges', filterChanges);
  console.log('filters', filters);
  const stringFilters = columnInfo.filter((field) => field.type === 'string');
  const numberFilters = columnInfo.filter((field) => field.type === 'number');
  const booleanFilters = columnInfo.filter((field) => field.type === 'boolean');

  return (
    <div>
      <Menu>
        <MenuItem>
          <h4>Filters</h4>
        </MenuItem>
        <FormControl style={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}>
          <Button variant="primary" onClick={handleFiltersSubmit} >
            Apply Filters
          </Button>
          <Button variant="link" onClick={handleResetFilters}>Reset</Button>
        </FormControl>
        <FormGroup style={{ marginLeft: '20px' }}>
          {stringFilters.map((field) => (
            <div key={field.header} style={{ marginBottom: '10px' }}>
              <InputLabel>{field.header}</InputLabel>
              <Select
                value={filterChanges[field.header] || ''}
                onChange={(e) => handleFilterChange(field.header, e.target.value)}
                label={field.header}
                size="small"
                style={{ backgroundColor: 'white', width: '190px' }}
              >
                <MuiMenuItem value="">All</MuiMenuItem>
                {field.value_options.map((option) => (
                  <MuiMenuItem key={option} value={option}>
                    {option}
                  </MuiMenuItem>
                ))}
              </Select>
            </div>
          ))}
         
          {booleanFilters.map((field) => (
            <div key={field.header} style={{ marginBottom: '10px' }}>
              <InputLabel>{field.header}</InputLabel>
              <Select
                value={filterChanges[field.header] || ''}
                onChange={(e) => handleFilterChange(field.header, e.target.value)}
                label={field.header}
                size="small"
                style={{ backgroundColor: 'white', width: '190px' }}
              >
                <MuiMenuItem value="">All</MuiMenuItem>
                <MuiMenuItem value="true">True</MuiMenuItem>
                <MuiMenuItem value="false">False</MuiMenuItem>
              </Select>
            </div>
          ))}

          {numberFilters.map((field) => (
            <div key={field.header} style={{ marginBottom: '10px' }}>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                <InputLabel>{field.header}</InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    // type="number"
                    value={filterChanges[`${field.header}__gte`] || ''}
                    onChange={(e) =>
                      handleFilterChange(`${field.header}__gte`, e.target.value)}
                      // handleFilterChange(field.header, {
                      //   ...filters[field.header],
                      //   min: e.target.value,
                    //   })
                    // }
                    size="small"
                    style={{ backgroundColor: 'white' }}
                    // InputProps={{ inputProps: { min: -100000, max: 100000 } }}
                  />
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'center' }}>
                  -
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    // type="number"
                    value={filterChanges[`${field.header}__lte`] || ''}
                    onChange={(e) =>
                      handleFilterChange(`${field.header}__lte`, e.target.value)}

                    //   handleFilterChange(field.header, {
                    //     ...filters[field.header],
                    //     max: e.target.value,
                    //   })
                    // }
                    size="small"
                    style={{ backgroundColor: 'white' }}
                    // InputProps={{ inputProps: { min: -100000, max: 100000 } }}
                  />
                </Grid>
              </Grid>
            </div>
          ))}

        </FormGroup>
      </Menu>
    </div>
  );
};


export default SideBarFilters