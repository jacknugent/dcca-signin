import { Button, Stack } from "@mantine/core";

interface Props {
  onSelect: (type: "member" | "non-member-prompt") => void;
}

export default function OptionSelector({ onSelect }: Props) {
  const buttonStyle = {
    height: "40vh",
    fontSize: "1.5rem",
    fontWeight: 600,
  };

  return (
    <Stack gap="md" align="stretch">
      <Button fullWidth style={buttonStyle} onClick={() => onSelect("member")}>
        <div style={{ whiteSpace: "normal" }}>I am a member</div>
      </Button>
      <Button
        fullWidth
        variant="outline"
        style={buttonStyle}
        onClick={() => onSelect("non-member-prompt")}
      >
        <div style={{ whiteSpace: "normal" }}>I am not a member</div>
      </Button>
    </Stack>
  );
}
