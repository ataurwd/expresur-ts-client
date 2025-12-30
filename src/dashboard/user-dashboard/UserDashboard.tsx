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
  SvgIconProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DirectionsBoatFilledOutlined,
  SettingsOutlined,
  Shuffle as ConsolidateIcon,
  Logout,
  Menu as MenuIcon,
  Close as CloseIcon // ১. Close আইকন ইম্পোর্ট করা হলো
} from "@mui/icons-material";

import { useLocation, matchPath, NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ArrowLeftToLine, LockKeyholeOpen, Package, Wallet, Layers } from 'lucide-react';

interface MenuItem {
  text: string;
  icon: React.ReactElement<SvgIconProps>;
  path: string;
}

const drawerWidth = 280;
const collapsedWidth = 80;

const menuItems: MenuItem[] = [
  { text: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard/user-dashboard" },
  { text: "My Locker", icon: <LockKeyholeOpen />, path: "/dashboard/locker" },
  { text: "Packages", icon: <Package />, path: "/dashboard/packages" },
  { text: "Consolidations", icon: <ConsolidateIcon />, path: "/dashboard/consolidate" },
  { text: "Shipments", icon: <DirectionsBoatFilledOutlined />, path: "/dashboard/shipments" },
  { text: "Wallet", icon: <Wallet />, path: "/dashboard/payments" },
  { text: "Remittances", icon: <Layers />, path: "/dashboard/remittances" },
  { text: "Settings", icon: <SettingsOutlined />, path: "/dashboard/profile" },
];

export default function UserSidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggle = () => setOpen((prev) => !prev);
  const handleMobileToggle = () => setMobileOpen(!mobileOpen);

  const normalize = (p: string) => (p ? p.replace(/\/+$/, "") : p);

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  const BG_GREEN = "#025939";
  const ACTIVE_ORANGE = "#fb923c";

  // --- ড্রয়ারের ভেতরের কন্টেন্ট ---
  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflowX: "hidden" }}>
      
      {/* --- Top Section (Logo & Toggle/Close) --- */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 3, mb: 2 }}>
        {(open || isMobile) && (
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "#fb923c",
                letterSpacing: 1,
                cursor: "pointer",
              }}
            >
              EXPRESUR
            </Typography>
          </Link>
        )}
        
        {/* ডেস্কটপে কলাপস বাটন */}
        {!isMobile && (
          <IconButton onClick={handleToggle} sx={{ color: "#fff" }}>
            <ArrowLeftToLine style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)", transition: "0.3s" }} />
          </IconButton>
        )}

        {/* ২. মোবাইলে Close (X) বাটন যোগ করা হলো */}
        {isMobile && (
          <IconButton onClick={handleMobileToggle} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* --- Middle Section (Menu Items) --- */}
      <List sx={{ px: 2, flexGrow: 1 }}>
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
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  minHeight: 54,
                  borderRadius: "16px",
                  justifyContent: (open || isMobile) ? "initial" : "center",
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
                    mr: (open || isMobile) ? 2 : 0,
                  }}
                >
                  {React.isValidElement(item.icon)
                    ? React.cloneElement(item.icon as React.ReactElement<any>, {
                        sx: { fontSize: isSelected ? 22 : 26 },
                        htmlColor: isSelected ? "#ffffff" : "#ababab",
                        style: { fontSize: isSelected ? 22 : 26, color: isSelected ? "#ffffff" : "#ababab" },
                      })
                    : item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: (open || isMobile) ? 1 : 0,
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

      {/* --- Bottom Section (Logout) --- */}
      <Box sx={{ p: 2, mb: 2, marginTop: "auto" }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            justifyContent: (open || isMobile) ? "flex-start" : "center",
            borderRadius: 2,
            px: (open || isMobile) ? 2 : 0,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
          }}
        >
          <Box
            sx={{
              minWidth: 40,
              minHeight: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ef4444",
              mr: (open || isMobile) ? 2 : "auto",
            }}
          >
            <Logout sx={{ fontSize: 22 }} />
          </Box>

          <ListItemText
            primary="Logout"
            sx={{
              opacity: (open || isMobile) ? 1 : 0,
              color: "#ef4444",
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* --- Mobile Menu Trigger Button --- */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1200,
          bgcolor: "white",
          borderRadius: "50%",
          boxShadow: 1,
          width: 40, // বাটন সাইজ ফিক্স করা হলো যাতে দেখতে সুন্দর লাগে
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handleMobileToggle} sx={{ color: BG_GREEN }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* --- Navigation Component --- */}
      <Box
        component="nav"
        sx={{ width: { md: open ? drawerWidth : collapsedWidth }, flexShrink: { md: 0 } }}
      >
        {/* 1. Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: BG_GREEN,
              color: "#fff",
              borderRadius: "0 24px 24px 0",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* 2. Desktop Drawer */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: open ? drawerWidth : collapsedWidth,
              backgroundColor: BG_GREEN,
              color: "#fff",
              transition: "width 0.3s ease",
              overflowX: "hidden",
              borderRight: "none",
              borderRadius: "0 24px 24px 0",
              height: "100vh",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
}