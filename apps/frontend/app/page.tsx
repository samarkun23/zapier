import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-10">
      <Appbar />
      <Hero />
    </div>
  );
}
