"use client";

import { useState, useRef, useEffect } from "react"; // updated import line
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  Link,
  Pause,
  Video,
  VibrateIcon as Vr,
  Maximize2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SplatViewer } from "@/components/splat/splat-viewer";

// Sample data - replace with your actual scenarios
const scenarios = [
  {
    name: "big_rock",
    id: "luminous-geode-clearing",
    title: "Luminous Geode Clearing",
    original: "moss, crystal, portal, waterfall, twilight",
    prompt:
      "Eye-level view from a seated position at the edge of a fantastical clearing, looking directly across towards the far boundary. The clearing floor is covered in a thick carpet of glowing, emerald-green moss, soft and yielding. A single, massive geode sits at the clearing's center, pulsing with a soft, inner light that casts subtle shadows. The clearing is roughly oval in shape and nestled between ancient rock formations covered in luminous lichen.\n\nThe opposite boundary is a sheer rock face composed of swirling, multicolored crystalline structures. Veins of pure quartz crisscross the rock, catching the light and creating a dazzling, shimmering effect. A waterfall of liquid light cascades down the face, dissolving into a pool of pearlescent mist at its base.\n\nLight filters down from a hidden source above, bathing the clearing in a soft, diffused glow. The geode at the center adds to this luminescence, casting gentle rays across the emerald moss. Tiny, glowing motes of light dance in the air above the clearing, adding to the ethereal atmosphere.\n\nThe atmosphere within the clearing is one of profound serenity and peace. The air is perfectly still. The sky visible overhead is a deep, swirling indigo, dotted with constellations unknown to earthly eyes.\n\nStrange, bioluminescent flora grows at the sides of the clearing, adding to the fantastical nature of the space. Vines covered in glowing, sapphire-blue flowers drape down from the rock formations. The open space across the clearing is clear, allowing an unobstructed view of the stunning rock face and cascading light.\n\nPhotorealistic, highly detailed, 8k resolution, sharp focus, cinematic lighting.",
    imageAlt:
      "Fantastical clearing with glowing moss and massive luminescent geode, crystalline rock face with waterfall of light",
    imageSrc: "/big_rock/big_rock.jpg",
    audioSrc: "/big_rock/big_rock.mp3",
    videoSrc: "/big_rock/big_rock.mp4",
  },
  {
    name: "moon",
    id: "fantastical-meadow-moons",
    title: "Moonlit Crystal Meadow",
    original: "moons, crystals, meadow, trees, magic",
    prompt:
      "Eye-level view from a standing position at the edge of a fantastical meadow, gazing westward toward a horizon lit by the surreal glow of multiple moons.\n\nThe landscape unfolds in gentle, undulating hills of velvet-green grass, speckled with radiant bioluminescent motes. Embedded in the ground are clusters of massive, prismatic crystals—each catching the celestial light and refracting it in bursts of color like frozen lightning.\n\nLining the horizon are ancient flowering trees, their branches heavy with cascades of vivid pink blossoms. The trees form a natural colonnade leading the eye toward the horizon, where three moons hang low over a still, glimmering sea. Their golden-orange light merges with the lavender sky, painting the entire scene in warm, dreamlike hues.\n\nBetween the trees float colossal islands suspended in the air, each trailing delicate waterfalls that drift downward in shimmering threads of light. The water never quite reaches the ground—it dissolves into radiant mist, feeding the surreal atmosphere of weightlessness and wonder.\n\nScattered throughout the field are dark, monolithic stones rising like sentinels. The glowing grass flows around them, interrupted only by small, still pools that mirror the alien sky above. The air sparkles with drifting fireflies or stardust, softly glowing in shades of amber and gold.\n\nThe entire space hums with gentle energy—a world between dreams and stars, suspended in perfect stillness. The alignment of moons, crystals, and floating isles gives the feeling of a place not just beautiful, but sacred. A realm untouched by time.\n\nPhotorealistic, highly detailed, 8k resolution, razor-sharp textures, cinematic lighting.",
    imageSrc: "/moon/moon.png",
    imageAlt:
      "Fantastical meadow with bioluminescent grass, prismatic crystals, and three moons hanging over a glimmering sea, featuring floating islands with waterfalls and ancient flowering trees",
    audioSrc: "/moon/moon.mp3",
    videoSrc: "/moon/moon.mp4",
  },
  {
    name: "bridge",
    id: "sunlit-glade-stone-bridge",
    title: "Mountain Sanctuary",
    original: "flowers, bridge, willow, waterfall, serenity",
    prompt:
      "Eye-level view from a kneeling position at the edge of a sunlit forest path, gazing across a serene glade toward a stone bridge arching over tranquil water.\n\nThe ground beneath is soft with vibrant green grass, dappled with wildflowers in every hue—lilac, daisy-white, poppy-orange, and violet. Smooth stones form a natural walkway that winds gently through the glade, drawing the eye toward the still pond at its center.\n\nA graceful stone bridge spans the pond, its ancient arch crowned with flowering moss. Beyond it, three elegant waterfalls pour into the water from a rocky ledge, their silver ribbons misting the air with light and motion. The surface of the pond reflects the falls and bridge in perfect clarity, disturbed only by occasional ripples from unseen fish below.\n\nFraming the scene are tall, slender willow trees, their silvery-green leaves cascading down like curtains. Sunlight streams in from above, filtered through the branches in luminous beams, giving the entire glade a golden, almost sacred atmosphere.\n\nIn the distance, purple flowering bushes hug the water's edge, glowing softly in the morning light. Carved stone lanterns are scattered discreetly among the foliage, suggesting the remnants of a forgotten garden or a hidden shrine. Ferns and flowering vines climb the moss-covered rocks behind the waterfalls, merging seamlessly into the natural surroundings.\n\nThere is no movement, no sound, save for the soft whisper of falling water. The air is crisp and cool, fragrant with blossoms and moss. A place of quiet memory and timeless peace.\n\nPhotorealistic, highly detailed, 8k resolution, cinematic composition, soft natural lighting.",
    imageSrc: "/bridge/bridge.png",
    imageAlt:
      "Serene sunlit glade with stone bridge over pond, three waterfalls, willow trees, and wildflowers, featuring ancient lanterns and flowering moss",
    audioSrc: "/bridge/bridge.mp3",
    videoSrc: "/bridge/bridge.mp4",
  },
];

export function ScenarioShowcase() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentScenarioIndex = scenarios.findIndex(
    (scenario) => scenario.id === activeScenario
  );
  const currentScenario = scenarios[currentScenarioIndex];

  const nextScenario = () => {
    const nextIndex = (currentScenarioIndex + 1) % scenarios.length;
    setActiveScenario(scenarios[nextIndex].id);
    setIsPlayingAudio(false);
    setIsPlayingVideo(false);
    audioRef.current?.pause();
    videoRef.current?.pause();
  };

  const prevScenario = () => {
    const prevIndex =
      currentScenarioIndex === 0
        ? scenarios.length - 1
        : currentScenarioIndex - 1;
    setActiveScenario(scenarios[prevIndex].id);
    setIsPlayingAudio(false);
    setIsPlayingVideo(false);
    audioRef.current?.pause();
    videoRef.current?.pause();
  };

  // Pause any playing media when switching scenarios.
  useEffect(() => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    setIsPlayingAudio(false);
    setIsPlayingVideo(false);
  }, [activeScenario]);

  return (
    <div className="space-y-8">
      <Tabs
        value={activeScenario}
        onValueChange={setActiveScenario}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Meditation Scenarios</h2>
          <TabsList>
            {scenarios.map((scenario) => (
              <TabsTrigger
                key={scenario.id}
                value={scenario.id}
                onClick={() => {
                  setIsPlayingAudio(false);
                  setIsPlayingVideo(false);
                }}
              >
                {scenario.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {scenarios.map((scenario) => (
          <TabsContent
            key={scenario.id}
            value={scenario.id}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-8">
                  {/* Scenario Title */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">
                      {scenario.title}
                    </h3>
                    <div className="flex justify-center gap-2">
                      <Badge variant="outline" className="bg-primary/10">
                        Location
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Meditation
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10">
                        Immersive
                      </Badge>
                    </div>
                  </div>

                  {/* Original Prompt */}
                  <div className="space-y-2 bg-muted/30 p-4 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Original Prompt
                      </Badge>
                      <h4 className="text-sm font-medium">User Input</h4>
                    </div>
                    <p className="text-muted-foreground italic">
                      {scenario.original}
                    </p>
                  </div>

                  {/* Text Prompt */}
                  <div className="space-y-2 bg-muted/30 p-4 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Rewritten Prompt
                      </Badge>
                      <h4 className="text-sm font-medium">
                        Location Description
                      </h4>
                    </div>
                    <p className="text-muted-foreground italic">
                      {scenario.prompt}
                    </p>
                  </div>

                  {/* Generated Image */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Generated Image
                      </Badge>
                      <h4 className="text-sm font-medium">
                        Visual Representation
                      </h4>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src={scenario.imageSrc || "/placeholder.svg"}
                        alt={scenario.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Audio Block */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Audio
                      </Badge>
                      <h4 className="text-sm font-medium">
                        Ambient Soundscape
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 p-4 border rounded-md bg-muted/30">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (!isPlayingAudio) {
                            audioRef.current?.play();
                            setIsPlayingAudio(true);
                          } else {
                            audioRef.current?.pause();
                            setIsPlayingAudio(false);
                          }
                        }}
                        className="h-10 w-10 rounded-full"
                      >
                        {isPlayingAudio ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Headphones className="h-4 w-4" />
                        )}
                      </Button>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`bg-primary h-full transition-all duration-300`}
                          style={{
                            width: audioRef.current
                              ? `${
                                  (audioRef.current.currentTime /
                                    audioRef.current.duration) *
                                  100
                                }%`
                              : "0%",
                          }}
                          ref={(el) => {
                            if (audioRef.current) {
                              audioRef.current.ontimeupdate = () => {
                                if (el) {
                                  el.style.width = `${
                                    (audioRef.current!.currentTime /
                                      audioRef.current!.duration) *
                                    100
                                  }%`;
                                }
                              };
                            }
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {isPlayingAudio ? "Playing..." : "Paused"}
                      </span>
                    </div>
                    {/* Hidden audio element */}
                    <audio
                      ref={audioRef}
                      src={scenario.audioSrc}
                      onEnded={() => setIsPlayingAudio(false)}
                      preload="metadata"
                      style={{ display: "none" }}
                    />
                  </div>

                  {/* Video Block */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Video
                      </Badge>
                      <h4 className="text-sm font-medium">Animated Scene</h4>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted/30 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (!isPlayingVideo) {
                            setIsPlayingVideo(true);
                          } else {
                            videoRef.current?.pause();
                            setIsPlayingVideo(false);
                          }
                        }}
                        className="h-12 w-12 rounded-full absolute z-10"
                      >
                        {isPlayingVideo ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Video className="h-6 w-6" />
                        )}
                      </Button>
                      {isPlayingVideo ? (
                        <video
                          ref={videoRef}
                          src={scenario.videoSrc}
                          autoPlay
                          controls
                          onEnded={() => setIsPlayingVideo(false)}
                          className="absolute inset-0 object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          src={scenario.imageSrc || "/placeholder.svg"}
                          alt={`Video thumbnail for ${scenario.title}`}
                          fill
                          className="object-cover opacity-60"
                        />
                      )}
                    </div>
                  </div>

                  {/* VR Block */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        VR Experience
                      </Badge>
                      <h4 className="text-sm font-medium">
                        Immersive Environment
                      </h4>
                    </div>
                    <div className="relative aspect-video border-2 border-dashed rounded-lg bg-muted/10 overflow-hidden">
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 z-10 cursor-pointer"
                        onClick={() => {
                          window.location.href = `/${currentScenario.name}`;
                        }}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                      <SplatViewer
                        key={currentScenario.name}
                        splat={currentScenario.name}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevScenario}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Scenario
              </Button>
              <Button variant="outline" onClick={nextScenario}>
                Next Scenario
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
