import type { CursoPublicDTO } from "../../domain/models/Curso";
import "../styles/CursoCard.css"
import formatDate from "./utils/formatDate";

type CursoCardProps = {
    curso: CursoPublicDTO;
    onClick: (curso: CursoPublicDTO) => void;
}

const CursoCard: React.FC<CursoCardProps> = ({ curso, onClick }) => (
    
  <div className="curso-card" onClick={() => onClick(curso)}>
  <img
    src={curso.coverImageUrl || "/portada-base.jpg"}
    alt={curso.title}
    loading="lazy"
    className="curso-img"
  />
  <div className="curso-info">
    <h3>{curso.title}</h3>
    <p>{curso.municipalityName}</p>
    {formatDate(curso.courseDate.toString())}
  </div>
</div>

);
export default CursoCard;
