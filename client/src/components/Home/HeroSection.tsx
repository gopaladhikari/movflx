import { Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa";

export function HeroSection() {
  return (
    <section
      className="min-h-screen space-y-4 px-4 md:pl-[8%]"
      style={{
        background: "url(/banner_bg01.jpg) center center / cover no-repeat",
        objectFit: "contain",
      }}
    >
      <h1 className="pt-[25%] text-2xl font-bold text-primary md:pt-[17%]">
        Movflx
      </h1>
      <h2 className="text-4xl font-bold md:text-5xl">
        Unlimited <span className="text-primary">Movie</span>, TVs
      </h2>
      <h2 className="text-4xl font-bold md:text-5xl">Shows, & More.</h2>

      <Button
        className="border-3 border-primary px-8 py-5"
        variant="bordered"
        radius="full"
      >
        <FaPlay size={12} /> WATCH NOW
      </Button>
    </section>
  );
}
