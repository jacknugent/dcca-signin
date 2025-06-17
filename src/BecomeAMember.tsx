import { Stack, Text } from "@mantine/core";

interface Props {
  backToMainPage: () => void;
}

export default function BecomeAMember({ backToMainPage }: Props) {
  setTimeout(() => {
    backToMainPage();
  }, 5000);

  return (
    <Stack gap="md" align="stretch">
      <h1 style={{ textAlign: "center" }}>
        Speak to a Board member to sign up!
      </h1>
    </Stack>
  );
}
