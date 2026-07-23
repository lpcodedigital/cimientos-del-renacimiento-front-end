import React from "react";
import { Card } from "react-bootstrap";
import "../../presentation/features/Ejes/Ejes.css"
type CardEjeProps = {
    title: string,
    description: string
}
const CardEje: React.FC<CardEjeProps> = ({title, description}) => {
    return (
        <Card className="card-eje" style={{ width: '100%', maxWidth: '800px' }}>
            <Card.Body>
                <Card.Title className="card-eje-title">{title}</Card.Title>
                <Card.Text className="card-eje-description">
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardEje;