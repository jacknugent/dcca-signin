import { Button, Stack, Alert, Group, Select, type ComboboxItem, type OptionsFilter } from "@mantine/core";
import { useState, type FormEvent } from "react";
import type { Contact } from "./hooks/useWildApricotContacts";
import { postSignIn } from "./helper";

interface Props {
  members: Contact[] | undefined;
  onReset: () => void;
}

export default function MemberSignInForm({ members, onReset }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = async (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();

    if (!value) {
      return;
    }

    const [lastName, firstName] = value.split(", ");

    try {
      setLoading(true);
      await postSignIn({
        firstName: firstName,
        lastName: lastName,
        member: "true",
      });

      setSubmitted(true);
      setLoading(false);
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

  const seen = new Set();
  const uniqueMembers = members?.filter(
    (member) => !seen.has(member.DisplayName) && seen.add(member.DisplayName)
  );

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const searchWords = search.toLowerCase().trim().split(/\s+/);

    return (options as ComboboxItem[]).filter((option) => {
      const labelWords = option.label.toLowerCase().trim().split(/\s+/);
      return searchWords.every((searchWord) =>
        labelWords.some((word) => word.includes(searchWord))
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        {!uniqueMembers ? (
          <div>Loading members...</div>
        ) : (
          <Select
            label="Search for your name"
            placeholder="Name"
            data={
              !search
                ? []
                : uniqueMembers?.map((member) => {
                    const label = `${member.LastName}, ${member.FirstName}`;
                    return { label, value: label };
                  })
            }
            limit={3}
            size="xl"
            searchable
            filter={optionsFilter}
            onSearchChange={(search) => {
              if (!search) {
                setValue(search);
              }
              setSearch(search);
            }}
            value={value}
            onOptionSubmit={(val) => {
              setValue(val);
              setSearch(val);
            }}
          />
        )}
        <Group mt="md">
          <Button type="submit" size="md" loading={loading} disabled={!value}>
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
