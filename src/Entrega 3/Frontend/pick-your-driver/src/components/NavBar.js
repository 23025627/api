import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import Logo from '../assets/logo_fundo_transparente.png';

const NavBarContainer = styled.div``;

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Alterna o menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fecha menu ao clicar num link
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <NavBarContainer>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          {/* Logo e título */}
          <NavLink to="/" className="navbar-brand" end onClick={closeMenu}>
            <img src={Logo} alt="Logo" width="75" height="60" />
          </NavLink>
          <span className="navbar-brand fw-bold">Pick Your Driver</span>

          {/* Botão toggle do menu */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu colapsável */}
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  onClick={closeMenu}
                >
                  Início
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/sobreprojeto"
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  onClick={closeMenu}
                >
                  Sobre o Projeto
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/sobrenos"
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                  onClick={closeMenu}
                >
                  Sobre Nós
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </NavBarContainer>
  );
}

export default NavBar;
