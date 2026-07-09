import Scene from "./components/Scene";
import Chrome from "./components/Chrome";
import Genesis from "./sections/Genesis";
import Craft from "./sections/Craft";
import Method from "./sections/Method";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import { useSmoothScroll } from "./lib/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Scene />
      <Chrome />
      <main>
        <Genesis />
        <Craft />
        <Method />
        <Work />
        <Contact />
      </main>
    </>
  );
}
