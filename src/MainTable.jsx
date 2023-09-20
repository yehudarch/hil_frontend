import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios'; // Import Axios for HTTP requests
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const MainTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/rss_pagination') // Replace with your API endpoint
      .then(response => {
        setData(response.data.results);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    "ID",
    "Start Frame",
    "End Frame",
    // Add more columns here
  ];

  const transformedData = data.map(item => [
    item.id,
    item.gfi_startframe,
    item.gfi_endframe,
    // Add other properties as needed...
  ]);
  
  const options = {
    filterType: 'dropdown',
    // searchIcon: <FilterAltIcon/>
  };

  return (
    <div>
      <MUIDataTable
        title={"API Data Table"}
        data={transformedData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default MainTable;
