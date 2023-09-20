import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './App';
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import mobileyeLogo from './assets/mobileye-logo-horizontal-white.png'
import { IconButton } from '@mui/material';
import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

const MyNavbar = () => {
    const {isLogged, setIsLogged} = useContext(AppContext)
    const {firstname, setFirstname} = useContext(AppContext)
    const {lastname, setLastname} = useContext(AppContext)
    const {showBar, setShowBar} = useContext(AppContext)


    const nav = useNavigate()

    const handleLogout = () => {
        // const confirmed = window.confirm("Are you sure you want to logout?");
        // if (confirmed) {
          setIsLogged(false);
        //   nav('/home');
        // }
      };
      
  return (
    <div>
    <Navbar expand="lg" style={{ backgroundColor: '#00072D'}} variant="dark">
    <IconButton
        sx={{margin: '10px', color: 'white'}}
            onClick={()=>{setShowBar(!showBar)}}
            >
            <MenuIcon fontSize="large"/>
        </IconButton>

    <img src={mobileyeLogo} alt="Company Logo" style={{width: '150px', margin: '20px'}}
            onClick={()=>nav('/')}/>

    <Container>
        <Navbar.Brand as={Link} to="/"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
            {/* <Nav className="ml-auto">
                <img src={mobileyeLogo} alt="Company Logo" style={{width: '150px'}}/>
            </Nav> */}
            <Nav className="m-auto">
                <Nav.Link as={Link} to="/" >Dashboard</Nav.Link>
                <Nav.Link as={Link} to='report-table'>Reports</Nav.Link>
                <Nav.Link as={Link} to="/report-table">Help</Nav.Link>
                <NavDropdown title="Contact us" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/tabs">Report a bug</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/city">Request a Feature</NavDropdown.Item>
                {/* <NavDropdown.Item as={Link} to="/modal">
                    Modal
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/buttons">
                    Contact History...
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
                <div style={{paddingBottom: 'px', display: 'flex'}}>
                {isLogged && <p className="text-white mt-3" style={{paddingRight: '15px'}}>Hi {firstname} {lastname}</p>}
                {isLogged ? <Button variant="contained" size='small' onClick={handleLogout} className="mt-3" style={{borderRadius: '10px', height: '30px'}}>Logout</Button> : <Button variant="contained" size='small' onClick={()=>{nav('/login')}} className="mt-3"  style={{borderRadius: '10px', height: '30px'}}>Login</Button>}
                </div>
            </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}

export default MyNavbar