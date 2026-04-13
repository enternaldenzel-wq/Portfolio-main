import img17 from "@/assets/Archive/img17.jpg";
import img18 from "@/assets/Archive/img18.jpg";
import img19 from "@/assets/Archive/img19.jpg";
import img20 from "@/assets/Archive/img20.jpg";
import img36 from "@/assets/Archive/img36.jpg";
import img37 from "@/assets/Archive/img37.jpg";
import img43 from "@/assets/Archive/img43.jpg";
import img45 from "@/assets/Archive/img45.jpg";
import img46 from "@/assets/Archive/img46.jpg";
import img51 from "@/assets/Archive/img51.jpg";
import img52 from "@/assets/Archive/img52.jpg";
import img56 from "@/assets/Archive/img56.jpg";
import img57 from "@/assets/Archive/img57.jpg";
import img61 from "@/assets/Archive/img61.jpg";
import img77 from "@/assets/Archive/img77.jpg";
import img78 from "@/assets/Archive/img78.jpg";

export interface ArchiveEntry {
  id: string;
  title: string;
  category: "Photography" | "Graphic Design" | "Landing Page" | "Experiment";
  year: string;
  image: string;
  note?: string;
}

export const archiveEntries: ArchiveEntry[] = [
  {
    id: "arch-17",
    title: "Cinematic Still I",
    category: "Landing Page",
    year: "2023",
    image: img17
  },
  {
    id: "arch-18",
    title: "Urban Composition",
    category: "Landing Page",
    year: "2023",
    image: img18
  },
  {
    id: "arch-19",
    title: "Visual Identity Study",
    category: "Landing Page",
    year: "2022",
    image: img19
  },
  {
    id: "arch-20",
    title: "Digital Flow",
    category: "Landing Page",
    year: "2023",
    image: img20
  },
  {
    id: "arch-36",
    title: "Typography Experiment",
    category: "Photography",
    year: "2023",
    image: img36
  },
  {
    id: "arch-37",
    title: "Portrait Series",
    category: "Photography",
    year: "2023",
    image: img37
  },
  {
    id: "arch-43",
    title: "Abstract Narrative",
    category: "Photography",
    year: "2024",
    image: img43
  },
  {
    id: "arch-45",
    title: "UI Concept - Night",
    category: "Photography",
    year: "2023",
    image: img45
  },
  {
    id: "arch-46",
    title: "Symmetry in Motion",
    category: "Photography",
    year: "2024",
    image: img46
  },
  {
    id: "arch-51",
    title: "Brand Artifact",
    category: "Photography",
    year: "2022",
    image: img51,
    note: "with MightyEVE"
  },
  {
    id: "arch-52",
    title: "Light & Shadow",
    category: "Photography",
    year: "2023",
    image: img52,
    note: "with MightyEVE"
  },
  {
    id: "arch-56",
    title: "Texture Exploration",
    category: "Photography",
    year: "2024",
    image: img56
  },
  {
    id: "arch-57",
    title: "Vivid Geometry",
    category: "Photography",
    year: "2023",
    image: img57
  },
  {
    id: "arch-61",
    title: "E-commerce WIP",
    category: "Photography",
    year: "2023",
    image: img61
  },
  {
    id: "arch-77",
    title: "The Silent Street",
    category: "Graphic Design",
    year: "2023",
    image: img77
  },
  {
    id: "arch-78",
    title: "Final Archive Still",
    category: "Graphic Design",
    year: "2024",
    image: img78
  }
];
