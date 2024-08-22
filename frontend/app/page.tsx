import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import DeleteInformation from "./DeleteInformation";
import Button from "./global components/Buttons/Button";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <DeleteInformation />
      <div>
        <h1 className="text-4xl md:text-7xl mb-5 text-wrap">SLIMPOSSIBLE</h1>
        <div className="flex flex-col justify-center items-center">

          <LoginLink className="rounded-full w-8/12 black-button shadow-lg">
            <Button text="Log In" className="w-full h-full px-3 py-1" />
          </LoginLink>
          <p className="mt-5"><span className="thin-font">Don&#39;t have an account?</span> <span className="underline"><RegisterLink>Sign Up</RegisterLink></span></p>
        </div>
      </div>
    </div>
  );
}
