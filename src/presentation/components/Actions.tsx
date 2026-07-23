import React from "react";
import { useNavigate } from "react-router-dom";
import imgObrasLocal from "../../assets/img/obras.jpg"
import imgCursosLocal from "../../assets/img/cursos.jpg"

export const Actions: React.FC = () => {
    const navigate = useNavigate();

    // URLs de imágenes de stock representativas (puedes cambiarlas por recursos locales de tu monorepo)
    const imgObras = imgObrasLocal; // Reemplaza con la ruta correcta a tu imagen de obras públicas
    const imgCursos = imgCursosLocal; // Reemplaza con la ruta correcta a tu imagen de cursos

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "32px", // Aumentamos el espacio entre tarjetas
                margin: "40px 0",
                padding: "0 16px",
                boxSizing: "border-box"
            }}
            className="actions-container-row"
        >
            {/* 🚧 Tarjeta de Obras Públicas */}
            <button
                onClick={() => navigate("/Obras")}
                style={{
                    width: "100%",
                    maxWidth: "340px",
                    minHeight: "180px",
                    height: "auto",
                    // Capa dual: El gradiente oscuro abajo garantiza legibilidad del texto blanco
                    backgroundImage: `linear-gradient(to top, rgba(144, 27, 69, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 100%), url(${imgObras})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#ffffff",
                    padding: "20px", // Espacio interno
                    borderRadius: "16px", // Esquinas más modernas y suaves
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end", // Empuja todo el contenido abajo
                    alignItems: "flex-start", // Alinea todo a la izquierda
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", // Animación más fluida
                    outline: "none",
                    position: "relative",
                    overflow: "hidden",
                    wordWrap: "break-word",
                    whiteSpace: "normal"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)"; // Se eleva un poco más al ser más grande
                    e.currentTarget.style.boxShadow = "0px 12px 25px rgba(144, 27, 69, 0.3)"; // Brillo guinda
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.15)";
                }}
            >
                <p style={{ margin: 0,  fontSize: "clamp(16px, 2.5vw, 18px)", fontWeight: "bold", textAlign: "left", fontFamily: "Arial, sans-serif",  lineHeight: "1.4",
                    wordBreak: "break-word" }}>
                    {/* <span style={{ fontSize: "35px" }}>🚧</span>  */}
                    Ver Obras Públicas
                </p>
            </button>

            {/* 🎓 Tarjeta de Capacitaciones y Talleres */}
            <button
                onClick={() => navigate("/CursosPage")}
                style={{
                    width: "100%",
                    maxWidth: "340px",
                    minHeight: "180px",
                    height: "auto",
                    // Capa dual: El gradiente oscuro abajo combina con tu morado institucional
                    backgroundImage: `linear-gradient(to top, rgba(124, 58, 237, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 100%), url(${imgCursos})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#ffffff",
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    outline: "none",
                    position: "relative",
                    overflow: "hidden",
                    wordWrap: "break-word",
                    whiteSpace: "normal"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0px 12px 25px rgba(124, 58, 237, 0.3)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.15)";
                }}
            >
                <p style={{
                    margin: 0,
                    fontSize: "clamp(16px, 2.5vw, 18px)",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontFamily: "Arial, sans-serif",
                    lineHeight: "1.4",
                    wordBreak: "break-word"
                }}>
                    Ver Capacitaciones
                </p>
            </button>
        </div>
    );
};

export default Actions;