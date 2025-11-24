import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <header className="bg-white sticky top-0 z-[200]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Expresur Logo" className="h-12 w-1/2 object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <Button
                onClick={handleServicesClick}
                endIcon={<span className="text-xs">↓</span>}
                className="text-green-800 hover:text-[#046838] normal-case text-base font-semibold"
              >
                Servicios
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  onMouseLeave: handleClose,
                  sx: { mt: 1, boxShadow: 3 }
                }}
              >
                <MenuItem onClick={handleClose}><Link to="/envios" className="w-full">Envíos Nacionales</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/internacional" className="w-full">Envíos Internacionales</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/carga" className="w-full">Carga Pesada</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/express" className="w-full">Express 24h</Link></MenuItem>
              </Menu>

              {["Tienda", "Quiénes Somos", "FAQ", "Recogida"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-green-800 hover:text-[#046838] text-base font-semibold transition"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Track Button - Desktop Only */}
              <Link to={"/rasterear"}>
              <button
                className="hidden lg:flex bg-green-800 hover:bg-[#035230] text-white font-bold px-6 py-2.5 rounded-full shadow-lg"
              >
                RASTREAR PAQUETE
              </button>
              </Link>

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
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-bold text-[#046838]"
              >
                Inicio
              </Link>

              <div>
                <p className="text-lg font-bold text-[#FA921D] mb-3">Servicios</p>
                <div className="space-y-3 ml-4">
                  {["Envíos Nacionales", "Internacional", "Carga Pesada", "Express 24h"].map((s) => (
                    <Link
                      key={s}
                      to={`/${s.toLowerCase().replace(/ /g, "-")}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 hover:text-[#046838] font-medium"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>

              {["Tienda", "Quiénes Somos", "FAQ", "Recogida"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-semibold text-gray-800 hover:text-[#046838]"
                >
                  {item}
                </Link>
              ))}

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