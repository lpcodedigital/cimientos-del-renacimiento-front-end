import React from "react";
import { useMap } from "@vis.gl/react-google-maps";

const ButtonResetMap: React.FC = () => {
    const map = useMap();

    const handleReset = () => {
        if (!map) return;
        map.setCenter({ lat: 20.96737, lng: -89.59259 });
        map.setZoom(8);
    };

    return (
        <button
            onClick={handleReset}
            title="Recentrar mapa"
            style={{
                position: "absolute",
                bottom: "24px",
                right: "12px",
                backgroundColor: "white",
                border: "none",
                borderRadius: "4px",
                width: "40px",
                height: "40px",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        </button>
    );
};

export default ButtonResetMap;