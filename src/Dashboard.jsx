import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState, version } from 'react'
import { AppContext } from './App';
import { fetchData, fetchVersionData, fetchVersionDateData, fetchVersions } from './client';
import MyBarChart from './MyBarChart';
import MyPieChart from './MyPieChart'
import VersionDropdown from './VersionDropdown';
import { Spinner } from 'react-bootstrap';


const Dashboard = () => {
    const [page, setPage] = useState(1)
    const [versionData, setVersionData] = useState([]);
    // const [data, setData] = useState(null);
    const [pieColumns, setPieColumns] = useState(['root_cause', 'time_of_day', 'weather', 'country', 'road_type'])
    const [selectedVersion, setSelectedVersion] = useState('version_1')
    const [selectedDate, setSelectedDate] = useState(null)
    const [versionNames, setVersionNames] = useState([])
    // const [columns, setColumns] = useState([]);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);
    
    const {selectedColumns, setSelectedColumns, columnInfo, setColumnInfo, allData, setAllData, versionFilter, setVersionFilter, paramsString, setParamsString, filters, setFilters} = useContext(AppContext)

    // const pageSize = 15

    const getVersionData = async () => {
        console.log('date_string', paramsString);
        const res = await fetchVersionDateData(paramsString);
    
        if (res) {
            console.log('res', res);
            setVersionData(res);
            // setTotal(res.count);
        }
      }

    // const getData = async () => {
    //     setLoading(true);        
    //     console.log('getData');
    //     const res = await fetchData();
    //     setLoading(false);        
    //     console.log('getData', res);
    //     if (res) {
    //         console.log('data', res[0]);
    //         setData(res);
    //         setColumnInfo(Object.keys(res[0]).map((field) => ({header: field,
    //                                                                         type: typeof res[0][field],
    //                                                                         value_options:
    //                                                                         typeof res[0][field] === 'string'
    //                                                                           ? Array.from(new Set(res.map((item) => item[field])))
    //                                                                           : typeof res[0][field] === 'boolean'
    //                                                                           ? [true, false]
    //                                                                           : undefined,
                                                                      
    //           })));


    //     }
    //   }

    // const getVersions = async () => {
    //     const res = await fetchVersions(selectedVersion);
    
    //     if (res) {
    //         setVersionNames(res.map((version) => version.version_name));

    //         console.log('versionNames', versionNames);
    //         // setTotal(res.count);
    //     }
    //   }

    // useEffect(()=>{
    //     console.log('ON MOUNT');
    //     getData()
    // }, [])
    
    useEffect(()=>{
        // setVersionFilter((prevFilters) => {
        //     const updatedFilters = { ...prevFilters };
        //     console.log('dashboard_selectedDate', selectedDate);
        //     updatedFilters['version_date'] = selectedDate;
        //     return updatedFilters;
        //   });
        //   console.log('filters_date', versionFilter);
        getVersionData();
        // console.log('data2', data);
        // getVersions()
    }, [paramsString])
    
    console.log('selectedDate', selectedDate);
    // console.log('data1', data, versionNames);

  return (
    <div style={{display: 'flex', flexDirection: "column", justifyContent: "left"}}>
        
        {allData && <MyBarChart data={allData} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>}
        {/* <VersionDropdown versionNames={versionNames} selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion}/> */}
    <br/>
    <h4 style={{color: 'grey'}}>Presenting results for: {selectedDate}</h4>
        {/* {loading ? <Spinner animation="border" size="lg" /> : null} */}

    <div style={{ display: "flex", flexDirection: "row", alignItems: "center",
    flexWrap: "wrap", justifyContent: "left", border: 'solid lightgrey 1px', borderRadius: '10px'}}>
        {versionData.length > 0 && pieColumns.map((column) => {return <MyPieChart data={versionData} column={column} />})}
        {/* {pieColumns.map((col) => {return <MyPieChart data={data} column={col} />})} */}
        {/* {data && pieColumns.map((column) => {return <MyPieChart data={data} column={column}/>})} */}
        {/* {data && pieColumns.map((column) => {console.log(data);})} */}
        
    </div>
    </div>
  )
}

export default Dashboard