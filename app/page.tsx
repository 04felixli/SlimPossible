import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import DeleteInformation from "./DeleteInformation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col space-y-4 mt-10">
      <DeleteInformation />
      <LoginLink className="border rounded-md px-3 py-1 flex items-center justify-center">
        Log in
      </LoginLink>
      <RegisterLink className="border rounded-md px-3 py-1">
        Sign up
      </RegisterLink>
    </div>
  );
}
