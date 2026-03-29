"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - replace with your actual content
const meditationSets = [
  {
    id: "set1",
    title: "Morning Calm",
    prompt:
      "Take a deep breath and feel the morning energy flow through you. Notice the sensations in your body as you breathe in fresh possibilities.",
    audioSrc: "/placeholder-audio.mp3",
    imageSrc: "/placeholder.svg?height=400&width=600",
    imageAlt: "Peaceful sunrise over mountains",
    videoSrc: "/placeholder-video.mp4",
  },
  {
    id: "set2",
    title: "Afternoon Reset",
    prompt:
      "Close your eyes and release the tension of the day. Feel your shoulders relax as you let go of any stress or worry.",
    audioSrc: "/placeholder-audio.mp3",
    imageSrc: "/placeholder.svg?height=400&width=600",
    imageAlt: "Serene forest scene",
    videoSrc: "/placeholder-video.mp4",
  },
  {
    id: "set3",
    title: "Evening Reflection",
    prompt:
      "As the day comes to a close, bring awareness to your accomplishments. Acknowledge your efforts and set intentions for tomorrow.",
    audioSrc: "/placeholder-audio.mp3",
    imageSrc: "/placeholder.svg?height=400&width=600",
    imageAlt: "Calm lake at sunset",
    videoSrc: "/placeholder-video.mp4",
  },
]

export function MeditationSets() {
  const [activeSet, setActiveSet] = useState(meditationSets[0].id)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentSetIndex = meditationSets.findIndex((set) => set.id === activeSet)

  const nextSet = () => {
    const nextIndex = (currentSetIndex + 1) % meditationSets.length
    setActiveSet(meditationSets[nextIndex].id)
    setIsPlaying(false)
  }

  const prevSet = () => {
    const prevIndex = currentSetIndex === 0 ? meditationSets.length - 1 : currentSetIndex - 1
    setActiveSet(meditationSets[prevIndex].id)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-8">
      <Tabs value={activeSet} onValueChange={setActiveSet} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Meditation Sets</h2>
          <TabsList>
            {meditationSets.map((set) => (
              <TabsTrigger key={set.id} value={set.id} onClick={() => setIsPlaying(false)}>
                {set.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {meditationSets.map((set) => (
          <TabsContent key={set.id} value={set.id} className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={set.imageSrc || "/placeholder.svg"}
                        alt={set.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-medium">Text Prompt</h3>
                      <p className="text-muted-foreground">{set.prompt}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium">Audio</h3>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/30">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="h-10 w-10 rounded-full"
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full w-1/3" />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">1:23 / 3:45</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-medium">Video</h3>
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                        <Play className="h-12 w-12 text-muted-foreground opacity-50" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-medium">Custom Content</h3>
                      <div className="p-6 border-2 border-dashed rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Your custom content will go here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevSet}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" onClick={nextSet}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
