// src/components/Header.jsx
import React from "react";
import "../components/Header.scss";

import lupa from "../assets/lupa.svg";
import chevronDown from "../assets/chevron_down.svg";
import notifIcon from "../assets/Notif Icon.svg";
import notifSign from "../assets/Notif Sign.svg";
import burgerPng from "../assets/Emoticon.png";

import { getUser } from "../services/auth"; // agora usa o service para ler o user

export default function Header() {
  const user = getUser() || {};
  const name = user?.name || "Usuário";

  const initials = (name || "")
    .split(" ")
    .map((s) => (s ? s[0] : ""))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="greeting">
          <div className="avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={name} />
            ) : (
              <span className="initials">{initials}</span>
            )}
          </div>

          <div className="greeting-text">
            <div className="hello-inline">
              <span className="hello">Olá,</span>
              <strong className="user-name">{name}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="search-wrapper" role="search" aria-label="Pesquisar">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            aria-label="Campo de busca"
          />
          <button className="search-button" aria-label="Buscar">
            <img src={lupa} alt="Buscar" />
          </button>
        </div>
      </div>

      <div className="header-right">
        <div className="company" role="button" tabIndex={0} aria-label="Empresa">
          <div className="company-pill" aria-hidden="true">
            <img src={burgerPng} alt="Hambúrguer" className="company-burger" />
          </div>

          <div className="company-name">
            Delicious Burger
            <img src={chevronDown} alt="" className="chev-icon" aria-hidden="true" />
          </div>
        </div>

        <button className="notif" aria-label="Notificações">
          <img src={notifIcon} alt="Notificações" className="notif-icon" />
          <img src={notifSign} alt="" className="notif-sign" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
