import React, { useState, useEffect } from "react";
import styles from "./ScrollToTopButton.module.scss"; 

export default function ScrollToTopButton()  {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Écouteur d'événement pour détecter le scroll
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Nettoyage de l'écouteur d'événement lors du démontage du composant
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Affiche ou masque le bouton en fonction de la position du scroll
    if (window.scrollY > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Fonction pour remonter en haut de la page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll fluide
    });
  };

  return (
    <div className={`${styles.scrollToTopButton} ${isVisible ? styles.visible : ""}`}>
      <button onClick={scrollToTop}>
        <i className="la la-chevron-up"></i>
      </button>
    </div>
  );
};

