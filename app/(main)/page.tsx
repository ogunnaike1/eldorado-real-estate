
import CSRSection from "../components/home/CSRSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import ProjectFilter from "../components/home/ProjectsFilter";
import Testimonials from "../components/home/Testimonials";
import CEOProfile from "../components/about/CEOprofile";

export default function Home() {
  return (
    <div>
         <Hero />
      <FeaturedProjects />
      <CSRSection />
      <ProjectFilter />
      <CEOProfile />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
