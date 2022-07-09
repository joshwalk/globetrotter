import { Modal, Text } from "@mantine/core"

const HelpModal = ({ showHelpModal, setShowHelpModal }) => {
  return (
    <Modal
      opened={showHelpModal}
      onClose={() => setShowHelpModal(false)}
      title={<Text weight={700}>how to play</Text>}
    >
      <p>
        I'm thinking of a country… enter any country name in the guess box and
        press enter to submit your guess.
      </p>

      <p>
        Guesses appear in alphabetical order, and the guess box will shift
        around based on where the correct answer fits in alphabetically.
      </p>

      <p>
        Keep guessing until you get the right answer, or give up if you've lost
        all hope.
      </p>

      <p>
        <strong>Note:</strong> the database of country names is sourced from all
        countries that have flag emojis.
      </p>
    </Modal>
  )
}

export default HelpModal
