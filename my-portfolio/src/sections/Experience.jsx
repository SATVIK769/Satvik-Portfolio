import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "AIML and Data Science Internship",
    company: "Ybi Foundation",
    duration: "April-May 2025",
    description: "Gained practical experience in data analysis, machine learning models, and data visualization using Python. Developed solutions for real-world problems with structured datasets and analytical techniques.",
  },
  {
    role: "MERN Stack Developer Intern",
    company: "Codec TECHNOLOGIES",
    duration: "September 2025",
    description:
      "Built and deployed full-stack projects using MongoDB, Express, React, and Node.js. Developed features like authentication, dashboards, payment integration, and AI-based recommendations.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 30 : -30, 0],
  );
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout !== "desktop") {
    return (
      <div className="relative flex justify-center items-center min-w-0">

        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255, 0.1)]"
          style={{ scale, opacity }}
        ></motion.div>
        <motion.div
          className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-0.75 bg-white/40`}
          style={{ height: 40, opacity }}
        ></motion.div>

        <motion.article
          className={`absolute ${idx % 2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[400px] shadow-lg h-[300px] flex flex-col justify-center items-center text-center gap-2`}
          style={{ opacity, y, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} || {exp.duration}
          </p>
          <p className="text-md text-gray-300 wrap-break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }
  return (
    <div className="relative flex items-start">

      <motion.div
        className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale, opacity }}
      >
        </motion.div>
        <motion.article
          className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg h-[300px] flex flex-col justify-between items-center text-center gap-2"
          style={{ opacity, x }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold wrap-break-words">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3 wrap-break-words">
            {exp.company} || {exp.duration}
          </p>
          <p className="text-md text-gray-300 wrap-break-words">{exp.description}</p>
        </motion.article>
    </div>
  );
}

export default function Experience() {

  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const SCENE_HEIGHT_VH = isMobile ? 160*experiences.length : 120*experiences.length;

  const {scrollYProgress} = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(() => experiences.map((_, i) => (i+1) / experiences.length),[])
  const lineSize = useTransform(scrollYProgress, (v) => `${v*100}%`)

  return (
    <section id="experience" className="relative bg-black text-white">
      <div ref={sceneRef} style={{height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh"}}
      className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
            Experience
          </h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-1.5 bg-white/15 rounded "> 
                  <motion.div className="absolute left-0 top-0 h-1.5 bg-white rounded origin-left" style={{width:lineSize}} >

                  </motion.div>
                </div>
                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx} exp={exp} idx={idx} start={idx===0 ? 0 : thresholds[idx-1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop" />

                  ))}

                </div>
              </div>
            )}
            
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/15 rounded"> 
                  <motion.div className="absolute top-0 w-1.5 bg-white rounded origin-top" style={{height: lineSize}} >

                  </motion.div>
                </div>
                <div className="relative">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx} exp={exp} idx={idx} start={idx===0 ? 0 : thresholds[idx-1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile" />
                  ))}

                </div>
              </div>
            )}

          </div>

        </div>

      </div>


    </section>
  );
}
// 25:00 part 3
