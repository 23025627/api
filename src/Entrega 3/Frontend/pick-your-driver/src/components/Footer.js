import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;
`

function Footer(){
    return(
        <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item" ><StyledLink to="/"><a class="nav-link px-2 text-body-secondary" aria-current="page">Início</a></StyledLink></li>
            <li class="nav-item"><StyledLink to="/sobreprojeto"><a class="nav-link px-2 text-body-secondary">Sobre o Projeto</a></StyledLink></li>
            <li class="nav-item"><StyledLink to="/sobrenos"><a class="nav-link px-2 text-body-secondary">Sobre Nós</a></StyledLink></li>
        </ul>
        <p class="text-center text-body-secondary">© 2025 Pick Your Driver by Daniel Baptista, Fabio Spindola, Fabricio Nascimento, Leonardo de Souza is licensed under Creative Commons Attribution 4.0 Internationa</p>
        </footer>
    );
}

export default Footer;