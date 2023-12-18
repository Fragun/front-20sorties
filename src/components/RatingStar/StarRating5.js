/**
 * Système de notation à 5 étoiles avec line awesome étoile pleine et vide
 * Prends un integer entier allant de 0 à 5 en paramètre 
 *
 * @export
 * @param {*} starCount 
 * @return 
 */
export default function StarRating5(starCount) {
  const maxStars = 5;
  const fullStar = (
    <i className="las la-star" style={{ color: "#deac25" }}>
      {" "}
    </i>
  );
  const emptyStar = <i className="lar la-star"></i>;
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= starCount.starCount) {
      stars.push(<span key={`star-${i}`}>{fullStar}</span>);
    } else {
      stars.push(<span key={`star-${i}`}>{emptyStar}</span>);
    }
  }
  return <div>{stars}</div>;
}
