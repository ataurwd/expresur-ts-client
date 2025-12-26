import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";

// Importing specific icons to match the design
import {
  GridView as DashboardIcon,

  Shuffle as ConsolidateIcon,
  LocalShippingOutlined as ShipmentsIcon,




  ManageAccountsOutlined as InternalUsersIcon,
  AssignmentOutlined as AuditIcon,
  BuildOutlined as ApiIcon,
  SettingsOutlined as SettingsIcon,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Logout,
} from "@mui/icons-material";
import { Package, LockKeyholeOpen, Layers, QrCode, Users, Wallet, ChartNoAxesColumnIncreasing } from 'lucide-react';

// Link ইম্পোর্ট করা হয়েছে
import { useNavigate, useLocation, matchPath, NavLink, Link } from "react-router-dom";

type Props = {
  adminName?: string;
  adminEmail?: string;
  avatarUrl?: string;
  defaultOpen?: boolean;
};

const drawerWidth = 260;
const collapsedWidth = 70;

/* Updated Menu Items to match the screenshot exactly */
const adminMenuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard/admin" },
  { text: "Packages", icon: <Package />, path: "/dashboard/admin-packages" },
  { text: "Locker", icon: <LockKeyholeOpen />, path: "/dashboard/admin-locker" },
  { text: "Consolidations", icon: <ConsolidateIcon />, path: "/dashboard/admin-consolidations" },
  { text: "Shipments", icon: <ShipmentsIcon />, path: "/dashboard/admin-shipments" },
  { text: "Logistic Group", icon: <Layers />, path: "/dashboard/logistic-group" },
  { text: "QR Scanning", icon: <QrCode />, path: "/dashboard/qr-scanning" },
  { text: "Users", icon: <Users />, path: "/dashboard/admin-users" },
  { text: "Wallet", icon: <Wallet />, path: "/dashboard/admin-wallet" },
  { text: "Report", icon: <ChartNoAxesColumnIncreasing />, path: "/dashboard/admin-reports" },
  { text: "Internal Users", icon: <InternalUsersIcon />, path: "/dashboard/internal-users" },
  { text: "Audit Logs", icon: <AuditIcon />, path: "/dashboard/audit-logs" },
  { text: "API Integrations", icon: <ApiIcon />, path: "/dashboard/api-integrations" },
  { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/admin-settings" },
];

export default function AdminSidebar({
  adminName = "Admin Name",
  adminEmail = "admin@expresur.com",
  avatarUrl,
  defaultOpen = true,
}: Props) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    Cookies.remove("currentUser");
    toast.success("Logged out successfully!", {
      duration: 1500,
    });
    navigate("/");
  };

  const normalize = (p: string) => (p ? p.replace(/\/+$/, "") : p);

  // Colors extracted from the image
  const BG_COLOR = "#025939"; // Deep Green
  const ACTIVE_ORANGE = "#FB923C"; // Orange
  const TEXT_COLOR = "#D1D5DB"; // Light Grey for inactive text
  const TEXT_ACTIVE = "#FFFFFF"; // White for active text

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
          backgroundColor: BG_COLOR,
          color: "#fff",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
          borderRight: "none",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          p: 3,
          mb: 1,
        }}
      >
        {open && (
          // Link কম্পোনেন্ট ব্যবহার করা হয়েছে
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 800,
                color: ACTIVE_ORANGE,
                fontFamily: '"Poppins", sans-serif',
                letterSpacing: "0.5px",
                cursor: "pointer", // কার্সার পয়েন্টার দেওয়া হয়েছে
                "&:hover": { opacity: 0.9 }
              }}
            >
              EXPRESUR
            </Typography>
          </Link>
        )}

        <IconButton onClick={handleToggle} sx={{ color: "#fff", p: 0.5 }}>
          {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, px: 2 }}>
        {adminMenuItems.map((item) => {
          // Logic to determine active state
          const endMatch = item.path === "/dashboard/admin" ? false : true;
          const match = matchPath(
            { path: normalize(item.path), end: endMatch },
            normalize(location.pathname)
          );
          const isSelected = !!match;

          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block", mb: 0.5 }}>
              <ListItemButton
                component={(props: any) => (
                  <NavLink {...props} to={item.path} end={endMatch} />
                )}
                selected={isSelected}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 0, // Reset padding to handle centering manually
                  borderRadius: "50px", // Rounded styling

                  // Removing default MUI selected background
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "transparent",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {/* ICON WRAPPER (This handles the orange circle) */}
                <Box
                  sx={{
                    minWidth: 40,
                    minHeight: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? ACTIVE_ORANGE : 'transparent',
                    color: isSelected ? '#FFF' : '#8faebb', // Text color for inactive icons
                    mr: open ? 2 : 'auto',
                    ml: open ? 0 : 'auto',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {/* FIXED: Added <any> to cast the icon */}
                  {React.cloneElement(item.icon as React.ReactElement<any>, { sx: { fontSize: 22 } })}
                </Box>

                {/* TEXT LABEL */}
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    transition: "opacity 0.2s",
                    m: 0,
                    "& .MuiTypography-root": {
                      color: isSelected ? TEXT_ACTIVE : TEXT_COLOR,
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: '0.95rem',
                      fontFamily: '"Poppins", sans-serif',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Logout Section */}
      <Box sx={{ p: 2, mb: 1 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            justifyContent: open ? "flex-start" : "center",
            borderRadius: 2,
            px: open ? 2 : 0,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" }
          }}
        >
          <Box
            sx={{
              minWidth: 40,
              minHeight: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444', // Red color for logout
              mr: open ? 2 : 'auto',
            }}
          >
            <Logout sx={{ fontSize: 22 }} />
          </Box>

          <ListItemText
            primary="Logout"
            sx={{
              opacity: open ? 1 : 0,
              color: '#ef4444'
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}