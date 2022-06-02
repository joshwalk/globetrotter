import { useEffect, useState } from "react"
import { Button, Text, TextInput } from "@mantine/core"
import { useStopwatch } from "react-timer-hook"
import "./App.scss"
import countryData from "./country-data"

export default function App() {
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: true,
  })

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
    console.log(randomCountry)
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
    if (!countryNamesSet.has(guessText.toLowerCase().trim())) {
      setErrorMessage(`"${guessText}" is not in our dataset`)
    } else if (guessText.toLowerCase().trim() === targetWord.toLowerCase()) {
      setDidWin(true)
      pause()
      setErrorMessage("")
    } else {
      const sortedItems = [
        ...countryItems,
        countryListNames.find(
          (c) => c.toLowerCase() === guessText.toLowerCase().trim()
        ),
      ].sort((a, b) => a.localeCompare(b))
      setCountryItems(sortedItems)
      setErrorMessage("")
    }

    setGuessText("")
  }

  return (
    <div className="main-app-container">
      <div className="header">
        <Text
          weight={700}
          color={didWin ? "green" : didGiveUp ? "red" : undefined}
        >{`${minutes}:${seconds.toString().padStart(2, "0")}`}</Text>
        <Text
          size="lg"
          variant="gradient"
          gradient={{ from: "green", to: "blue", deg: 45 }}
          weight={700}
          style={{ textAlign: "center" }}
        >
          globetrotter
        </Text>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="green"
            variant="outline"
            size="xs"
            radius="lg"
            onClick={() => {
              setCountryItems([])
              setDidWin(false)
              reset()
              setDidGiveUp(false)
              setErrorMessage("")
              fetchRandomCountry()
            }}
          >
            reset
          </Button>
        </div>
      </div>
      <ul>
        {countryItems.map((country) => {
          if (country === targetWord) {
            if (didWin) {
              return (
                <li key={country}>
                  <Text color="green" weight={700}>
                    You got it! 🎉🎉🎉
                  </Text>
                  <Text weight={700}>
                    {countryData[country]} {country}
                  </Text>
                </li>
              )
            }
            if (didGiveUp) {
              return (
                <li key={country}>
                  <Text color="red" weight={700}>
                    Correct answer:
                  </Text>
                  <Text weight={700}>
                    {countryData[country]} {country}
                  </Text>
                </li>
              )
            }
            return (
              <li key={country} style={{ margin: "12px 0" }}>
                <TextInput
                  autoFocus
                  type="text"
                  autoCapitalize="words"
                  placeholder="Type guess here"
                  value={guessText}
                  onChange={(e) => setGuessText(e.currentTarget.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      onGuess()
                    }
                  }}
                />
                {errorMessage ? (
                  <Text color="red" size="sm">
                    {errorMessage}
                  </Text>
                ) : null}
              </li>
            )
          }

          return (
            <li key={country}>
              <Text>
                {countryData[country]} {country}
              </Text>
            </li>
          )
        })}
      </ul>

      {didWin || didGiveUp ? null : (
        <Button
          color="red"
          variant="outline"
          size="xs"
          radius="lg"
          onClick={() => {
            setDidGiveUp(true)
            pause()
          }}
          style={{ marginTop: 16 }}
        >
          give up
        </Button>
      )}
    </div>
  )
}
