"use client";

import ProjectGallery from "../project-detail/ProjectGallery";
import ProjectInfo from "../project-detail/ProjectInfo";
import ProjectAmenities from "../project-detail/ProjectAmenities";
import ProjectFloorPlans from "../project-detail/ProjectFloorPlans";
import ProjectLocation from "../project-detail/ProjectLocation";
import ProjectInquiry from "../project-detail/ProjectInquiry";
import type { Project } from "../lib/projectData";

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <>
      <ProjectGallery project={project} />
      <ProjectInfo project={project} />
      <ProjectAmenities amenities={project.amenities} />
      <ProjectFloorPlans floorPlans={project.floorPlans} />
      <ProjectLocation project={project} />
      <ProjectInquiry project={project} />
    </>
  );
}