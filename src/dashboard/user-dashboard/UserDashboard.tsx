import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  SvgIconProps // Importamos el tipo para los iconos
} from "@mui/material";
import {
  GridView,
  LockOutlined,
  Inventory2Outlined,
  CallSplitOutlined,
  DirectionsBoatFilledOutlined,
  LocalShippingOutlined,
  CreditCardOutlined,
  LayersOutlined,
  SettingsOutlined,
  KeyboardBackspace,
} from "@mui/icons-material";
import { useLocation, matchPath, NavLink } from "react-router-dom";

// Definimos la interfaz para los ítems del menú
interface MenuItem {
  text: string;
  icon: React.ReactElement<SvgIconProps>; // Esto asegura que el icono acepte sx y fontSize
  path: string;
}

const drawerWidth = 280;
const collapsedWidth = 80;

const menuItems: MenuItem[] = [
  { text: "Dashboard", icon: <GridView />, path: "/dashboard/user-dashboard" },
  { text: "My Locker", icon: <LockOutlined />, path: "/dashboard/locker" },
  { text: "Packages", icon: <Inventory2Outlined />, path: "/dashboard/packages" },
  { text: "Consolidations", icon: <CallSplitOutlined />, path: "/dashboard/consolidate" },
  { text: "Shipments", icon: <DirectionsBoatFilledOutlined />, path: "/dashboard/shipments" },
  { text: "Pickup", icon: <LocalShippingOutlined />, path: "/dashboard/pickup" },
  { text: "Wallet", icon: <CreditCardOutlined />, path: "/dashboard/payments" },
  { text: "Remittances", icon: <LayersOutlined />, path: "/dashboard/remittances" },
  { text: "Settings", icon: <SettingsOutlined />, path: "/dashboard/profile" },
];

export default function UserSidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const handleToggle = () => setOpen((prev) => !prev);
  const normalize = (p: string) => (p ? p.replace(/\/+$/, "") : p);

  const BG_GREEN = "#065f46"; 
  const ACTIVE_ORANGE = "#f97316"; 

  

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          backgroundColor: BG_GREEN,
          color: "#fff",
          transition: "width 0.3s ease",
          overflowX: "hidden",
          borderRight: "none",
          borderRadius: "0 24px 24px 0",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 3, mb: 2 }}>
        {open && (
           <Typography variant="h5" sx={{ fontWeight: 900, color: "#f97316", letterSpacing: 1 }}>
              EXPRESUR
           </Typography>
        )}
        <IconButton onClick={handleToggle} sx={{ color: "#fff" }}>
          <KeyboardBackspace sx={{ transform: open ? "rotate(0deg)" : "rotate(180deg)", transition: "0.3s" }} />
        </IconButton>
      </Box>

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const match = matchPath(
            { path: normalize(item.path), end: true },
            normalize(location.pathname)
          );
          const isSelected = !!match;

          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block", mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  minHeight: 54,
                  borderRadius: "16px",
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                  backgroundColor: isSelected ? "transparent" : "transparent",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 45,
                    height: 45,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    backgroundColor: isSelected ? ACTIVE_ORANGE : "transparent",
                    color: "#fff",
                    mr: open ? 2 : 0,
                  }}
                >
                  {/* Clonamos el icono pasando las props de estilo correctamente */}
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: isSelected ? 22 : 26 }
                  })}
                </ListItemIcon>
                
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& .MuiTypography-root": {
                      fontSize: "1rem",
                      fontWeight: isSelected ? 600 : 400,
                      color: "#fff",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}