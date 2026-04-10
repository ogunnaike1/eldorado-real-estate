import AboutHero from "../../components/about/AboutHero";
import StorySection from "../../components/about/StorySection";

import ValuesSection from "../../components/about/ValuesSection";
import CEOProfile from "../../components/about/CEOprofile";
import MilestonesTimeline from "../../components/about/MilestonesTimeline";
import AboutCTA from "../../components/about/AboutCTA";

export const metadata = {
  title: "About Us | Eldorado Real Estate",
  description:
    "Learn about Eldorado Real Estate — our story, values, leadership team, and the milestones that shaped us into a leading luxury real estate brand.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <CEOProfile />
      <MilestonesTimeline />
      <AboutCTA />
    </>
  );
}