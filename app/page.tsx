"use client";

import { useState } from "react";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { IdeaCard } from "@/components/IdeaCard";
import { Idea } from "@/model/Idea";

export default function Home() {
  const [generatingError, setGeneratingError] = useState<string>("");
  const [generatedIdeas, setGeneratedIdeas] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  async function generateIdea() {
    setGeneratedIdeas("");
    setGeneratingError("");
    setIsGenerating(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (!response.ok) {
      setIsGenerating(false);
      setGeneratingError(response.statusText);
      return;
    }

    const data = response.body;
    console.log(data);
    if (!data) {
      setIsGenerating(false);
      setGeneratingError("Failed to generate ideas. No data.");
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedIdeas((prev) => prev + chunkValue);
    }

    setIsGenerating(false);
    console.log(generatedIdeas);
  }
  function makeIdeaFromStreamData(data: string): Idea {
    const titlePattern = /title:\s*(.*)\s*description:/i;
    const descriptionPattern = /description:\s*(.*)/i;

    const titleMatch = data.match(titlePattern);
    const descriptionMatch = data.match(descriptionPattern);

    const title = titleMatch ? titleMatch[1] : "";
    const description = descriptionMatch ? descriptionMatch[1] : "";

    return {
      title,
      description,
    };
  }
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Generate your<br></br></h1>
        <h1 className={title({ color: "blue" })}>Hyper Idea&nbsp;</h1>
        <br />
        <h1 className={title()}>
        to build on Hyperlane.
        </h1> 
        <h2 className={subtitle({ class: "mt-4" })}>
          Your idea to build on Hyperlane is one tap away
        </h2>
      </div>
      <Button
        size="lg"
        color="primary"
        isLoading={isGenerating}
        onClick={async () => {
          await generateIdea();
        }}
      >
        Generate
      </Button>

      {generatedIdeas &&
        generatedIdeas
          .substring(generatedIdeas.indexOf("1") + 3)
          .split("2.")
          .map((data: string) => {
            const idea = makeIdeaFromStreamData(data);
            return <IdeaCard key={idea.title} idea={idea} />;
          })}
    </section>
  );
}
