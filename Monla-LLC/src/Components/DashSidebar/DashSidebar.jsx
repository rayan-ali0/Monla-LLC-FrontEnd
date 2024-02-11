import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryTable from '../../Pages/CategoryTable/CategoryTable';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import { Link, NavLink, useLocation } from "react-router-dom";
import "./DashSidebar.css"
import { useContext } from 'react';
// import Styles from "./DashSidebar.module.css"
import { UserContext} from "../../UserContext/UserContext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";
import axios from 'axios';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      
    }),
    backgroundColor: "#163357",
    color:"red"
  }),
);
const menuItems = [
  { text: '', color:"white",icon: <DashboardIcon /> },
  { text: 'Orders', icon: <ShoppingCartIcon /> },
  { text: 'Products', icon: <StoreIcon /> },
  { text: 'User', icon: <PeopleIcon /> },
  { text: 'Services', icon: <ReceiptIcon /> },
  { text: 'Category', icon: <CategoryIcon /> },
  { text: 'Brand', icon: <BrandingWatermarkIcon /> },
  { text: 'Model ', icon: <ModelTrainingIcon /> },
  { text: 'Year', icon: <DateRangeIcon /> },
  { text: 'Contact', icon: <MailOutlineIcon /> },
  { text: 'Shipping', icon: <LocalShippingIcon /> },
  { text: 'Profile', icon: <PersonIcon />   },
  { text: 'CompanyInfo', icon: <BusinessIcon /> }
];

export default function MiniDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } =useContext(UserContext)
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
//   const activeMenuItem = menuItems.find((menuItem) =>
//   location.pathname.toLowerCase().includes(menuItem.text.toLowerCase())
// );

  const lastSegment = location.pathname.split('/').filter(Boolean).pop();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Logout
  const logout = async () => {
    try {
      const action = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND}/logout`, {}, { withCredentials: true });
      if (action) {
        localStorage.removeItem('token')
        setUser(null);
        toast.success("Logout successful!"
        );
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:"#163357"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{color:"white"}} />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{display:"flex", justifyContent:"space-between" ,alignItems:"center",width:"100%", margin:"1rem" }}>
            <div className="profile">
              <h3>Welcome { user && user.name}</h3>
            </div>
            <Link to={"/"}>
              <h3 className='goHome'>
                Home Page
              </h3>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{backgroundColor:"#163357", height:"4.4rem"}} >
          <h2 style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%",fontSize:"25px", fontWeight:"1200",color:"white" }}>{lastSegment || 'Unknown Page'}</h2>
          <IconButton onClick={handleDrawerClose} sx={{color:"white"}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{color:"white"}}>
          {menuItems.map((menuItem, index) => {
            // console.log('MenuItem:', menuItem);
            return (
              <ListItem key={menuItem.text} disablePadding sx={{ display: 'block'}}>
                <NavLink to={`/dashboard/${menuItem.text.toLowerCase()}`} >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color:"white"
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color:"white"
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={menuItem.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </NavLink>
              </ListItem>
            );
          })}
        </List>

        {/* This is for the logout */}
        <ListItem onClick={logout} disablePadding sx={{ display: 'block', marginTop: "10px", paddingTop: "10px", borderTop:"1px solid white"}}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              color:"white"
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color:"white"
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
   {/* <Productstable/> */}
   {/* <AddEditProduct/> */}
      </Box>
    <DrawerHeader />
    </Box>
  );
}
