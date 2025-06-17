import { useForm } from "@mantine/form";
import { TextInput, Button, Stack, Alert, Group } from "@mantine/core";
import { useRef, useEffect, useState } from "react";
import { postSignIn } from "./helper";

interface Props {
  onReset: () => void;
}

export default function GuestSignInForm({ onReset }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
      email: (v) => (!v ? "Email is required for non-members" : null),
    },
  });

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      await postSignIn({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        member: "false",
      });
      setSubmitted(true);
      setLoading(false);
      form.reset();
      setTimeout(() => {
        setSubmitted(false);
        onReset();
      }, 2000);
    } catch (error) {
      setLoading(false);

      console.error("Error submitting to Google Sheets:", error);
      alert("There was a problem submitting your sign-in. Please try again.");
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <h1>Guest Sign-in</h1>
      <Stack gap="md">
        <TextInput
          size="lg"
          label="First Name"
          placeholder="Enter your first name"
          {...form.getInputProps("firstName")}
          disabled={loading || submitted}
          ref={firstNameRef}
        />
        <TextInput
          size="lg"
          label="Last Name"
          placeholder="Enter your last name"
          disabled={loading || submitted}
          {...form.getInputProps("lastName")}
        />
        <TextInput
          size="lg"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          disabled={loading || submitted}
          {...form.getInputProps("email")}
        />

        <Group mt="md">
          <Button type="submit" size="md" loading={loading}>
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
