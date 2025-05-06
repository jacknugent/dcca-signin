import { useState } from "react";
import { Container, Stack, Title, Center, Text } from "@mantine/core";
import OptionSelector from "./OptionSelector.tsx";
import SignInForm from "./SignInForm.tsx";

function App() {
  const [membership, setMembership] = useState<"member" | "non-member" | null>(
    null
  );

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        {membership === null ? (
          <OptionSelector onSelect={setMembership} />
        ) : (
          <SignInForm
            membership={membership}
            onReset={() => setMembership(null)}
          />
        )}
      </Stack>
    </Container>
  );
}

export default App;
