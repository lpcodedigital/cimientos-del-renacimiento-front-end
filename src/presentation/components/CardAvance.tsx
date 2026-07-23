import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "../features/Avance/Avance.css"

type CardAvanceProps = {
    img?: string;
    title: string;
    porcentaje: number;
    descripcion: string;
}

const CardAvance: React.FC<CardAvanceProps> = ({ img, title, porcentaje, descripcion }) => {
    return (
        <div className="card-avance-dashboard-rectangle">
            {/* Left section - 40% */}
            <div className="card-avance-left">
                <div className="card-avance-content">
                    <h3 className="card-avance-title">{title}</h3>
                    <p className="card-avance-desc">{descripcion}</p>
                </div>
            </div>

            {/* Right section - 60% */}
            <div className="card-avance-right">
                <div className="progress-bar-container">
                    <div className="progress-bar-track">
                        <div 
                            className="progress-bar-fill"
                            style={{ width: `${porcentaje}%` }}
                        />
                    </div>
                    <span className="progress-percentage">{porcentaje}%</span>
                </div>
            </div>
        </div>
    );
};

export default CardAvance