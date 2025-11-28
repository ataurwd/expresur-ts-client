import React, { useState } from "react";
import Logo from "../../assets/Grupo 1.png";
import Cookies from "js-cookie";
import { toast } from "sonner";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory2 as InventoryIcon,
  Shuffle as ConsolidateIcon,
  LocalShipping as LocalShippingIcon,
  Flight as FlightIcon,
  LocalTaxi as LocalTaxiIcon,
  Payment as PaymentIcon,
  CurrencyExchange as RatesIcon,
  TrackChanges as TrackingIcon,
  BarChart as ReportsIcon,
  AdminPanelSettings as AdminsIcon,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation, Link } from "react-router-dom";

type Props = {
  adminName?: string;
  adminEmail?: string;
  avatarUrl?: string;
  defaultOpen?: boolean;
};

const drawerWidth = 260;
const collapsedWidth = 65;

const adminMenuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard/admin" },
  { text: "Users", icon: <PeopleIcon />, path: "/dashboard/admin_users" },
  { text: "Packages", icon: <InventoryIcon />, path: "/dashboard/admin_packages" },
  {
    text: "Consolidations",
    icon: <ConsolidateIcon />,
    path: "/dashboard/admin_consolidations",
  },
  {
    text: "Shipments",
    icon: <LocalShippingIcon />,
    path: "/dashboard/admin_shipments",
  },
  { text: "Cuba Shipments", icon: <FlightIcon />, path: "/dashboard/admin_cuba" },
  {
    text: "Pickup Requests",
    icon: <LocalTaxiIcon />,
    path: "/dashboard/admin_pickup",
  },
  { text: "Payments", icon: <PaymentIcon />, path: "/dashboard/admin_payments" },
  { text: "Rates", icon: <RatesIcon />, path: "/dashboard/admin_rates" },
  { text: "Tracking", icon: <TrackingIcon />, path: "/dashboard/admin_tracking" },
  { text: "Reports", icon: <ReportsIcon />, path: "/dashboard/admin_reports" },

  { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/admin_settings" },
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
  Cookies.remove("currentUser"); // remove cookie
  toast.success("Logged out successfully!", {
    duration: 1500,
  });
  navigate("/"); // redirect to home
};

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
          background: "linear-gradient(180deg, #166534 0%, #166534 100%)", // same green gradient
          color: "#fff",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
          borderRight: "none",
        },
      }}
    >
      {/* Header - Logo + Toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            opacity: open ? 1 : 0,
            transition: "opacity 0.2s",
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          <Link to={"/"}>
            <img className="w-2/3" src={Logo} alt="" />
          </Link>
        </Typography>
        <IconButton onClick={handleToggle} sx={{ color: "#fff" }}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: "#475569" }} />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {adminMenuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isSelected}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  backgroundColor: isSelected
                    ? "rgba(99, 102, 241, 0.3)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    transition: "opacity 0.2s 0.1s",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom - Profile + Logout */}
      <Box sx={{ p: 2, borderTop: "1px solid #475569", mt: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            src={avatarUrl}
            sx={{ bgcolor: "#4f46e5", width: 40, height: 40 }}
          >
            {!avatarUrl && adminName ? adminName.charAt(0).toUpperCase() : null}
          </Avatar>
          {open && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {adminName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                {adminEmail}
              </Typography>
            </Box>
          )}
        </Box>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "#fca5a5",
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#fca5a5",
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
