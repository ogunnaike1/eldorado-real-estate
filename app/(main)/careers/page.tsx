import CareersHero from "../../components/careers/CareersHero";
import WhyEldorado from "../../components/careers/WhyEldorado";
import OpenRoles from "../../components/careers/OpenRoles";
import CareersLife from "../../components/careers/CareersLife";

export const metadata = { title: "Careers | Eldorado Real Estate", description: "Join the team behind Nigeria's most prestigious real estate brand. Explore open positions at Eldorado." };

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <WhyEldorado />
      <OpenRoles />
      <CareersLife />
    </>
  );
}