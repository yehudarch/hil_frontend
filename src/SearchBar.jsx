import React, { useContext } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { TextField } from '@mui/material';
import { AppContext } from './App';

const SearchBar = () => {

    const {searchFilter, setSearchFilter, filters, setFilters, columnInfo, setColumnInfo} = useContext(AppContext)
    
    const handleSearchChange = (value) => {

        setSearchFilter((prevFilters) => {
            const updatedFilters = { ...prevFilters };
      
            if (value === '') {
              delete updatedFilters['search'];
            } else {
              updatedFilters['search'] = value;
            }
            
            return updatedFilters;
          });
      
    }
    console.log('searchFilter', searchFilter);
  return (
    <div>
        <TextField id="outlined-basic" label="Search HIL Events" variant="outlined" size='small'
            InputProps={{
                endAdornment: <SearchIcon />,
                }}
            onChange={(e) => handleSearchChange(e.target.value)}
        />
    </div>
  )
}

export default SearchBar