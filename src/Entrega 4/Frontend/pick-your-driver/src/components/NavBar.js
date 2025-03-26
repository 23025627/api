import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import Logo from '../assets/logo_fundo_transparente.png';

const NavBarContainer = styled.div`

`
const StyledLink = styled(Link)`
    text-decoration: none;
`

function NavBar(){
    return(
        <NavBarContainer>
            <nav class="navbar navbar-expand-lg bg-body-secondary">
                <div class="container-fluid">
                    <a class="navbar-brand"><img src={Logo} alt="Logo" width="75" height="60"/></a><a class="navbar-brand fw-bold ">Pick Your Driver</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <StyledLink to="/"><a class="nav-link active" aria-current="page">Início</a></StyledLink>
                        </li>
                        <li class="nav-item">
                        <StyledLink to="/sobreprojeto"><a class="nav-link active">Sobre o Projeto</a></StyledLink>
                        </li>
                        <li class="nav-item">
                        <StyledLink to="/sobrenos"><a class="nav-link active">Sobre Nós</a></StyledLink>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </NavBarContainer>
    );
}

export default NavBar;