// src/hooks/useScrollTo.ts
import { useNavigate, useLocation } from "react-router-dom";

export const useScrollTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = -100; // ajusta según tu navbar
        const y = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 300);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return scrollToId;
};
