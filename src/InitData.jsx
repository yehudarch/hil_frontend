import React, { useContext, useEffect } from 'react'
import { AppContext } from './App';
import { fetchData } from './client';

const InitData = () => {

    const {selectedColumns, setSelectedColumns, columnInfo, setColumnInfo, allData, setAllData} = useContext(AppContext)


    const getAllData = async () => {
        // setLoading(true);        
        console.log('getData');
        const res = await fetchData();
        // setLoading(false);        
        console.log('getData', res);
        if (res) {
            console.log('data', res[0]);
            setAllData(res);
            setColumnInfo(Object.keys(res[0]).map((field) => ({header: field,
                                                                            type: typeof res[0][field],
                                                                            value_options:
                                                                            typeof res[0][field] === 'string'
                                                                              ? Array.from(new Set(res.map((item) => item[field])))
                                                                              : typeof res[0][field] === 'boolean'
                                                                              ? [true, false]
                                                                              : undefined,
                                                                      
              })));


        }
      }

    // const getVersions = async () => {
    //     const res = await fetchVersions(selectedVersion);
    
    //     if (res) {
    //         setVersionNames(res.map((version) => version.version_name));

    //         console.log('versionNames', versionNames);
    //         // setTotal(res.count);
    //     }
    //   }

    useEffect(()=>{
        console.log('ON MOUNT');
        getAllData()
    }, [])

//   return (
//     <div>
        
//     </div>
//   )
}

export default InitData