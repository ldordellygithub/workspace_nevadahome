


import React from "react";
import {useState} from 'react';

import  "./assets/styles/Carrusel.css";

function  CarruselTestimonio(props){

    //   funcion  para controlar  los  gustas  de  este  component y  la  animacion

    const [likes, setLikes] = useState(0);
    const [animate,setAnimate] = useState(false);


    // funcion para  incrementar  los  likes

    const handleLike = () => {
        setLikes(likes + 1);
        setAnimate(true);

        setTimeout(() => {
            setAnimate(false);
        }, 1000); // animacion  de 1 segundo  para  desaparecer el like  y  volver a 0
    }

    
    return (

        <div className="content-saludo">
        <img
        className="imagen-principal"  alt="logo-pt"
        src={(`https://randomuser.me/api/portraits/men/${props.id}.jpg`)} />
        <div className="content-text-saludo">
            <h3 className="titulo">"<strong>{props.nombre}</strong>"</h3>
            <p className="texto-introduccion"> {props.texto}</p>       
            <div className="iconos-interaccion">

            <div className="like-section" onClick={handleLike}>
                <i className= {`fa-regular fa-heart ${animate ? 'raining': ''}`}></i>
                <span className="likes-count">{likes}</span>
                </div>

            <i className="fa-regular fa-comment"></i>

            <i className="fa-regular fa-envelope"></i>
        </div>
        </div>
    </div>

    );

}

export default CarruselTestimonio;