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
import { useLanguage } from "../i18n/LanguageContext";

const Navbar = () => {
  const { lang, t, toggleLang } = useLanguage();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const isServicesActive = () =>
    location.pathname.startsWith("/envios") ||
    location.pathname.startsWith("/internacional") ||
    location.pathname.startsWith("/carga") ||
    location.pathname.startsWith("/express");

  const services = [
    { path: "/envios", key: "envio_nacionales" as const },
    { path: "/internacional", key: "envio_internacional" as const },
    { path: "/carga", key: "carga_pesada" as const },
    { path: "/express", key: "express" as const },
  ];

  const topNav = [
    { path: "/tienda", key: "tienda" as const },
    { path: "/quienes-somos", key: "quienes_somos" as const },
    { path: "/faq", key: "faq" as const },
    { path: "/recogida", key: "recogida" as const },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-[200]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center">
              <img src={Logo} alt="Expresur Logo" className="h-12 w-1/2 object-contain" />
            </NavLink>

            {/* Desktop Nav */}
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
                {t("servicios")}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{ onMouseLeave: handleClose, sx: { mt: 1, boxShadow: 3 } }}
              >
                {services.map((s) => (
                  <MenuItem key={s.path} onClick={handleClose}>
                    <NavLink to={s.path} className="w-full">
                      {t(s.key)}
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>

              {topNav.map((n) => (
                <NavLink
                  key={n.path}
                  to={n.path}
                  className={({ isActive }) =>
                    `text-base font-semibold transition ${
                      isActive
                        ? "text-[#046838] underline decoration-[#046838] underline-offset-4"
                        : "text-green-800 hover:text-[#046838]"
                    }`
                  }
                >
                  {t(n.key)}
                </NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <NavLink to={"/rasterear"}>
                <button
                  className={`hidden lg:flex bg-green-800 hover:bg-[#035230] text-white font-bold px-6 py-2.5 rounded-full shadow-lg ${
                    location.pathname === "/rasterear" ? "ring-2 ring-[#046838]" : ""
                  }`}
                >
                  {t("rastrear")}
                </button>
              </NavLink>

              {/* Social Icons */}
              <div className="hidden md:flex items-center gap-2">
                <IconButton sx={{ color: "#046838" }}>
                  <WhatsApp />
                </IconButton>
                <IconButton sx={{ color: "#046838" }}>
                  <Instagram />
                </IconButton>
                <IconButton sx={{ color: "#046838" }}>
                  <Facebook />
                </IconButton>
              </div>

              {/* Language Button */}
              <Button
                onClick={toggleLang}
                endIcon={<Language />}
                className="hidden md:flex text-gray-700 normal-case"
                title={t("switchTo")}
              >
                {t("languageShort")}
              </Button>

              {/* Mobile Menu Button */}
              <IconButton onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-[#046838]">
                <MenuIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="z-[200] fixed inset-0 bg-black bg-opacity-60 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center">
              <img src={Logo} alt="Expresur" className="h-11" />

              <div className="flex items-center gap-2">
                <Button onClick={toggleLang} startIcon={<Language />} className="normal-case">
                  {t("languageShort")}
                </Button>

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
                {t("inicio")}
              </NavLink>

              <div>
                <p className="text-lg font-bold text-[#FA921D] mb-3">{t("servicios")}</p>

                <div className="space-y-3 ml-4">
                  {services.map((s) => (
                    <NavLink
                      key={s.path}
                      to={s.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block text-gray-700 hover:text-[#046838] font-medium ${
                          isActive ? "text-[#046838] underline" : ""
                        }`
                      }
                    >
                      {t(s.key)}
                    </NavLink>
                  ))}
                </div>
              </div>

              {topNav.map((n) => (
                <NavLink
                  key={n.path}
                  to={n.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-semibold ${
                      isActive ? "text-[#046838] underline" : "text-gray-800 hover:text-[#046838]"
                    }`
                  }
                >
                  {t(n.key)}
                </NavLink>
              ))}

              {/* Social Icons */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">{t("siguenos")}</p>

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
