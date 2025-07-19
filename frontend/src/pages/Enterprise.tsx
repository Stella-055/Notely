import Heroenterprise from "../components/Enterprise/Heroenterprise";

import Companies from "../components/Enterprise/Companies";
import Experts from "../components/Enterprise/Experts";
import Experience from "../components/Enterprise/Experience";
import Contact from "../components/Contact";
const Enterprise = () => {
  return (
    <>
      <div>
        <Heroenterprise />
        <Companies />
        <Experts />
        <Experience />
        <Contact />
      </div>
    </>
  );
};

export default Enterprise;
