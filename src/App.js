import { useEffect, useState } from "react"
import { Button, Text, TextInput } from "@mantine/core"
import "./App.scss"
import countryData from "./country-data"

export default function App() {
  const [guessText, setGuessText] = useState("")
  const [targetWord, setTargetWord] = useState()
  const [didWin, setDidWin] = useState(false)
  const [didGiveUp, setDidGiveUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [countryItems, setCountryItems] = useState([])

  const countryListNames = Object.keys(countryData)

  const fetchRandomCountry = () => {
    const randomCountry =
      countryListNames[Math.floor(Math.random() * countryListNames.length)]
    setTargetWord(randomCountry)
    setCountryItems([randomCountry])
  }

  useEffect(() => {
    fetchRandomCountry()
  }, [])

  const countryNamesSet = new Set(
    countryListNames.map((word) => word.toLowerCase())
  )

  const onGuess = () => {
    if (!countryNamesSet.has(guessText.toLowerCase())) {
      setErrorMessage("sry bro not a country")
    } else if (guessText.toLowerCase() === targetWord.toLowerCase()) {
      setDidWin(true)
      setErrorMessage("")
    } else {
      const sortedItems = [...countryItems, guessText].sort((a, b) =>
        a.localeCompare(b)
      )
      setCountryItems(sortedItems)
    }

    setGuessText("")
  }

  return (
    <div className="main-app-container">
      <div className="header">
        <Text>2:23</Text>
        <Text
          size="lg"
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 45 }}
          weight={700}
        >
          Globetrotter
        </Text>

        <div>
          <Button
            color="teal"
            size="xs"
            radius="lg"
            onClick={() => {
              setCountryItems([])
              setDidWin(false)
              setDidGiveUp(false)
              setErrorMessage("")
              fetchRandomCountry()
            }}
          >
            reset
          </Button>
        </div>
      </div>

      {countryItems.map((country) => {
        if (country === targetWord) {
          if (didWin) {
            return <li key={country}>You got it! - {country}</li>
          }
          return (
            <TextInput
              key={country}
              style={{ width: 300 }}
              placeholder="Type guess here"
              value={guessText}
              onChange={(e) => setGuessText(e.currentTarget.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  onGuess()
                }
              }}
              error={errorMessage ? errorMessage : null}
            />
          )
        }

        return <li key={country}>{country}</li>
      })}

      {didGiveUp
        ? `You gave up. :( the word we were looking for: ${targetWord}`
        : null}

      <button onClick={() => setDidGiveUp(true)}>give up</button>
    </div>
  )
}
