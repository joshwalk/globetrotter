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
    console.log(randomCountry)
    setTargetWord(randomCountry)
    setCountryItems(
      [
        ...countryListNames.slice(0, 4),
        ...countryListNames.slice(150, 153),
        randomCountry,
      ].sort((a, b) => a.localeCompare(b))
    )
  }

  useEffect(() => {
    fetchRandomCountry()
  }, [])

  const countryNamesSet = new Set(
    countryListNames.map((word) => word.toLowerCase())
  )

  const onGuess = () => {
    if (!countryNamesSet.has(guessText.toLowerCase())) {
      setErrorMessage(`"${guessText}" is not in our dataset`)
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
        <Text weight={700}>2:23</Text>
        <Text
          size="lg"
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 45 }}
          weight={700}
        >
          globetrotter
        </Text>

        <div>
          <Button
            color="teal"
            variant="outline"
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
      <ul>
        {countryItems.map((country) => {
          if (country === targetWord) {
            if (didWin) {
              return (
                <li key={country}>
                  <Text color="teal" weight={700}>
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
                    You gave up 😞. Correct answer:
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

      <Button
        color="red"
        variant="outline"
        size="xs"
        radius="lg"
        onClick={() => setDidGiveUp(true)}
        style={{ marginTop: 16 }}
      >
        give up
      </Button>
    </div>
  )
}
