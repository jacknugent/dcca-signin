import { useState } from "react";
import { Container, Stack } from "@mantine/core";
import OptionSelector from "./OptionSelector.tsx";
import { useWildApricotContacts } from "./hooks/index.ts";
import SignUpAsk from "./SignUpAsk.tsx";
import MemberSignInForm from "./MemberSignInForm.tsx";
import BecomeAMember from "./BecomeAMember.tsx";
import GuestSignInForm from "./GuestSignInForm.tsx";

function App() {
  const [membership, setMembership] = useState<
    "member" | "non-member-prompt" | "become-member" | "guest" | null
  >(null);
  const { data } = useWildApricotContacts();

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        {membership === null ? (
          <OptionSelector onSelect={setMembership} />
        ) : membership === "non-member-prompt" ? (
          <SignUpAsk onSelect={setMembership} />
        ) : membership === "member" ? (
          <MemberSignInForm
            members={data?.Contacts}
            onReset={() => setMembership(null)}
          />
        ) : membership === "become-member" ? (
          <BecomeAMember backToMainPage={() => setMembership(null)} />
        ) : (
          <GuestSignInForm onReset={() => setMembership(null)} />
        )}
      </Stack>
    </Container>
  );
}

export default App;
