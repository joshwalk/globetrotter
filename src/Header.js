import { Button, Text } from "@mantine/core"

const Header = ({ didWin, didGiveUp, minutes, seconds, setShowHelpModal }) => {
  return (
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
          variant="outline"
          size="xs"
          radius="lg"
          onClick={() => setShowHelpModal(true)}
        >
          how to
        </Button>
      </div>
    </div>
  )
}

export default Header
