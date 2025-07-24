import type { CursoElement } from "../../domain/models/Curso";
import "../styles/CursoCard.css"
import formatDate from "./utils/formatDate";

type CursoCardProps = {
    curso: CursoElement;
    onClick: (curso: CursoElement) => void;
}

const CursoCard: React.FC<CursoCardProps> = ({ curso, onClick }) => (
    
  <div className="curso-card" onClick={() => onClick(curso)}>
  <img
    src={curso.imagenes[0].url}
    alt={curso.nombre}
    loading="lazy"
    className="curso-img"
  />
  <div className="curso-info">
    <h3>{curso.nombre}</h3>
    <p>{curso.municipio}</p>
    {formatDate(curso.fecha.toString())}
  </div>
</div>

);
export default CursoCard;
