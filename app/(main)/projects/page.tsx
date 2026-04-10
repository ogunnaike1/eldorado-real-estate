import ProjectsHero from "../../components/projects/ProjectsHero";
import ProjectsGrid from "../../components/projects/ProjectsGrid";

export const metadata = {
  title: "Projects | Eldorado Real Estate",
  description: "Explore Eldorado's portfolio of luxury residential, commercial, and hospitality developments across Nigeria.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
    </>
  );
}