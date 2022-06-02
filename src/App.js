import { useEffect, useState } from "react";
import "./App.css";
import countryData from "./country-data";

const WordList = ({ words }) => {
  return (
    <ul>
      {words.map((word) => (
        <li key={word}>
          {countryData[word]} {word}
        </li>
      ))}
    </ul>
  );
};

export default function App() {
  const [guessText, setGuessText] = useState("");
  const [targetWord, setTargetWord] = useState();
  const [beforeWords, setBeforeWords] = useState([]);
  const [afterWords, setAfterWords] = useState([]);
  const [didWin, setDidWin] = useState(false);
  const [didGiveUp, setDidGiveUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const countryList = Object.keys(countryData);

  const fetchData = () => {
    const randomWord =
      countryList[Math.floor(Math.random() * countryList.length)];
    setTargetWord(randomWord);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataAsSet = new Set(countryList.map((word) => word.toLowerCase()));

  const onGuess = () => {
    if (!dataAsSet.has(guessText.toLowerCase())) {
      setErrorMessage("sry bro not a country");
    } else if (guessText.toLowerCase() === targetWord.toLowerCase()) {
      setDidWin(true);
      setErrorMessage("");
    } else if (guessText.toLowerCase() < targetWord.toLowerCase()) {
      setBeforeWords((state) => [...state, guessText]);
      setErrorMessage("");
    } else if (guessText.toLowerCase() > targetWord.toLowerCase()) {
      setAfterWords((state) => [guessText, ...state]);
      setErrorMessage("");
    }

    setGuessText("");
  };

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            setBeforeWords([]);
            setAfterWords([]);
            setDidWin(false);
            setDidGiveUp(false);
            setErrorMessage("");
            fetchData();
          }}
        >
          reset
        </button>
      </div>
      <WordList words={beforeWords} />
      {didWin ? (
        `Winner! 🎉 ${targetWord}`
      ) : (
        <>
          <input
            type="text"
            value={guessText}
            onChange={(e) => setGuessText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onGuess();
              }
            }}
          />
          <button onClick={onGuess}>guess</button>
        </>
      )}
      {didGiveUp
        ? `You gave up. :( the word we were looking for: ${targetWord}`
        : null}
      {errorMessage ? errorMessage : null}
      <WordList words={afterWords} />
      <button onClick={() => setDidGiveUp(true)}>give up</button>
    </div>
  );
}
