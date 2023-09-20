import React, { useContext, useEffect, useState } from 'react';
import pic from './assets/11599261_50285.jpg'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './table.css'
import { fetchDataPagination } from './client';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { AppContext } from './App';

const ReportTable = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [total, setTotal] = useState(0);
    // const [paramsString, setParamsString] = useState('')
    // const [finalFilters, setFinalFilters] = useState({})        

    
    const {selectedColumns, setSelectedColumns, originalColumns, setOriginalColumns, fontSize, setFontSize, filters, setFilters, searchFilter, setSearchFilter, paramsString, setParamsString} = useContext(AppContext)

    const pageSize = 15

    const addData = async () => {

        const res = await fetchDataPagination(page, pageSize, paramsString);
    
        console.log(res);
        if (res.results) {
            // console.log('IN');
        setData(res.results);
        setTotal(res.count);
        console.log(total);
        // setColumns(Object.keys(res.results[0]).map((field) => ({field, header: field})))
        // setColumns(Object.keys(res.results[0]).map((field) => ({header: field})))
        // setColumns(Object.keys(res.results[0]).map((field) => ({header: field,
        //                                                         type: typeof res.results[0][field],
        //                                                       })));
        
        // setOriginalColumns(columns)
        // console.log('originalColumns', originalColumns);
        console.log('columns', columns);
        // console.log('columnsWithTypes', columnsWithTypes);
        } 
      }

      // const buildFilterParams = (finalFilters) => {
      //   const queryParams = [];
      //   console.log('buildFilterParams', finalFilters);
      //   Object.keys(finalFilters).map((field) => {
      //     queryParams.push(`${field}=${finalFilters[field]}`)
      //   })
      
      //   setParamsString(`&${queryParams.join('&')}`);
      //   console.log('queryParams', queryParams);
      //   console.log('paramsString', paramsString);
      // };
      

    useEffect(()=>{
      console.log('page', page);
      console.log('paramsString', paramsString);
        addData()
    }, [page, paramsString])

    // useEffect(()=>{
    //   const finalFilters = { ...filters, ...searchFilter };
    //   // setFinalFilters(updatedFinalFilters);
    //   console.log('useEffect', filters);
    //   console.log('useEffect', finalFilters);
    //   // {Object.keys(filters).length > 0 && buildFilterParams()}
    //   buildFilterParams(finalFilters)
    // }, [filters, searchFilter])


//     useEffect(()=>{
//         addData()
//     }, [    useEffect(()=>{
//       setOriginalColumns(columns)
//       console.log('originalColumns', originalColumns);
//     }, [columns])
// ])


  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap", justifyContent: "left"}}>
        <PaginationControl
            page={page}
            between={2}
            total={(total - 1)} // total records
            limit={pageSize}  // record per page
            changePage={(selectedPage) => {
                setPage(selectedPage);
                }}
            ellipsis={1}
            
        />

    <div className="table-container" >
      <Table striped bordered hover variant='light'>
        <thead>
          <tr>
            {selectedColumns.map((column) => (
              column !== 'id' && <th key={column} dataSort={ true } style={{fontSize: fontSize*1.1}}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {selectedColumns.map((column) => (
                column !== 'id' && <td key={column} style={{fontSize: fontSize}}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
    <PaginationControl
            page={page}
            between={2}
            total={(total - 1)} // total records
            limit={pageSize}  // record per page
            changePage={(selectedPage) => {
                setPage(selectedPage);
                }}
            ellipsis={1}
            
        />
    </div>

  )
}

export default ReportTable