import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
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

function Home(){
    return(
        <HomeContainer>
            <NavBar />
            <div class="text-center p-4 p-lg-5">
                <h1 class="fw-bold mb-4">Nunca foi tão fácil comparar os preços das suas corridas</h1>
            </div>
            <Footer />
        </HomeContainer>
    );
}

export default Home;