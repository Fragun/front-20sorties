import { useRouteError } from "react-router-dom";
import styles from "./error.module.scss";

export default function ErrorPage() {
	const error = useRouteError();
	return (
		<>

    <section className={`${styles.page_404}`}>
        <div className={`${styles.container}`}>
            <div>
                <div className={`${styles.four_zero_four_bg}`}>
                    <h1 className="text-align-center">Erreur 404</h1>
                </div>
                <div  className={`${styles.contant_box_404}`}>
                    <h3 className={`${styles.htitle}`}>
                        On dirait que tu es perdu
                    </h3>
                    <p>La page que vous recherchez n'est pas disponible !</p>
                    <br/>
                    <a href="/" className={`btn btn-primary ${styles.link_4044}`}>Retourne sur la page d'accueil</a>
                </div>
            </div>
        </div>
  
    </section>

			<p>{error.message || error.statusText}</p>
		</>
	);
}
