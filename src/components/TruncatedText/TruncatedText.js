import React, { useState } from "react";

const MAX_WORDS = 25;

/**
 * permet de tronquer un texte supérieur à MAX_WORDS
 *
 * @export
 * @param {*} { text }
 * @return
 */
export default function TruncatedText({ text }) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > MAX_WORDS) {
      const truncatedWords = words.slice(0, MAX_WORDS);
      return truncatedWords.join(" ");
    }
    return text;
  };

  const displayText = showFullText ? text : truncateText(text);
  const hasMoreWords = text.split(" ").length > MAX_WORDS;

  return (
    <div className="d-flex">
      <div onClick={toggleText} className="text-center">
        {displayText}
        {!showFullText && hasMoreWords && (
            <i onClick={toggleText} className="btn-lightt">
              ...
              <span>Lire la suite ?</span>
            </i>
        )}
      </div>
    </div>
  );
}
