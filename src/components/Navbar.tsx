import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  WhatsApp,
  Instagram,
  Facebook,
  Language,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import Logo from "../assets/Grupo 1.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  // helper to test if current path matches any services route (for Servicios button active state)
  const isServicesActive = () =>
    location.pathname.startsWith("/envios") ||
    location.pathname.startsWith("/internacional") ||
    location.pathname.startsWith("/carga") ||
    location.pathname.startsWith("/express");

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <header className="bg-white sticky top-0 z-[200]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <img src={Logo} alt="Expresur Logo" className="h-12 w-1/2 object-contain" />
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <Button
                onClick={handleServicesClick}
                endIcon={<span className="text-xs">↓</span>}
                className={`normal-case text-base font-semibold ${
                  isServicesActive()
                    ? "text-[#046838] underline decoration-[#046838] underline-offset-4"
                    : "text-green-800 hover:text-[#046838]"
                }`}
              >
                Servicios
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  onMouseLeave: handleClose,
                  sx: { mt: 1, boxShadow: 3 },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <NavLink to="/envios" className="w-full">
                    Envíos Nacionales
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink to="/internacional" className="w-full">
                    Envíos Internacionales
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink to="/carga" className="w-full">
                    Carga Pesada
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink to="/express" className="w-full">
                    Express 24h
                  </NavLink>
                </MenuItem>
              </Menu>

              {["Tienda", "Quiénes Somos", "FAQ", "Recogida"].map((item) => {
                const path = `/${item.toLowerCase().replace(" ", "-")}`;
                return (
                  <NavLink
                    key={item}
                    to={path}
                    className={({ isActive }) =>
                      `text-base font-semibold transition ${
                        isActive ? "text-[#046838] underline decoration-[#046838] underline-offset-4" : "text-green-800 hover:text-[#046838]"
                      }`
                    }
                  >
                    {item}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Track Button - Desktop Only */}
              <NavLink to={"/rasterear"}>
                <button
                  className={`hidden lg:flex bg-green-800 hover:bg-[#035230] text-white font-bold px-6 py-2.5 rounded-full shadow-lg ${
                    location.pathname === "/rasterear" ? "ring-2 ring-[#046838]" : ""
                  }`}
                >
                  RASTREAR PAQUETE
                </button>
              </NavLink>

              {/* Social Icons */}
              <div className="hidden md:flex items-center gap-2">
                <IconButton size="small" sx={{ color: "#046838" }}><WhatsApp /></IconButton>
                <IconButton size="small" sx={{ color: "#046838" }}><Instagram /></IconButton>
                <IconButton size="small" sx={{ color: "#046838" }}><Facebook /></IconButton>
              </div>

              {/* Language */}
              <Button endIcon={<Language />} className="hidden md:flex text-gray-700 normal-case">
                ES
              </Button>

              {/* Mobile Menu Toggle */}
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                className=" z-[200] lg:hidden text-[#046838]"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - No Button, Clean Design */}
      {mobileMenuOpen && (
        <div className="z-[200] fixed inset-0 bg-black bg-opacity-60 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center">
                <img src={Logo} alt="Expresur" className="h-11" />
                <IconButton onClick={() => setMobileMenuOpen(false)}>
                  <Close className="text-[#046838]" />
                </IconButton>
              </div>
            </div>

            <nav className="p-6 space-y-6">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-xl font-bold ${isActive ? "text-[#046838] underline" : "text-[#046838]"}`
                }
              >
                Inicio
              </NavLink>

              <div>
                <p className="text-lg font-bold text-[#FA921D] mb-3">Servicios</p>
                <div className="space-y-3 ml-4">
                  {["Envíos Nacionales", "Internacional", "Carga Pesada", "Express 24h"].map((s) => {
                    const path = `/${s.toLowerCase().replace(/ /g, "-")}`;
                    return (
                      <NavLink
                        key={s}
                        to={path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block text-gray-700 hover:text-[#046838] font-medium ${isActive ? "text-[#046838] underline" : ""}`
                        }
                      >
                        {s}
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {["Tienda", "Quiénes Somos", "FAQ", "Recogida"].map((item) => {
                const path = `/${item.toLowerCase().replace(" ", "-")}`;
                return (
                  <NavLink
                    key={item}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-lg font-semibold ${isActive ? "text-[#046838] underline" : "text-gray-800 hover:text-[#046838]"}`
                    }
                  >
                    {item}
                  </NavLink>
                );
              })}

              {/* Social Icons in Mobile */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Síguenos</p>
                <div className="flex gap-6 text-3xl">
                  <WhatsApp className="text-[#046838] cursor-pointer hover:scale-110 transition" />
                  <Instagram className="text-[#046838] cursor-pointer hover:scale-110 transition" />
                  <Facebook className="text-[#046838] cursor-pointer hover:scale-110 transition" />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
