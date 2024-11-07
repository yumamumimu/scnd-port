"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Membuat Web",
    description: "Namanya SI harus bisa buat website",
    image: "/images/projects/web.png",
    tag: ["All", "Web"],
    
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Tidur",
    description: "Kebutuhan yang dijadikan Hobby",
    image: "/images/c.png",
    tag: ["All"],
    
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Musik",
    description: "suara jelek tpi gass terus",
    image: "/images/b.png",
    tag: ["All"],
    
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Coding",
    description: "Awalnya masalah lama lama jadi hobby",
    image: "/images/g.png",
    tag: ["All", "Web"],
    
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Editing Video",
    description: "kalo ini hobby yang menguntungkan",
    image: "/images/v.png",
    tag: ["All", "Editing"],
    
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Gaming",
    description: "niatnya gabut tpi jdi hobby",
    image: "/images/h.png",
    tag: ["All", "Gaming"],
    
    previewUrl: "/",
  },
  {
    id: 7,
    title: "Valonight",
    description: "Main Valorant bersama ayam warna warni",
    image: "/images/valo.png",
    tag: ["All", "Gaming"],
    
    previewUrl: "/",
  },
  {
    id: 8,
    title: "EL TIME",
    description: "Bermain bersama EL Familia",
    image: "/images/el.png",
    tag: ["All", "Gaming"],
    
    previewUrl: "/",
  },
  {
    id: 9,
    title: "Not Responding",
    description: "Error yang sudah menjadi makanan sehari hari",
    image: "/images/d.png",
    tag: ["All", "Editing"],
    
    previewUrl: "/",
  },
  {
    id: 10,
    title: "Taunting",
    description: "Ternyata seru juga ngandangin ayam",
    image: "/images/k.png",
    tag: ["Gaming"],
    
    previewUrl: "/",
  },
  {
    id: 11,
    title: "Bersyukur",
    description: "Menang juga jangan sombong ya adick adick",
    image: "/images/z.png",
    tag: ["Gaming"],
    
    previewUrl: "/",
  },
  {
    id: 12,
    title: "Revisi",
    description: "Jelek dikit revisi",
    image: "/images/9.png",
    tag: ["Web"],
    
    previewUrl: "/",
  },
  {
    id: 13,
    title: "Membuat Website Sederhana",
    description: "Namanya juga belajar",
    image: "/images/f.png",
    tag: ["Web"],
    
    previewUrl: "/",
  },
  {
    id: 14,
    title: "UI / UX",
    description: "MLBB X VALORANT",
    image: "/images/projects/e.png",
    tag: ["All","Editing"],
    
    previewUrl: "/",
  },
  {
    id: 15,
    title: "Multi Editor Project",
    description: "MEP dikejar Deadline",
    image: "/images/projects/q.png",
    tag: ["All","Editing"],
    
    previewUrl: "/",
  },
  {
    id: 16,
    title: "Typograph Edit",
    description: "Ariana - We can't be friend",
    image: "/images/projects/w.png",
    tag: ["All","Editing"],
    
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Gaming"
          isSelected={tag === "Gaming"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Editing"
          isSelected={tag === "Editing"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
