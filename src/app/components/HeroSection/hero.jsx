"use client";
import GradientText from "../GradientText/GradientText";
import "./hero.css";
import "../Logo_loop/logo_loop.css";
import { cn } from "../../utils";
import LogoLoop from "../Logo_loop/logo_loop";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const companyLogos = [
  {
    src: "../../../images/company_logos/Kingsbury.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "../../../images/company_logos/kal.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "../../../images/company_logos/kemara.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
  {
    src: "../../../images/company_logos/jetwing-ayurveda.png",
    alt: "Company 4",
    href: "https://company4.com",
  },
  {
    src: "../../../images/company_logos/Kashi.png",
    alt: "Company 5",
    href: "https://company5.com",
  },
  {
    src: "../../../images/company_logos/spa_station.png",
    alt: "Company 6",
    href: "https://company6.com",
  },
  {
    src: "../../../images/company_logos/ayu-spa.png",
    alt: "Company 7",
    href: "https://company7.com",
  },
];





export default function HeroSection() {
  return (
    <section
      id="home"
      className={cn(
        "min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-top",
        "pt-28 sm:pt-32 md:pt-32 lg:pt-36 xl:pt-36 "
      )}
      style={{
        backgroundImage: "url('/images/hero_background.png')",
      }}
    >
      {/* Hero Text + Buttons */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-[26px] sm:text-l md:text-l md:max-lg:text-2xl lg:text-4xl font-semibold drop-shadow-lg text-black leading-tight">
            <span className="inline-flex flex-wrap items-center justify-center md:justify-start">
              <span>Premium&nbsp;</span>
              <GradientText
                colors={["#643F18", "#D7A556", "#643F18", "#D7A556", "#643F18"]}
                animationSpeed={5}
                showBorder={false}
                className="custom-class"
              >
                Disposable Spa Wear
              </GradientText>
            </span>
            <br />
            for Professionals
          </h1>

          <p className="mt-2 text-[12px] sm:text-[12px] md:text-[12px] md:max-[12px]:text-[16px] lg:text-[18px] drop-shadow text-gray-700">
            Hygienic, comfortable, and trusted by luxury spas and hotels
          </p>
        </div>

        <div className="button-group flex flex-wrap justify-center gap-4">
          <a href="#shop" className="reversed-btn">Shop Now</a>
          <a href="#samplekit" className="normal-btn">Free Samples</a>
        </div>
      </div>

      {/* Cards below buttons */}
      <div className="w-full flex justify-center px-4 py-10 md:py-15">
        <div className="flex justify-center">
          <div
            className={cn(
              "grid",
              "grid-cols-1",
              "md:grid-cols-2",
              "lg:grid-cols-3",
              "gap-5",
              "max-w-7xl mx-auto"
            )}
          >
            {[
              {
                img: "/images/fourway_material.png",
                title: "Fourway Material<br/>Wear",
                scrollTo: "#fourway",
              },
              {
                img: "/images/paper_material.png",
                title: "Paper Material<br/>Wear",
                scrollTo: "#paper",
              },
              { img: "/images/tlight_candles.png", title: "T-light candle", scrollTo: "#tlight", },
            ].map((card, i) => (
              <a
                key={i}
                href={card.scrollTo}
                className={cn(
                  "h-20 w-60",
                  "sm:h-20 sm:w-60",
                  "md:h-25 md:w-75",
                  "lg:h-25 lg:w-75",
                  "xl:h-30 xl:w-90",
                  "bg-cover bg-center relative",
                  "flex items-start justify-start p-4",
                  "border-2 border-white shadow-lg",
                  "transform transition duration-300 ease-in-out",
                  "hover:scale-105 hover:shadow-2xl"
                )}
                style={{ backgroundImage: `url('${card.img}')` }}
              >
                <h3
                  className="text-gray-500 text-[12px] sm:text-[12px] md:text-[14px] md:max-[14px]:text-[14px] lg:text-[15px] xl:text-[18px] font-semibold"
                  dangerouslySetInnerHTML={{ __html: card.title }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div />

      <div className="w-full pb-5 ">
        <h3 className="text-center pb-3 text-gray-400 text-[12px] sm:text-[12px] md:text-[12px] md:max-[12px]:text-[16px] lg:text-[18px] font-semibold">
          Trusted by Leading Spa & Hospitality Brands
        </h3>
        <div className="w-full py-5 bg-white border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <LogoLoop
              logos={companyLogos}
              speed={80}
              direction="left"
              hoverSpeed={10}
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Our trusted partners and clients"
            />
          </div>
        </div>
      </div>
    </section>

    
  );
}