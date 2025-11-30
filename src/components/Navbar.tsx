// src/components/Navbar.tsx
import React, { useState } from "react";
import {
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  WhatsApp,
  Instagram,
  Facebook,
  Language,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";

import PersonIcon from "@mui/icons-material/Person"; // 👈 ADDED
import Logo from "../assets/Grupo 1.png";
import { useLanguage } from "../i18n/LanguageContext";

const Navbar: React.FC = () => {
  const { t, toggleLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const topNav = [
    { path: "/quiénes-somos", key: "quienes_somos" as const },
    { path: "/faqpage", key: "faq" as const },
    { path: "/recogida", key: "recogida" as const },
    { path: "/contacto", key: "contacto" as const },
    { path: "/nuestros", key: "nuestros" as const },
    { path: "/casilleroescritorio", key: "CasilleroEscritorio" as const },
  ];

  return (
    <>
      {/* Top green bar */}
      <div className="bg-green-800 pr-3 md:pr-8 flex justify-between md:justify-end gap-2">
        <div className="flex justify-center items-center gap-4 text-white pl-3 md:pl-0">
          <button className="text-[15px]">
            <Link to={"/login"}>Login</Link>
          </button>
          <button className="text-[15px]">
            <Link to={"/register"}>Register</Link>
          </button>
        </div>
        <div className="flex justify-end items-end gap-2">
          <IconButton sx={{ color: "#fff" }}>
            <WhatsApp />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <Instagram />
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <Facebook />
          </IconButton>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-[200]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <NavLink to="/" className="flex items-center">
              <img
                src={Logo}
                alt="Expresur Logo"
                className="h-12 w-1/2 object-contain"
              />
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-10">
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

            {/* Right Side */}
            <div className="flex items-center gap-4">

              {/* TRACKING BUTTON */}
              <NavLink to={"/rasterear"}>
                <button
                  className={` bg-green-800 hover:bg-[#035230] text-white w-32 md:w-52 text-[11px] md:text-[15px] md:font-bold md:px-6 py-2.5 rounded-full shadow-lg ${
                    location.pathname === "/rasterear"
                      ? "ring-2 ring-[#046838]"
                      : ""
                  }`}
                >
                  {t("rastrear")}
                </button>
              </NavLink>

              {/* DASHBOARD MAN ICON 🔥 */}
              <NavLink to="/dashboard" title="Dashboard">
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    bgcolor: "#046838",
                    cursor: "pointer",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 22, color: "#fff" }} />
                </Avatar>
              </NavLink>

              {/* Language Button */}
              <div className="hidden xl:block">
                <Button
                  onClick={toggleLang}
                  endIcon={<Language />}
                  className="text-gray-700 normal-case"
                >
                  {t("languageShort")}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="xl:hidden">
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  className="text-[#046838]"
                >
                  <MenuIcon />
                </IconButton>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="z-[200] fixed inset-0 bg-black bg-opacity-60 xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center">
              <img src={Logo} alt="Expresur" className="h-6" />

              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleLang}
                  startIcon={<Language />}
                  className="normal-case"
                >
                  {t("languageShort")}
                </Button>

                <IconButton onClick={() => setMobileMenuOpen(false)}>
                  <Close className="text-[#046838]" />
                </IconButton>
              </div>
            </div>

            <nav className="p-6 space-y-6">

              {/* HOME */}
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-xl font-bold ${
                    isActive ? "text-[#046838] underline" : "text-[#046838]"
                  }`
                }
              >
                {t("inicio")}
              </NavLink>

              {/* Top Nav Links */}
              {topNav.map((n) => (
                <NavLink
                  key={n.path}
                  to={n.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-semibold ${
                      isActive
                        ? "text-[#046838] underline"
                        : "text-gray-800 hover:text-[#046838]"
                    }`
                  }
                >
                  {t(n.key)}
                </NavLink>
              ))}

              {/* MOBILE MENU DASHBOARD ICON */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Avatar sx={{ bgcolor: "#046838" }}>
                    <PersonIcon sx={{ color: "#fff" }} />
                  </Avatar>
                  <div>
                    <p className="font-medium">Dashboard</p>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm text-green-800 hover:underline"
                    >
                      Go to Dashboard
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Social */}
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
