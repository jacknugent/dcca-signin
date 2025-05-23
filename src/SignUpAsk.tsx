import { Button, Stack, Text } from "@mantine/core";

interface Props {
  onSelect: (type: "become-member" | "guest") => void;
}

export default function SignUpAsk({ onSelect }: Props) {
  const buttonStyle = {
    height: "40vh",
    fontSize: "1.5rem",
    fontWeight: 600,
  };

  return (
    <Stack gap="md" align="stretch">
      <Text size="xl" fw={900} style={{ textAlign: "center" }}>
        Would you like to become a member?
      </Text>
      <Button
        fullWidth
        style={buttonStyle}
        onClick={() => onSelect("become-member")}
      >
        <div style={{ whiteSpace: "normal" }}>
          Yes, I would like to become a paying member
        </div>
      </Button>
      <Button
        fullWidth
        variant="outline"
        style={buttonStyle}
        onClick={() => onSelect("guest")}
      >
        <div style={{ whiteSpace: "normal" }}>
          No, I would like to join as a guest
        </div>
      </Button>
    </Stack>
  );
}
