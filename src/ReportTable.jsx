import React, { useContext, useEffect, useRef, useState } from 'react';
import pic from './assets/11599261_50285.jpg'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './table.css'
import { fetchDataPagination } from './client';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { AppContext } from './App';
import { Button, IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import kangaroo from './assets/icons8-kangaroo-48.png'
import excel from './assets/icons8-microsoft-excel-48.png'
import csv from './assets/icons8-file-47.png'
import pdf from './assets/PDF_file_icon.png'
import jira from './assets/Jira.png'
import load_car from './assets/output-onlinegiftools.gif'
import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
// import { toPdf } from '@mikecousins/react-to-pdf';
import { usePDF } from 'react-to-pdf';
import generatePDF from 'react-to-pdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TurndownService from 'turndown';

const ReportTable = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [total, setTotal] = useState(0);
    
    const [exportHeaders, setExportHeaders] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [exportDataReady, setExportDataReady] = useState(false);
    const [jumpData, setJumpData] = useState([]);
    const [downloadExcel, setDownloadExcel] = useState(false);

    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
    // const [paramsString, setParamsString] = useState('')
    // const [finalFilters, setFinalFilters] = useState({})        

    const pdfRef = useRef();
    
    const {selectedColumns, setSelectedColumns, originalColumns, setOriginalColumns, fontSize, setFontSize, filters, setFilters, 
      searchFilter, setSearchFilter, paramsString, setParamsString, versionData, exportRequest, setExportRequest, 
      versionDataLoaded, setVersionDataLoaded, dataLoading, setDataLoading} = useContext(AppContext)

    const pageSize = 15

    const addData = async () => {

        const res = await fetchDataPagination(page, pageSize, paramsString);
    
        // console.log(res);
        if (res.results) {
            // console.log('IN');
        setData(res.results);
        setTotal(res.count);
        // console.log(total);
        // setColumns(Object.keys(res.results[0]).map((field) => ({field, header: field})))
        // setColumns(Object.keys(res.results[0]).map((field) => ({header: field})))
        // setColumns(Object.keys(res.results[0]).map((field) => ({header: field,
        //                                                         type: typeof res.results[0][field],
        //                                                       })));
        
        // setOriginalColumns(columns)
        // console.log('originalColumns', originalColumns);
        // console.log('columns', columns);
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
      // console.log('page', page);
      // console.log('paramsString', paramsString);
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

const createExportData = () => {
  console.log('setting export data', exportDataReady);
  // setExportDataReady(false)
  const headers = selectedColumns.map((column) => (
      column !== 'id' && column
    ));
  setExportHeaders(headers)

  const data = versionData.map((row) => {
    const selectedRow = {};
    selectedColumns.map((column) => {
      if (column !== 'id') {
        selectedRow[column] = row[column];
      }
    })
    return selectedRow;
  });
  setExportData(data)
  setJumpData([...exportData, {'trackfile': `#format: ${headers.join(' ')}`}])
  // setExportDataReady(true)
  setExportRequest(false)
  console.log('end export data', exportData);

  // return 'done'

}

const saveExcel = () => {

  // await createExportData();
  // Convert data to Excel sheet format
  const worksheet = XLSX.utils.json_to_sheet(exportData, { header: exportHeaders });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'HIL Results');

  // Save the Excel sheet
  // const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'blob' });
  XLSX.writeFile(workbook, `hil_data_${currDate}-${currTime}.xlsx`);
  // saveAs(excelBlob, `hil_data_${currDate}-${currTime}.xlsx`);
  
}
const createJumpData = () => {
    // const data = [...exportData, {'trackfile': `#format: ${exportHeaders.join(' ')}`}]
    const data = [...exportData]
    console.log('jump format',`#format: ${exportHeaders.join(' ')}`);
    setJumpData(data)   
  
}
  // useEffect(()=>{  
  //   console.log('setting export data', exportDataReady);
  //   // setExportDataReady(false)
  //   const headers = selectedColumns.map((column) => (
  //       column !== 'id' && column
  //     ));
  //   setExportHeaders(headers)

  //   const data = versionData.map((row) => {
  //     const selectedRow = {};
  //     selectedColumns.map((column) => {
  //       if (column !== 'id') {
  //         selectedRow[column] = row[column];
  //       }
  //     })
  //     return selectedRow;
  //   });
  //   setExportData(data)
  //   // setExportDataReady(true)
  //   setExportRequest(false)
  //   console.log('end export data', exportData);
  // }, [exportRequest && versionDataLoaded])

  // useEffect(()=>{  

  // // const data = [...exportData, {'trackfile': `#format: ${exportHeaders.join(' ')}`}]
  // const data = [...exportData]
  // console.log('jump format',`#format: ${exportHeaders.join(' ')}`);
  // console.log('jump exportData', exportData);
  // console.log('jump exportHeaders' ,exportHeaders);
  // setJumpData(data)
  // console.log('jumpData' ,jumpData);
  // setTimeout(setExportDataReady(true), 5000)
  // setTimeout(console.log('NOW'), 7000)
  
  // }, [exportData])
  useEffect(() => {
    // Check if exportData is ready before triggering saveExcel
    if (downloadExcel) {
      saveExcel();
      setDownloadExcel(false);
    }
  }, [exportData]);

  
  // // Create a ref for the component you want to convert to PDF
  // const pdfRef = useRef();

  // // ... (your existing functions)

  // const saveToPdf = async () => {
  //   const options = {
  //     orientation: 'landscape', // or 'portrait'
  //     unit: 'mm',
  //     format: 'a4',
  //   };

  //   // Use react-to-pdf library to convert the component to PDF
  //   const pdf = await toPdf(pdfRef.current, options);
    
  //   // Save the PDF or open it in a new tab
  //   // You can use a library like file-saver to save the PDF
  //   // For simplicity, I'll use a basic approach here
  //   const blob = new Blob([pdf], { type: 'application/pdf' });
  //   const url = URL.createObjectURL(blob);
  //   window.open(url, '_blank');
  // };  
  
  const saveToPdf = async () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    const content = pdfRef.current;

    // Use html2canvas to capture the content as an image
    const canvas = await html2canvas(content);

    // Convert the canvas to an image data URL
    const imgData = canvas.toDataURL('image/png');

    // Add the image to the PDF
    doc.addImage(imgData, 'PNG', 15, 15, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 30);

    // Save or open the PDF
    doc.save(`hil_data_${currDate}-${currTime}.pdf`);
  };
  
  const copyToClipboard = () => {
    // Get the table content and convert it to Markdown format
    const markdownTable = convertTableToMarkdown();

    // Copy to clipboard
    navigator.clipboard.writeText(markdownTable).then(() => {
      console.log('Table copied to clipboard!');
    });
  };

  const convertTableToMarkdown = () => {
    const rows = pdfRef.current.querySelectorAll('tr');
  
    const markdownRows = Array.from(rows)
      .map((row) => {
        const cells = Array.from(row.querySelectorAll('th, td'))
          .map((cell) => {
            return `| ${cell.textContent || cell.innerText} `;
          })
          .join('|');
  
        return `${cells}|`;
      })
      .join('\n');
  
    return markdownRows;
  };
  
  return (
    <div>
        {dataLoading ?
      // <CircularProgress style={{ margin: '20px' }} /> 
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', flexDirection: 'column'}}>
          <img src={load_car} alt='' style={{width: '200px'}}/>
          <p>Loading Data...</p>
          {/* <img src={carLoader} alt=''/> */}
      </div>
      : (
      <React.Fragment>
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
      <div style={{ flex: 1, textAlign: 'right', flexWrap: 'wrap' }}>
        <Button variant="contained" size='small' sx={{marginRight: '30px'}}>
          <PlayArrowIcon fontSize="medium" style={{marginRight: '10px'}}/>
          Play Ishow
        </Button>
        <CSVLink data={jumpData} headers={exportHeaders} filename={`hil_report_${currDate}-${currTime}.jump`} separator={' '}
          onClick={() => {createExportData()}}
          // disabled={!exportDataReady}
          >
          <Tooltip title="Download JumpFile">
            <IconButton fontSize='20px'>
              <img src={kangaroo} alt='jump' style={{width: '30px'}}/>
            </IconButton>
          </Tooltip>
        </CSVLink>
        <Tooltip title="Copy Jira format to clipboard">
          <IconButton onClick={copyToClipboard}>
            <img src={jira} alt='jira' style={{width: '25px'}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Download Excel Sheet">
          <IconButton onClick={() => {setDownloadExcel(true); createExportData()}} >
            <img src={excel} alt='excel' style={{width: '30px'}}/>
          </IconButton>
        </Tooltip>
        <CSVLink data={exportData} headers={exportHeaders} filename={`hil_report_${currDate}-${currTime}.csv`}
          // onClick={()=>{setExportDataReady(false); setExportRequest(true)}}
          onClick={() => createExportData()}
          // disabled={!exportDataReady}
        >
          <Tooltip title="Download CSV File">
            <IconButton>
              <img src={csv} alt='csv' style={{width: '30px'}}/>
            </IconButton>
          </Tooltip>
        </CSVLink>
        <Tooltip title="Download PDF">
          <IconButton onClick={() => generatePDF(pdfRef, {filename: `hil_report_${currDate}-${currTime}.pdf`})}>
          {/* <IconButton onClick={saveToPdf}> */}
            <img src={pdf} alt='pdf' style={{width: '25px'}}/>
          </IconButton>
        </Tooltip>
      </div>


    <div className="table-container" ref={pdfRef}>
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
    </React.Fragment>

    )}

    </div>

  )
}

export default ReportTable