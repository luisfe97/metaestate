import React, { useEffect, useRef, useState } from "react";

import PointSphere from "../components/Three";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { ConnectButton } from "web3uikit";
import { connectWallet, mintNFT, getwalletTokens, getTokenMeta } from "../constants/web3.js";
import Eth from "../public/Eth.svg";
import Link from "next/link";

//contrato
import { abi, contractAddresses } from "../constants/pyto1/index";

export default function Home() {
  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const pryo1Address = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const toggleNav = () => {
    const menuButton = document.querySelector(".nav-toggler");
    const navigation = document.querySelector("nav");

    menuButton.classList.toggle("active");
    navigation.classList.toggle("active");
  };

  const [connected, setConnected] = useState(false);

  async function handleConnectWallet() {
    const result = await connectWallet();
    setConnected(result);
  }

  async function handleMintNFT() {
    const result = await mintNFT("MetaState45", "Phase1", "https://www.construyehogar.com/wp-content/uploads/2014/06/Plano-de-apartamento-peque%C3%B1o-moderno-Tiziana-Caroleo-en-Pinterest.jpg");
    console.log(result);
  }

  async function handleWallet() {
    const result = await getwalletTokens();
    return result;
  }
  async function Metadata() {
    const tokens = await handleWallet();
    const result = [];
    for (let i = 0; i < tokens.length; i++) {
      let number = parseInt(tokens[i]);
      result[i] = await getTokenMeta(parseInt(tokens[i]));
      console.log("image metadata=" + result[i][2]);
    }
    console.log(result);
    return result;
  }

  return (
    <>
      <header id="hero" className="header fixed-top">
        <Link href={`/`} passHref legacyBehavior>
          <a href="#" className="logo d-flex align-items-center scrollto me-auto me-lg-0">
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1>
              Meta<span>Estate</span>
            </h1>
          </a>
        </Link>
        <div className="conectbutton">
          <ConnectButton moralisAuth={false} />
        </div>
        <nav>
          <div className="menu-link-container menu-link-container-1">
            <Link href={`#`} passHref legacyBehavior>
              <a href="">Home</a>
            </Link>
          </div>
          <div className="menu-link-container menu-link-container-2">
            <Link href={`#onfocus`} passHref legacyBehavior>
              <a href="">Sobre Nosotros</a>
            </Link>
          </div>
          <div className="menu-link-container menu-link-container-3">
            <Link href={`#portfolio`} passHref legacyBehavior>
              <a href="#portfolio">Soluciones</a>
            </Link>
          </div>
          <div className="menu-link-container menu-link-container-4">
            <Link href={`#contact`} passHref legacyBehavior>
              <a href="">Contact</a>
            </Link>
          </div>
        </nav>

        <button type="button" aria-label="toggle curtain navigation" className="nav-toggler" onClick={toggleNav}>
          <span className="line l1" />
          <span className="line l2" />
          <span className="line l3" />
        </button>
      </header>
      <section className="animacion">
        <div className="d-flex justify-content-center align-items-center position-relative">
          <div className="upper-container">
            <div className="particulas">
              <PointSphere />
            </div>
            <div className="container d-flex flex-column justify-content-center align-items-center text-center position-absolute" data-aos="zoom-out">
              <h1>
                Meta<span>Estate</span>
              </h1>
              <p>Transformando ideas en soluciones tecnológicas, apoyando el crecimiento de proyectos en etapas tempranas.</p>
              <div className="scroll-down">
                Scroll down<div className="arrow"></div>
              </div>
            </div>
          </div>
          <div className="transition">
            <div className="lower-container">
              <div className="div1">El futuro de los bienes raíces está aquí </div>
              <p className="div2">by unrealengine</p>
            </div>
          </div>
          <div className="following-content">
            <h1>¡Bienvenido!</h1>
          </div>
        </div>
      </section>

      <section id="onfocus" className="onfocus">
        <div className="container-fluid p-0" data-aos="fade-up">
          <div className="row g-0">
            <div className="col-lg-6 video-play position-relative">
              <Link href="https://drive.google.com/file/d/1AH00e4DIXfvNIaDN3TJmdLhPdhZz4VSs/view?usp=share_link" target="_blank" passHref legacyBehavior>
                <a href="" target="_blank" className="glightbox play-btn" />
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="content d-flex flex-column justify-content-center h-100">
                <h3>Sobre Nosotros</h3>
                <p className="fst-italic">
                  Metaestate ofrece soluciones inmobiliarias en tiempo real impulsadas por Unreal Engine, revolucionando la forma en que se desarrollan y venden propiedades. Desde visualizaciones esclarecedoras en la etapa de planificación hasta experiencias de ventas interactivas y personalizadas, nuestras soluciones están cambiando radicalmente la cara de los bienes raíces. ¿Qué nos diferencia de la competencia? Agregamos tecnología blockchain a nuestra solución de gemelos digitales, lo que
                  garantiza la seguridad, la transparencia y la inmutabilidad de todos los datos y transacciones en el proceso de transferencia de propiedad. Además, nuestros procesos de ventas interactivos y las experiencias web de alta fidelidad permiten a los compradores hacer selecciones a su propio ritmo y ver exactamente lo que obtendrán en contexto, abriendo el potencial de ventas a nivel global.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="portfolio" className="portfolio" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2>Soluciones</h2>
            <p>Echemos un vistazo a algunos casos de éxito que crecieron con nosotros.</p>
          </div>
        </div>
        <div className="container-fluid" data-aos="fade-up" data-aos-delay={200}>
          <div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order">
            {/* End Portfolio Filters */}
            <div className="row portfolio-container" data-aos="fade-up" data-aos-delay={500}>
              <div className="portfolio-item filter-app">
                <div className="cards d-flex row justify-content-between ">
                  <div className="d-flex row justify-content-center containers mt-5">
                    <div className="col-lg-4 col-mg-6-col-sm-10 img-card m-2">
                      <img src="/Imagen1.jpg" alt="" />
                    </div>
                    <div className="col-lg-4 col-mg-6-col-sm-10 info m-2">
                      <h2>Hiperrealismo</h2>
                      <p>Llevar proyectos en etapas iniciales a un concepto digital hipereal, Metaestate ayuda a solucionar este problema con visualizaciones claras e interactivas que permiten a los clientes ver exactamente lo que están comprando.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Portfolio Item */}
              <div className="portfolio-item filter-product">
                <div className="cards d-flex row justify-content-between ">
                  <div className="d-flex row justify-content-center containers mt-5">
                    <div className="col-lg-4 col-mg-6-col-sm-10 info m-2">
                      <h2>Mejorar cierre de ventas</h2>
                      <p> La tecnología de Metaestate ayuda a solucionar este problema al proporcionar experiencias de ventas personalizadas e interactivas, lo que permite a los compradores hacer selecciones a su propio ritmo y ver exactamente lo que obtendrán.</p>
                    </div>
                    <div className="col-lg-4 col-mg-6-col-sm-10 img-card m-2">
                      <img src="/Imagen2.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              {/* End Portfolio Item */}
              <div className="portfolio-item filter-app">
                <div className="cards d-flex row justify-content-between ">
                  <div className="d-flex row justify-content-center containers mt-5">
                    <div className="col-lg-4 col-mg-6-col-sm-10 img-card m-2">
                      <img src="/Imagen3.jpg" alt="" />
                    </div>
                    <div className="col-lg-4 col-mg-6-col-sm-10 info m-2">
                      <h2>blockchain adaptada a Realestate</h2>
                      <p>Investigando para este proyecto nos encontramos con varios referentes, extraidos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="">
        <div className="section-header">
          <h2>Casos de Estudio</h2>
          <p>Extraidos de unrealengine </p>
        </div>
        <div className="row g-3">
          <div className="col-lg-4">
            <div className="card">
              <img className="card-img-top" src="https://cdn2.unrealengine.com/pureblink-1920x1080-e787bddebaa5.jpg?resize=1&w=400" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">RESIDENTIAL</h5>
                <p className="card-text">Pureblink uses Unreal Engine to visualize real estate</p>
                <Link href="https://www.youtube.com/watch?v=1L8Zl1djnOw" target="_blank" passHref legacyBehavior>
                  <a href="" target="_blank" className="btn1">
                    WATCH NOW
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img className="card-img-top" src="https://cdn2.unrealengine.com/spotlight-imerza-blog-body-image-6-1640x1000-242019902.jpg?resize=1&w=400" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">MIXED USE</h5>
                <p className="card-text">IMERZA transforms real-estate visualization with an XR-based digital twin</p>
                <Link href="https://www.unrealengine.com/en-US/spotlights/transforming-real-estate-visualization-with-an-xr-based-digital-twin-of-tampa" target="_blank" passHref legacyBehavior>
                  <a href="" target="_blank" className="btn1">
                    FIND OUT MORE
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img className="card-img-top" src="https://cdn2.unrealengine.com/buildmedia-balcony-1913x1076-44284fb2e62f.jpg?resize=1&w=400" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">RESIDENTIAL</h5>
                <p className="card-text">Buildmedias real-time technology helps buyers fall in love with unbuilt homes</p>
                <Link href="https://www.unrealengine.com/en-US/spotlights/real-time-technology-helps-buyers-fall-in-love-with-unbuilt-homesw" passHref legacyBehavior>
                  <a href="" target="_blank" className="btn1">
                    READ NOW
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="following-content2">
        <div className="section-header">
          <h2>Funcionalidad Web 3</h2>
          <p>obten un NFT de prueba.</p>
        </div>
        <div className="NFT">
          {isWeb3Enabled ? (
            <>
              <div className="cards d-flex row justify-content-between ">
                <div className="d-flex row justify-content-center containers mt-5">
                  <div className="col-lg-4 col-mg-6-col-sm-10 img-card m-2">
                    <div onClick={handleMintNFT} className="glightbox">
                      <img src="/NFT.png" alt="" />
                      <div className="overlay">
                        <div className="text">Become a digital owner</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-mg-6-col-sm-10 info m-2">
                    <h2> digital owner By Metaestate</h2>
                    <p>Item de prueba creado por MetaEstate</p>
                    <div className="col-md-6 col-8 ">
                      <img src={Eth.src} width={20} className="mr-5" />
                      ETH 0.1
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="conectbutton">
              <ConnectButton moralisAuth={false} />
            </div>
          )}
        </div>
      </section>
      <section id="contact">
        <div className="section-header">
          <h2>Contactanos</h2>
        </div>

        <div className="contact">
          <div className="tiles-container abs-center">
            <Link href="https://www.linkedin.com/in/nicole-geraldine-guzman-garc%C3%ADa-58958a17a/" target="_blank" passHref legacyBehavior>
              <a href="" target="_blank" className="contact-tiles facebook">
                LINKEDIN
              </a>
            </Link>
            <Link href="https://www.instagram.com/daniluquetv/" target="_blank" passHref legacyBehavior>
              <a href="" target="_blank" className="contact-tiles instagram">
                INSTAGRAM
              </a>
            </Link>
            <Link href="mailto: business@contract-sol.com" passHref legacyBehavior>
              <a href="" target="_blank" className="contact-tiles email">
                E-MAIL
              </a>
            </Link>
            <Link href="https://wa.me/+573208949771" target="_blank" passHref legacyBehavior>
              <a href="https://wa.me/+573208949771" target="_blank" className="contact-tiles telephone">
                WHATSAPP
              </a>
            </Link>
          </div>
        </div>
      </section>

      <footer id="footer" className="footer">
        <div className="footer-legal text-center">
          <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <div className="copyright">
                © Copyright{" "}
                <strong>
                  <span>Metaestate</span>
                </strong>
                . All Rights Reserved
              </div>
              <div className="credits">
                {/* All the links in the footer should remain intact. */}
                {/* You can delete the links only if you purchased the pro version. */}
                {/* Licensing information: https://bootstrapmade.com/license/ */}
                {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/herobiz-bootstrap-business-template/ */}
                By <a href="https://blockfy.app/">Blockfy SAS - Colombia</a>
              </div>
            </div>
            <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
              <Link href="https://www.instagram.com/daniluquetv/" target="_blank" passHref legacyBehavior>
                <a href="#" target="_blank" className="instagram">
                  <i className="bi bi-instagram" />
                </a>
              </Link>
              <Link href="https://www.linkedin.com/in/nicole-geraldine-guzman-garc%C3%ADa-58958a17a/" target="_blank" passHref legacyBehavior>
                <a href="#" className="linkedin">
                  <i className="bi bi-linkedin" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
