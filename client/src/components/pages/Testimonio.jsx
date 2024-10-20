import React, { useState } from 'react';
import CarruselTestimonio from '../Carruseltest';
import "../assets/styles/Carrusel.css";



const Testimonios = () => {
  const [testimonios] = useState([
    { id: 29, nombre: 'Industrias experiment Carbons', texto: 'Gracias a nevada home energy mis clientes estan más felices.' },
    { id: 32, nombre: 'Grupo Celcia', texto: 'Nuestra plataforma de energía solar proporcionada por Nevada home, ayuda a reducir energía y mejorar la calidad de vida de millones de personas en mi localidad.!!' },
    { id: 36, nombre: 'Industrias experiment Carbons', texto: 'Gracias a nevada home energy mis clientes están más felices.!!' },
  ]);

  return (
    <div className="App">  
    <div className="titulo-testimonio">
      {testimonios.map((testimonio) => (
        <CarruselTestimonio key={testimonio.id} {...testimonio} />
      ))}
    
     </div>
  </div>
  );
};

export default Testimonios;
