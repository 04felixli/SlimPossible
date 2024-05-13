import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-xl">Home Page</div>
      <Link href="/workout">Workout</Link>
      <Link href="/history">History</Link>
      <Link href="/exercises">Exercises</Link>
    </>
  );
}
