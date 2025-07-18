"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code, ExternalLink, Github, Linkedin, Mail, User ,Download, CodeXml} from "lucide-react"
import emailjs from "@emailjs/browser"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

export default function Home() {

  const manualProjects = [
  {
    id: 1,
    name: "Imaginix",
    tech: ["React", "Node.js", "MongoDB", "OpenAI", "Cloudinary", "Express"],
    description: "A full-stack MERN application that generates and shares AI-powered images using OpenAI's API.",
    image : "/imaginix.png",
    html_url: "https://github.com/mritunjay9211/IMAGINIX.git",
    homepage: "", // Optional: Add your demo URL
  },
  {
    id: 2,
    name: "Portfolio Website",
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Vercel"],
    image : "/portfolio.png", 
    description: "A developer portfolio to showcase skills, projects, and contact details.",
    html_url: "https://github.com/mritunjay9211/Personal-Portfolio.git",
    homepage: "https://mritunjaythakur.vercel.app/"
  },
  {
    id: 3,
    name: "Finance App",
    tech: ["Python", "Streamlit", "Pandas"],
    description: "Developed a Python-based personal finance dashboard using Streamlit, pandas, and Plotly to automate transaction categorization and visualize spending patterns from bank statements",
    image : "/financeapp.png",
    html_url: "https://github.com/mritunjay9211/Finance-App.git",
    homepage: "", // No demo available
  }
];

 

  // Remove dynamic fetching logic and loading state if not required for manual projects
  // const [projects, setProjects] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // Refs for animations/scrolling
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  
  // Ref for the EmailJS contact form
  const formRef = useRef<HTMLFormElement>(null)

  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" })
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // EmailJS handler function using env variables
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRef.current) return

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          alert("Message sent successfully!")
          formRef.current?.reset()
        },
        (error) => {
          console.error("FAILED...", error.text)
          alert("Something went wrong. Please try again.")
        }
      )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <CodeXml className="w-12 h-12 text-primary" />
              
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              Mritunjay Thakur
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-[700px]"
            >
              Software Engineer
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-6"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="#projects">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="#contact">
                  Contact Me <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid gap-6 lg:grid-cols-2 items-center"
        >
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">About Me</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl"> Full Stack Developer</h2>
            <p className="text-muted-foreground md:text-xl">
              I’m Mritunjay Thakur — a Computer Science Engineering graduate with a builder’s mindset and a love for tech that solves real problems
              I'm a versatile full stack developer driven by the desire to craft creative and impactful web solutions. Combining frontend finesse with strong backend architecture, I deliver smooth interfaces and dependable, high-performance systems.
            </p>
            <p className="text-muted-foreground md:text-xl">
              I’ve also had the opportunity to intern at the Integrated Control and Command Centre, Bilaspur Smart City, where I explored the intersection of technology and urban infrastructure — a hands-on experience that deepened my interest in scalable, impactful tech.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href="https://github.com/mritunjay9211" target="_blank">
                  <Github className="w-4 h-4" /> GitHub
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href="https://www.linkedin.com/in/mritunjaythakur2003" target="_blank">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm" className="gap-2">
                  <Link href="https://drive.google.com/file/d/1AsjlKnf04gjNV3rsMYeZanuTpolWibYX/view?usp=drive_link" target="_blank">
                      Download Resume <Download className="w-4 h-4"/>
                  </Link>
              </Button>

            </div>
          </div>
            <motion.div
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden rounded-xl bg-primary/5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
            <div className="relative w-full pt-[125%]"> 
                <img
                  src="/harsh.png"
                  alt="Mritunjay Thakur's profile picture"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </motion.div>

        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-12"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">My Expertise</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Skills & Technologies</h2>
            <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
              I leverage a diverse tech stack to develop cutting-edge applications that are efficient, scalable, and easy to maintain from front to back
            </p>
          </motion.div>

          <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools & Others</TabsTrigger>
            </TabsList>
            <TabsContent value="frontend" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4"

              >
                {[
                  "JavaScript",
                  "React",
                  "HTML/CSS",
                  "Next.js",
                  "Tailwind CSS",
                  "Redux",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-background rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all"
                  >
                    <p className="font-medium">{skill}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="backend" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {["Node.js", "Express", "MongoDB", "SQL", "REST API", "Python"].map(
                  (skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-background rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all"
                    >
                      <p className="font-medium">{skill}</p>
                    </motion.div>
                  )
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="tools" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-2 gap-4"
              >
                {["Git", "GitHub", "VS Code", "Streamlit" , ,].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-background rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all"
                  >
                    <p className="font-medium">{skill}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-24 container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">My Work</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">ProjectWork</h2>
          <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
            These are a few handpicked projects I've crafted, each showcasing a distinct problem-solving approach and creative implementation
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {manualProjects.map((project, index) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={projectsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 * index }}
      >
        <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-2">
            <div className="h-[200px] rounded-md bg-primary/5 mb-4 flex items-center justify-center">
              <img src={project.image} alt={`${project.name} preview`} />
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech?.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex gap-2 w-full">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full gap-1"
              >
                <Link href={project.html_url} target="_blank">
                  <Github className="w-4 h-4" /> Code
                </Link>
              </Button>
              {project.homepage && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full gap-1"
                >
                  <Link href={project.homepage} target="_blank">
                    <ExternalLink className="w-4 h-4" /> Demo
                  </Link>
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    ))}
  </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="https://github.com/mritunjay9211" target="_blank">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-[800px] mx-auto text-center space-y-4 mb-12"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">Get In Touch</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Let's Work Together</h2>
            <p className="text-muted-foreground md:text-xl">
              Got a project idea or interested in exploring new opportunities? I’m eager to take on fresh challenges and collaborate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-8 md:grid-cols-2 max-w-[800px] mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <p>mritunjaythakur2003@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary" />
                  <Link href="https://github.com/mritunjay9211" target="_blank" className="hover:underline">
                    github.com/mritunjay9211
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <Link href="https://www.linkedin.com/in/mritunjaythakur2003" target="_blank" className="hover:underline">
                    linkedin.com/in/mritunjaythakur2003
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form and I'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="user_name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="user_email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      required
                      placeholder="Your email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Your message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Mritunjay Thakur. All rights reserved.</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="https://github.com/mritunjay9211"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/mritunjaythakur2003" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:mritunjaythakur2003@gmail.com" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
