import { Button, Group } from "@mantine/core";

interface Props {
  onSelect: (type: "member" | "non-member") => void;
}

export default function OptionSelector({ onSelect }: Props) {
  return (
    <Group grow>
      <Button
        size="xl"
        onClick={() => onSelect("member")}
      >
        I am a member
      </Button>
      <Button
        size="xl"
        variant="outline"
        onClick={() => onSelect("non-member")}
      >
        I am not a member
      </Button>
    </Group>
  );
}
