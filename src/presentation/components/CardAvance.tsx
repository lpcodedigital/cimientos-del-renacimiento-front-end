import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "../features/Avance/Avance.css"

type CardAvanceProps = {
    img?: string;
    title: string;
    porcentaje: number;
    descripcion: string;
}

const CardAvance: React.FC<CardAvanceProps> = ({img, title, porcentaje, descripcion}) => {
    return (
        <div className="card-avance-dashboard">
      <div className="card-avance-header">
        <img src={img} alt={title} className="card-avance-bg" />
        <h3 className="card-avance-title">{title}</h3>
      </div>

      <div className="card-avance-body">
        {/* Círculo de progreso con SVG */}
        <div className="circle-progress">
          <svg width="80" height="80">
            <circle cx="40" cy="40" r="35" stroke="#eee" strokeWidth="10" fill="none" />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="var(--color-dorado-institucional)"
              strokeWidth="10"
              fill="none"
              strokeDasharray="220"
              strokeDashoffset={220 - (220 * porcentaje) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="16" fill="#333">
              {porcentaje}%
            </text>
          </svg>
        </div>
        <p className="card-avance-desc">{descripcion}</p>
      </div>
    </div>



    )
}

export default CardAvance