export interface SubmitData {
  firstName: string;
  lastName: string;
  email?: string;
  member: "true" | "false";
}

export async function postSignIn(data: SubmitData): Promise<void> {
  const formData = new URLSearchParams({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email ?? "",
    member: data.member,
  });

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwtud45V77J9vy-kGhgtzrjLLxVcMghX1Y_USkc2GvxhEvCJGiYrOi90Ee1BqWmtgfOiA/exec",
    {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit sign-in");
  }
}
