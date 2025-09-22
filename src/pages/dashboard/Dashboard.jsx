import React from "react";
import "./Dashboard.scss";
import Header from "../../components/Header";
import LogoDash from "../../assets/LogoDash.png";
import { useNavigate, useLocation } from "react-router-dom";

import ChartSvg from "../../assets/Chart.svg";
import BuySvg from "../../assets/Buy.svg";
import DocumentSvg from "../../assets/Document.svg";
import ChatSvg from "../../assets/Chat.svg";
import SettingSvg from "../../assets/Setting.svg";
import ProfileSvg from "../../assets/Profile.svg";
import InfoSquareSvg from "../../assets/Info Square.svg";

import { logout as authLogout } from "../../services/auth";

export default function Dashboard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard", src: ChartSvg },
    { key: "vendas", label: "Vendas", path: "/vendas", src: BuySvg },
    { key: "produtos", label: "Produtos", path: "/produtos", src: DocumentSvg },
    { key: "materiais", label: "Materiais", path: "/materiais", src: ChatSvg },
  ];

  const outros = [
    { key: "config", label: "Configurações", path: "/config", src: SettingSvg },
    { key: "usuarios", label: "Usuários", path: "/usuarios", src: ProfileSvg },
    { key: "empresas", label: "Empresas", path: "/empresas", src: InfoSquareSvg },
    { key: "sair", label: "Sair", path: "/sair", src: InfoSquareSvg }, 
  ];

  const isActive = (path) => location.pathname === path;

  function handleNav(item) {
    if (!item) return;

    if (item.key === "produtos") {
      navigate(item.path);
      return;
    }

    if (item.key === "sair") {
      try {
        authLogout();
      } catch (e) {
      
      }
      navigate("/login");
      return;
    }

  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-top">
          <img src={LogoDash} alt="MeuGestor" className="logo-img" />
          <span className="logo-text">MeuGestor</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main menu">
          <h4>MENU</h4>
          <ul>
            {menu.map((m) => (
              <li
                key={m.key}
                className={`item ${isActive(m.path) ? "active" : ""}`}
                onClick={() => handleNav(m)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") handleNav(m); }}
              >
                <span className="icon" aria-hidden>
                  <img src={m.src} alt={m.label} className="icon-img" />
                </span>
                <span className="label">{m.label}</span>
              </li>
            ))}
          </ul>

          <h4>OUTROS</h4>
          <ul className="outros">
            {outros.map((o) => (
              <li
                key={o.key}
                className={`item ${o.key === "sair" ? "logout" : ""} ${isActive(o.path) ? "active" : ""}`}
                onClick={() => handleNav(o)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") handleNav(o); }}
              >
                <span className="icon" aria-hidden>
                  <img src={o.src} alt={o.label} className="icon-img" />
                </span>
                <span className="label">{o.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="main">
        <Header />
        <main className="content">
          {children ? children : <div className="page-empty">DashBoard</div>}
        </main>
      </div>
    </div>
  );
}
