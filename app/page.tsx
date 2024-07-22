import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 mt-10">
      <LoginLink className="border rounded-md px-3 py-1 flex items-center justify-center">
        Log in
      </LoginLink>
      <RegisterLink className="border rounded-md px-3 py-1">
        Sign up
      </RegisterLink>
    </div>
  );
}
