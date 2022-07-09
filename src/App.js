import { useEffect, useState } from "react"
import { Button, Text, TextInput } from "@mantine/core"
import { useStopwatch } from "react-timer-hook"
import "./App.scss"
import countryData from "./country-data"
import HelpModal from "./HelpModal"
import Header from "./Header"

export default function App() {
  const { seconds, minutes, pause, reset } = useStopwatch({
    autoStart: true,
  })

  const [guessText, setGuessText] = useState("")
  const [targetWord, setTargetWord] = useState()
  const [didWin, setDidWin] = useState(false)
  const [didGiveUp, setDidGiveUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showHelpModal, setShowHelpModal] = useState(false)

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
    const trimmedText = guessText.toLowerCase().trim()

    if (!countryNamesSet.has(trimmedText)) {
      setErrorMessage("We couldn't find that guess in our database 😕")
    } else if (trimmedText === targetWord.toLowerCase()) {
      setDidWin(true)
      pause()
      setErrorMessage("")
    } else {
      const sortedItems = [
        ...countryItems,
        countryListNames.find((c) => c.toLowerCase() === trimmedText),
      ].sort((a, b) => a.localeCompare(b))
      setCountryItems(sortedItems)
      setErrorMessage("")
    }

    setGuessText("")
  }

  return (
    <>
      <div className="main-app-container">
        <Header
          didWin={didWin}
          didGiveUp={didGiveUp}
          minutes={minutes}
          seconds={seconds}
          setShowHelpModal={setShowHelpModal}
        />
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
                <li key={country} style={{ margin: "0.5em 0" }}>
                  <TextInput
                    autoFocus
                    type="text"
                    autoCapitalize="words"
                    placeholder="type guess here and press enter"
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

        <div style={{ display: "flex", marginTop: "1em" }}>
          {didWin || didGiveUp ? (
            <Button
              style={{ marginRight: "0.5em" }}
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
              play again
            </Button>
          ) : (
            <Button
              color="red"
              variant="outline"
              size="xs"
              radius="lg"
              onClick={() => {
                setDidGiveUp(true)
                pause()
              }}
            >
              give up
            </Button>
          )}
        </div>
      </div>
      <HelpModal
        showHelpModal={showHelpModal}
        setShowHelpModal={setShowHelpModal}
      />
    </>
  )
}
