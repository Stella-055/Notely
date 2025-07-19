import Faqs from "@/components/plan/Faqs";
import Contact from "../components/Contact";
import Experts from "../components/Enterprise/Experts";
import Hero from "../components/plan/Hero";
import Price from "../components/plan/Price";
const Plans = () => {
  return (
    <>
      <div>
        <Hero />
        <Price />
        <Experts />
        <Faqs />
        <Contact />
      </div>
    </>
  );
};

export default Plans;
