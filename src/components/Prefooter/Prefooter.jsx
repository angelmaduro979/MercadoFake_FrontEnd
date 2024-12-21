import React from 'react'
import './Prefooter.css'
import Payment from '../../assets/icons/payment.svg?react'
import Shipping from '../../assets/icons/shipping.svg?react'
import Protected from '../../assets/icons/protected.svg?react'

const Prefooter = () => {
  return (
    <div className="info-container">
      <div className="info-section">
        
        <div className="info-card">
        <Payment className="icon" />
          <h3>Elegí cómo pagar</h3>
          <p>Podés pagar con tarjeta, débito, efectivo o con Cuotas sin Tarjeta.</p>
          <a href="#">Cómo pagar tus compras</a>
        </div>
        <div className="info-card">
          <Shipping className="icon" />
          <h3>Envío gratis desde $ 30.000</h3>
          <p>
            Solo por estar registrado en Mercado Libre tenés envíos gratis en miles de productos.
            Es un beneficio de Mercado Puntos.
          </p>
        </div>
        <div className="info-card">
          <Protected className="icon" />
          <h3>Seguridad, de principio a fin</h3>
          <p>
            ¿No te gusta? ¡Devolvelo! En Mercado Libre, no hay nada que no puedas hacer, porque
            estás siempre protegido.
          </p>
          <a href="#">Cómo te protegemos</a>
        </div>
      </div>


      <div className="additional-info">
        <div className="info-box">
          <h4>Botón de arrepentimiento</h4>
          <a href="#">Cancelar una compra</a>
          <a href="#">Cancelar una suscripción</a>
          <a href="#">Cancelar un seguro o garantía</a>
        </div>
        <div className="info-box">
          <h4>Conoce las normas que aplican cuando compras</h4>
          <a href="#">
            Ver contratos de adhesión - Ley N.º 24.240 de Defensa del Consumidor
          </a>
        </div>
      </div>


      <footer className="footer">
        <span>📧 ayuda@mercadolibre.com.ar</span>
        
      </footer>
    </div>
  )
}

export default Prefooter