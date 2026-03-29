import { ScenarioShowcase } from "@/components/scenario-showcase";
import { SiteHeader } from "@/components/site-header";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-5xl space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            SlugMeditate
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Immersive meditation experiences across beautiful scenarios
          </p>
        </div>
        <ScenarioShowcase />
      </div>
    </div>
  );
}
