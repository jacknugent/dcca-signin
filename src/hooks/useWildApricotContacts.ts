import { useQuery } from "@tanstack/react-query";

export interface MembershipLevel {
  Id: number;
  Url: string;
  Name: string;
}

export interface FieldValue {
  FieldName: string;
  Value: string | boolean | number | null;
  SystemCode: string;
}

export interface Contact {
  FirstName: string;
  LastName: string;
  Email: string;
  DisplayName: string;
  ProfileLastUpdated: string;
  MembershipLevel: MembershipLevel;
  FieldValues: FieldValue[];
  Id: number;
  Url: string;
  IsAccountAdministrator: boolean;
  TermsOfUseAccepted: boolean;
}

export interface WildApricotContactsResponse {
  Contacts: Contact[];
}

export default function useWildApricotContacts() {
  return useQuery<WildApricotContactsResponse, Error>({
    queryKey: ["wildApricotContacts"],
    queryFn: () =>
      fetch(
        "https://i676vaertx5tple6554rbkn7xm0fcrlb.lambda-url.us-east-1.on.aws/"
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });
}
