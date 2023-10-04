// import logo from './logo.svg';
import MainTable from './MainTable';
import logo from './assets/app-hil-low-resolution-logo-color-on-transparent-background.png';
import MyNavbar from './MyNavbar';
import SiteRoutes from './SiteRoutes';
import './App.css';
import SideBarPreferences from './SideBarPreferences';
import SideBarFilters from './SideBarFilters';
import SideBars from './SideBars';
import { createContext, useEffect, useState } from 'react';
import { authenticateToken, fetchVersionDateData } from './client';
import InitData from './InitData';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

export const AppContext = createContext(null)

function App() {
  const [token, setToken] = useState(localStorage.getItem('app_token'))
  const [authenticated, setAuthenticated] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [shoppingCart, setShoppingCart] = useState([])
  const [showBar, setShowBar] = useState(true)
  const [colorTheme, setColorTheme] = useState('green_orange')

  const [isLogged, setIsLogged] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(15)
  const [cellRatio, setCellRatio] = useState(1)
  const [selectedColumns, setSelectedColumns] = useState([])
  const [filters, setFilters] = useState({})
  const [searchFilter, setSearchFilter] = useState({})
  const [filterChanges, setFilterChanges] = useState({})
  const [ versionFilter, setVersionFilter] = useState({})
  const [paramsString, setParamsString] = useState('')

  const [allData, setAllData] = useState(null)
  const [columnInfo, setColumnInfo] = useState([])

  const [versionDataLoaded, setVersionDataLoaded] = useState(false)
  const [exportRequest, setExportRequest] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [versionData, setVersionData] = useState([]);
  // const [darkMode, setDarkMode] = useState(localStorage.getItem('dark_mode'))

  const nav = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      const res = await authenticateToken(token);
      console.log(res);
      if (res) {
        console.log('YES');
        setFirstname(res.first_name)
        setLastname(res.last_name)
        setIsLogged(true);
        console.log(firstname, lastname);
      } else{
        console.log('NO')
        setIsLogged(false);
      }
    };
    checkToken();
  }, [token]);

  useEffect(()=>{
    setSelectedColumns(columnInfo.map((field)=>field.header))
  }, [columnInfo])

  const buildFilterParams = (finalFilters) => {
    const queryParams = [];
    console.log('buildFilterParams', finalFilters);
    Object.keys(finalFilters).map((field) => {
      queryParams.push(`${field}=${finalFilters[field]}`)
    })
  
    setParamsString(`&${queryParams.join('&')}`);
    console.log('queryParams', queryParams);
    console.log('paramsString', paramsString);
  };
  

useEffect(()=>{
  const finalFilters = { ...filters, ...searchFilter, ...versionFilter };
  // setFinalFilters(updatedFinalFilters);
  console.log('useEffect-filters', filters);
  console.log('useEffect-finalFilters', finalFilters);
  console.log('useEffect-searchFilter', searchFilter);
  // {Object.keys(filters).length > 0 && buildFilterParams()}
  buildFilterParams(finalFilters)
}, [filters, searchFilter, versionFilter])

const getVersionData = async () => {
  const res = await fetchDataWrapper(); 

  if (res) {
      setVersionDataLoaded(true)
  }
}

const fetchDataWrapper = async () => {
  const res = await fetchVersionDateData(paramsString); 

  if (res) {
      setVersionData(res);
  }
  return res
}

useEffect(()=>{
  console.log('dash exportRequest', exportRequest);
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
  setExportRequest(false)
}, [paramsString, exportRequest])

  return (
    <div>
          <AppContext.Provider value={{isLogged, setIsLogged,
                                token, setToken,
                                firstname, setFirstname, 
                                lastname, setLastname,
                                darkMode, setDarkMode,
                                fontSize, setFontSize,
                                cellRatio, setCellRatio,
                                showBar, setShowBar,
                                colorTheme, setColorTheme,
                                selectedColumns, setSelectedColumns,
                                filters, setFilters,
                                searchFilter, setSearchFilter,
                                paramsString, setParamsString,
                                versionFilter, setVersionFilter,
                                filterChanges, setFilterChanges,
                                columnInfo, setColumnInfo,
                                allData, setAllData,
                                versionData, setVersionData,
                                dataLoading, setDataLoading,
                                exportRequest, setExportRequest,
                                versionDataLoaded, setVersionDataLoaded,
                                }}>
        <div>
      {/* <header > */}
        <div style={{height: '100px', display: 'flex'}}>
          <div style={{height: '100px', display: 'flex', width: '33%', alignItems: 'left', justifyContent: 'left', margin: '25px'}}>                        
          <SearchBar/>
          </div>
          <div style={{height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '33%'}}>
            <img src={logo} alt="Company Logo" style={{width: '200px'}} onClick={()=>nav('/')}/>
          </div>
          <div style={{height: '100px', display: 'flex', width: '33%', alignItems: 'right', justifyContent: 'right'}}>
          
          </div>                        
        </div>
      <InitData/>
      <MyNavbar/>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <SideBars/>
        <SiteRoutes/>
        {/* <SideBarFilters/> */}
      </div>
      {/* </header> */}
      {/* HIL */}
      {/* <MainTable/> */}
    </div>
    </AppContext.Provider>
    </div>

  );
}

export default App;
