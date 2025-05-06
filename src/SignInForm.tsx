import { useForm } from "@mantine/form";
import { TextInput, Button, Stack, Alert, Group, Text } from "@mantine/core";
import { useRef, useEffect, useState } from "react";

interface Props {
  membership: "member" | "non-member";
  onReset: () => void;
}

export default function SignInForm({ membership, onReset }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },

    validate: {
      firstName: (v) => (!v ? "First name is required" : null),
      lastName: (v) => (!v ? "Last name is required" : null),
      email: (v) =>
        membership === "non-member" && !v
          ? "Email is required for non-members"
          : null,
    },
  });

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    console.log("Form submitted:", values);
    setSubmitted(true);
    form.reset();
    setTimeout(() => {
      setSubmitted(false);
      onReset();
    }, 2000);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          size="lg"
          label="First Name"
          placeholder="Enter your first name"
          {...form.getInputProps("firstName")}
          ref={firstNameRef}
        />
        <TextInput
          size="lg"
          label="Last Name"
          placeholder="Enter your last name"
          {...form.getInputProps("lastName")}
        />
        {membership === "non-member" && (
          <TextInput
            size="lg"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
        )}
        <Group mt="md">
          <Button type="submit" size="md">
            Sign In
          </Button>
          <Button variant="subtle" onClick={onReset}>
            Back
          </Button>
        </Group>
        {submitted && (
          <Alert color="green" mt="md">
            Thank you! You're signed in.
          </Alert>
        )}
      </Stack>
    </form>
  );
}
