import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import styles from "./MapOfGoogle.module.scss";
import { detailsPlace } from "../../../apis/mapOfGoogle";
import Loading from "../../../components/Loading/Loading2";
import getUserLocation from "../../../components/userLocation/GetUserLocation";
import StarRating5 from "../../../components/RatingStar/StarRating5";
import ScrollToTopButton from "../../../components/ScrollToTop/ScrollToTopButton";
import TruncatedText from "../../../components/TruncatedText/TruncatedText";
import defaultImage from "../../../assets/png/logo-google-maps-2017.png";

export default function MapOfGoogle() {
  const [userLocation, setUserLocation] = useState(null); // Stocke la position géographique de l'utilisateur pour initiliser le centre de la map
  const [places, setPlaces] = useState([]); // Stocke les lieux à proximité.
  const [selectedPlace, setSelectedPlace] = useState(null); //Stocke le lieu sélectionné.
  //const placeRefs = useRef([]); // sert à stocker les références aux éléments DOM des lieux dans la liste affichée (utile pour le défilement jusqu'au lieu lorsqu'on clic sur la map)
  const [clickedPlaceIndex, setClickedPlaceIndex] = useState(null);
  const [clickedPlaces, setClickedPlaces] = useState([]);
  const [noticeAppearsOnClick, setNoticeAppearsOnClick] = useState(false);
  const [openingsAppearsOnClick, setOpeningsAppearsOnClick] = useState(false);

  //// dès que places change d'état, crée une copie du tableau places et l'affecte à la variable d'état clickedPlaces, afin de s'assurer que les deux variables ont des références distinctes et que les mutations dans l'un n'affectent pas l'autre.
  useEffect(() => {
    setClickedPlaces([...places]);
  }, [places]);

  /**
   * Méthode asynchrone qui permet de rechercher des lieux à proximité de la localisation de l'utilisateur.
   * Stocke ces lieux dans la variable d'état "places".
   * L'appel à l'api se fait dans apis/mapOfGoogle
   *
   * @param {*} location
   */
  const searchNearbyPlace = async (location) => {
    try {
      //console.log(location);
      const data = await detailsPlace(location, { language: "fr" });
      setPlaces(data);
    } catch (error) {
      console.error("Error searching for places:", error);
    }
  };

  /** @type {*}
   * useLoadScript est fourni par @react-google-maps/api qui charge de manière asynchrone la bibliothèque Google Maps en utilisant une clé d'API.
   * la clé api est stocké dans le ".env" (cf dotenv-react)
   */
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  /** @type {*}
   * Dès que la map Google est chargée (useEffect), on récupère la position de l'utilisateur avec "getUserLocation()"
   * Si la position est récupérée on met à jour userLocation avec la position exacte
   * et on appelle la fonction "searchNearbyPlace()"
   */
  useEffect(() => {
    if (isLoaded) {
      getUserLocation()
        .then((location) => {
          setUserLocation(location);
          searchNearbyPlace(location);
        })
        .catch((error) => {
          console.error("Error getting user location:", error);
        });
    }
  }, [isLoaded]);

  /**
   * Permet de mettre à jour selectedPlace avec le lieu survoler
   *
   * @param {*} place info sur le lieu survolé
   */
  const handleMarkerMouseOver = (place) => {
    setSelectedPlace(place);
  };

  /**
   * Récupére l'index du lieu cliqué.
   * Puis selectionne l'élèment correspondant à l'index avec useRef.
   * Effectue le défilement jusqu'à l'élèment correspondant
   * @param {*} place info sur le lieu cliqué
   */
  const handleMarkerClick = (place) => {
    /** @type {*} permet de comparer chaque place_id du tableau places avec le place_id du lieu cliqué et renvoi la position de cet élément dans le tableau "places" */
    const index = places.findIndex((p) => p.place_id === place.place_id);
    setClickedPlaceIndex(index);
  };

  return (
    <div>
      <div className={`${styles.app}`}>
        {!isLoaded ? (
          <Loading />
        ) : (
          <>
            <GoogleMap
              mapContainerClassName={`${styles.mapContainer} animate__animated animate__flipInY animate__slower mt-3`}
              center={userLocation}
              zoom={12}
              style={{ width: "50%", height: "100vh" }}
            >
              {selectedPlace && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.geometry.location.lat + 0.0035,
                    lng: selectedPlace.geometry.location.lng,
                  }}
                  onCloseClick={() => {
                    setSelectedPlace(null);
                    setClickedPlaceIndex(null);
                  }}
                >
                  <div className={`${styles.infoWindow2} text-center`}>
                    <div>{selectedPlace.name}</div>
                    {selectedPlace.rating && (
                      <div>Note : {selectedPlace.rating}/5</div>
                    )}
                  </div>
                </InfoWindow>
              )}
              {places.map((place) => (
                <div key={place.place_id}>
                  <Marker
                    position={{
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    }}
                    icon={{
                      url: require("./../../../assets/svg/location_marker.svg")
                        .default,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    onMouseOver={() => handleMarkerMouseOver(place)}
                    onTouchStart={() => handleMarkerMouseOver(place)}
                    onClick={() => handleMarkerClick(place)}
                  />
                </div>
              ))}
            </GoogleMap>
          </>
        )}
      </div>
      <div>
        {clickedPlaces
          .sort((a, b) => {
            if (clickedPlaceIndex !== null) {
              if (a.place_id === places[clickedPlaceIndex].place_id) return -1;
              if (b.place_id === places[clickedPlaceIndex].place_id) return 1;
            }
            return 0;
          })
          .map((place, i) => (
            <div
              key={i}
              className={`${styles.cart} flex-column mt-3 `}
              id={`place-${place.id}`}
              style={{ order: clickedPlaceIndex === i ? -1 : i }}
            >
              <div className="row justify-content-center">
                {place.photos ? (
                  <div className="col-lg-5 col-md-5 col-sm-12">
                    <img
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&maxheight=600&photo_reference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                      alt={`${place.name}`}
                      className="rounded mx-auto d-block"
                    />
                  </div>
                ) : (
                  <div className="col-lg-5 col-md-5 col-sm-12 ">
                    <img
                      src={defaultImage}
                      alt="default google map"
                      className="rounded mx-auto d-block opacity-50"
                    ></img>
                  </div>
                )}
                <div
                  className={`${styles.carte} col-lg-7 col-md-7 col-sm-12 animate__animated animate__jackInTheBox animate__slower`}
                >
                  <div className="d-flex flex-column ">
                    <a
                      className={`${styles.decoNone} ${styles.cursorItineraire} `}
                      href={place.details.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2 className=" text-center p-1">{place.name}</h2>
                      <p className={` text-center`}>{place.vicinity}</p>
                    </a>
                    <a
                      href={`tel:${place.details.formatted_phone_number}`}
                      className={`text-center ${styles.cursorPhone} ${styles.decoNone} pt-2 decoNone`}
                    >
                      {place.details.formatted_phone_number}
                    </a>
                    <div>
                      {place.rating && (
                        <>
                          <p>
                            {place.rating}/5 pour {place.user_ratings_total}{" "}
                            votes
                          </p>
                          {/* <p>
                          <StarRating starCount={place.rating} />
                        </p> */}
                        </>
                      )}
                    </div>
                    <div className="">
                      <div
                        className={`${styles.myButtonDeco} ${styles.cursorWeb} text-center`}
                      >
                        {place.details.website && (
                          <a
                            href={place.details.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={` decoNone ${styles.cursorWeb} `}
                          >
                            <span className="text-center text-nowrap">
                              Site web
                            </span>
                          </a>
                        )}
                      </div>
                      <div
                        className={`${styles.myButtonDeco} text-center ${styles.cursorItineraire}`}
                      >
                        {place.details.url && (
                          <a
                            href={place.details.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`decoNone ${styles.cursorItineraire}`}
                          >
                            <span className="text-center text-nowrap ">
                              Itinéraire
                            </span>
                          </a>
                        )}
                      </div>
                      <div className={``}>
                        {place.details.reviews && (
                          <button
                            type="button"
                            onClick={() =>
                              setNoticeAppearsOnClick((prevValue) => !prevValue)
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.myButtonDeco}`}
                          >
                            <span
                              className={`text-center ${styles.cursorAvis}`}
                            >
                              Avis
                            </span>
                          </button>
                        )}
                      </div>
                      <div className={`${styles.cursorHoraire}`}>
                        {place.details.opening_hours && (
                          <button
                            onClick={() =>
                              setOpeningsAppearsOnClick(
                                (prevValue) => !prevValue
                              )
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.myButtonDeco} ${styles.cursorHoraire} decoNone`}
                          >
                            <span
                              className={`text-center ${styles.cursorHoraire}`}
                            >
                              Horaires
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                {openingsAppearsOnClick && place.details.opening_hours && (
                  <div
                    className={`${styles.carte2} col-lg-5 col-md-5 col-sm-12 `}
                  >
                    <h4 className={`text-center mt-4 ${styles.decoAvis}`}>
                      {" "}
                      Horaire d'ouverture{" "}
                    </h4>
                    <div className={`${styles.cart} mt-2`}>
                      {place.details.opening_hours.weekday_text.map(
                        (index, j) => (
                          <p key={j}>{index}</p>
                        )
                      )}
                    </div>
                  </div>
                )}
                <div
                  className={`col-lg-7 col-md-7 col-sm-12 animate__animated animate__bounce animate__slower`}
                >
                  {noticeAppearsOnClick && place.details.reviews && (
                    <div className="flex-column">
                      <h3 className={`${styles.decoAvis} text-center mt-4`}>
                        Avis
                      </h3>
                      {place.details.reviews.map((review, i) => (
                        <div key={i} className={`${styles.cart} mt-2`}>
                          <div className="row">
                            <h4 className="col-6">{review.author_name}</h4>
                            <div className="col-6">
                              <StarRating5 starCount={review.rating} />
                            </div>
                          </div>
                          <TruncatedText text={review.text} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
}
