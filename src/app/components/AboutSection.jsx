"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>React</li>
        <li>Flutter</li>
        <li>After Effect</li>
        <li>Photoshop</li>
        <li>Alight Motion</li>
        <li>Figma</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>SMPN 1 Rancaekek ( 2015 - 2018 )</li>
        <li>SMK Lugina Rancaekek ( 2018 - 2021 )</li>
        <li>Ma`soem University ( 2022 - Present )</li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-2">
        <li>Aoshi Market ( 2021 - 2022 )</li>
        <li>Krammer Studio ( 2021 - 2022 )</li>
        <li>Takapedia ( 2022 - Present )</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/a.png" width={500} height={500} alt="logo" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            Saya seorang pria yang lahir di Bogor pada 18 Januari 2003. Tinggi badan saya sih di bawah 2 meter, cukup standar aja, nggak terlalu tinggi juga nggak terlalu pendek. Berat badan? Wah, lupa nih, yang jelas nggak seimbang banget sih, kadang naik kadang turun. Oh iya, soal hubungan, saya masih lajang cuy, boro-boro mikirin nikah.
          </p>
          <div className="flex flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => handleTabChange("skills")}
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 
                ${tab === "skills" ? "bg-primary-500 text-white" : "bg-transparent text-[#ADB7BE]"} 
                hover:bg-primary-500 hover:text-white`}
            >
              Skills
            </button>
            <button
              onClick={() => handleTabChange("education")}
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 
                ${tab === "education" ? "bg-primary-500 text-white" : "bg-transparent text-[#ADB7BE]"} 
                hover:bg-primary-500 hover:text-white`}
            >
              Education
            </button>
            <button
              onClick={() => handleTabChange("experience")}
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition duration-300 
                ${tab === "experience" ? "bg-primary-500 text-white" : "bg-transparent text-[#ADB7BE]"} 
                hover:bg-primary-500 hover:text-white`}
            >
              Experience
            </button>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
