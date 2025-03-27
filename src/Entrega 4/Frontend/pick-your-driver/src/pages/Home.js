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
            <div class="container">
                <div class="row">
                    <h1 style={{fontSize: "14px"}}>Planeje a sua próxima viagem com a nossa calculadora de preço.</h1>
                    <div class="col-md-6">
                        <h1 class="fs-5" style={{marginTop: "10px"}}>Nome</h1>
                        <input type="text" style={{width: "300px"}} />
                        <h1 class="fs-5" style={{marginTop: "10px"}}>E-mail</h1>
                        <input type="text" style={{width: "300px"}} />
                        <h1 class="fs-5" style={{marginTop: "10px"}}>Saindo de</h1>
                        <input type="text" style={{width: "300px"}} />
                        <h1 class="fs-5" style={{marginTop: "10px"}}>Indo Para</h1>
                        <input type="text" style={{width: "300px"}} />
                        <button type="button" class="btn btn-dark" style={{ fontWeight: "bold", margin: "0px", marginTop: "20px", display: "flex" }}>Ver preços</button>
                    </div>
                    <div class="col-md-6">
                        <iframe allowfullscreen frameborder="0" src="https://cdn.bootstrapstudio.io/placeholders/map.html" width="100%" height="100%"></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </HomeContainer>
    );
}

export default Home;