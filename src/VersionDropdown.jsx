import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const VersionDropdown = ({versionNames, selectedVersion, setSelectedVersion}) => {
    // const uniqueVersionNames = [...new Set(data.map((item) => item.version_name))];
  
    const handleVersionChange = (event) => {
      setSelectedVersion(event.target.value);
    };
  
    return (
      <FormControl variant="outlined">
        <InputLabel>Select a Version</InputLabel>
        <Select
          label="Select a Version"
          value={selectedVersion}
          onChange={handleVersionChange}
        >
          <MenuItem value="">
            <em>All Versions</em>
          </MenuItem>
          {versionNames.map((versionName) => (
            <MenuItem key={versionName} value={versionName}>
              {versionName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

export default VersionDropdown