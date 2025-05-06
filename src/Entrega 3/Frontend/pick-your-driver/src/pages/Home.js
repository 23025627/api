import React from 'react';
import styled from 'styled-components';
import Maps from '../components/Maps';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import imagemuberblack from '../assets/uber_black.png';
import imagemubercomfort from '../assets/uber_comfort.png';
import imagemuberx from '../assets/uber_x.png';


const HomeContainer = styled.div`

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
                    <h1 style={{fontSize: "16px", marginTop: "20px", marginBottom: "20px"}}>Planeje a sua próxima viagem com a nossa calculadora de preço.</h1>
                    <div class="col-md-6">
                        <h1 class="fs-5" style={{marginTop: "10px"}}>Nome</h1>
                        <input type="text" style={{width: "300px"}} />
                        <h1 class="fs-5" style={{marginTop: "10px"}}>E-mail</h1>
                        <input type="email" style={{width: "300px"}} />
                        <h1 class="fs-5" style={{marginTop: "10px"}}>Saindo de</h1>
                        <input type="text" style={{width: "300px"}} />
                        <h1 class="fs-5" style={{marginTop: "10px"}}>Indo Para</h1>
                        <input type="text" style={{width: "300px"}} />
                        <button type="button" class="btn btn-dark" style={{ fontWeight: "bold", margin: "0px", marginTop: "20px", display: "flex" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ver preços</button>
                    </div>
                    <div class="col-md-6">
                        <Maps />
                    </div>
                </div>
            </div>
            <div class="container py-4 py-xl-5">
                <div class="row mb-5">
                    <h2 style={{ textAlign: "left", marginTop: "20px", marginBottom: "20px", fontWeight: "bold"}}>De qual maneira são determinados os preços?</h2>
                    <h1 style={{fontSize: "16px", marginTop: "20px", marginBottom: "20px"}}>Veja algumas taxas e fatores que podem afetar o preço das corridas:</h1>
                </div>
                <div class="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                    <div class="col">
                        <div class="card">
                            <div class="card-body p-4" style={{height: "280px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="64" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
                                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                                <h4 class="card-title">Tarifa base</h4>
                                <p class="card-text">A tarifa base é determinada pela duração e pela distância de uma viagem.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-body p-4" style={{height: "280px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="64" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                                <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
                                </svg>
                                <h4 class="card-title">Taxa de operação</h4>
                                <p class="card-text">
                                    Em sua cidade, poderá ser aplicada uma taxa fixa a cada viagem, contribuindo para cobrir os custos operacionais, regulamentares e de segurança.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-body p-4" style={{height: "280px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="64" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
                            </svg>
                                <h4 class="card-title">Alta demanda</h4>
                                <p class="card-text">
                                    Quando o número de utilizadores excede o de motoristas disponíveis, os preços podem ser elevados temporariamente até que o equilíbrio entre oferta e demanda seja restabelecido.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Preços</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{width: "500px", height: "350px"}}>
                            Aqui estão os preços da corrida que você solicitou:
                            <div className="row align-items-center" style={{marginTop: "20px"}}>
                                <div className="col-auto">
                                    <img
                                        alt="Logo/imagem Uber X"
                                        src={imagemuberx}
                                        style={{width: "70px", height: "60px", marginTop: "15px", marginBottom: "15px"}}
                                    />
                                </div>
                                <div className="col">
                                    <p className="mb-0" style={{fontWeight: "bold"}}>UberX</p>
                                    <p className="mb-0">R$</p>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <img
                                        alt="Logo/imagem Uber Comfort"
                                        src={imagemubercomfort}
                                        style={{width: "71px", height: "68px", marginTop: "15px", marginBottom: "15px"}}
                                    />
                                </div>
                                <div className="col">
                                    <p className="mb-0" style={{fontWeight: "bold"}}>Uber Comfort</p>
                                    <p className="mb-0">R$</p>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <img
                                        alt="Logo/imagem Uber Black"
                                        src={imagemuberblack}
                                        style={{width: "70px", height: "60px", marginTop: "15px", marginBottom: "15px"}}
                                    />
                                </div>
                                <div className="col">
                                    <p className="mb-0" style={{fontWeight: "bold"}}>Uber Black</p>
                                    <p className="mb-0">R$</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark" data-bs-dismiss="modal" style={{ fontWeight: "bold", margin: "0px", marginTop: "20px", display: "flex" }}>Fechar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </HomeContainer>
    );
}

export default Home;