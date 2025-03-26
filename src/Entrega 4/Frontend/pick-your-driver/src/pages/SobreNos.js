import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const SobreNosContainer = styled.div`
    @media only screen and (min-width: 1201px){
        width: 100%;
    }
    @media (max-width: 1200px) and (min-width: 1025px){
        width: 100%;
    } 
    @media (max-width: 1024px) and (min-width: 769px){
        width: 100%;
    } 
    @media (max-width: 768px) and (min-width: 481px){
        width: 100%;
    } 
    @media (max-width: 480px) and (min-width: 320px){
        width: 100%;
    } 
`

function SobreNos(){
    return(
        <SobreNosContainer>
            <NavBar />
            <Footer />
        </SobreNosContainer>
    );
}

export default SobreNos;