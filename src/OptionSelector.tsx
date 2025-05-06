import { Button, Stack } from "@mantine/core";

interface Props {
  onSelect: (type: "member" | "non-member") => void;
}

export default function OptionSelector({ onSelect }: Props) {
  const buttonStyle = {
    height: "10rem",
    fontSize: "3rem",
    fontWeight: 600,
  };

  return (
    <Stack gap="md" align="stretch">
      <Button fullWidth style={buttonStyle} onClick={() => onSelect("member")}>
        I am a member
      </Button>
      <Button
        fullWidth
        variant="outline"
        style={buttonStyle}
        onClick={() => onSelect("non-member")}
      >
        I am not a member
      </Button>
    </Stack>
  );
}
