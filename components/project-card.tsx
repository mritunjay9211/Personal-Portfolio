"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Code, ExternalLink, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectCardProps {
  project: {
    id: string | number
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    topics?: string[]
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate random technologies if topics aren't available
  const technologies = project.topics || ["React", "Node.js", "MongoDB"].slice(0, 2 + Math.floor(Math.random() * 2))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description || "A cool project by Swapnil Chakraborty"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <motion.div
            className="h-[120px] rounded-md bg-primary/5 mb-4 flex items-center justify-center overflow-hidden"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Code className="w-10 h-10 text-primary/40" />
          </motion.div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 rounded-full bg-muted">
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button asChild variant="outline" size="sm" className="w-full gap-1">
              <Link href={project.html_url} target="_blank">
                <Github className="w-4 h-4" /> Code
              </Link>
            </Button>
            {project.homepage && (
              <Button asChild variant="outline" size="sm" className="w-full gap-1">
                <Link href={project.homepage} target="_blank">
                  <ExternalLink className="w-4 h-4" /> Demo
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

