  /**
   * fonction permettant de géolocaliser l'utilisateur grâce à son navigateur et l'utilisation de l'objet JavaScript navigator
   * la propriété geolocation permet d'utilisaer la méthode watchPosition() et obtenir la position de l'utilisateur et de surveiller si elle change
   * elle prend en paramètre deux fonctions, une de success et l'autre d'erreur
   * dans la première, on récupère la latitude et longitude
   *
   * @return
   */
  export default function getUserLocation ()  {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };