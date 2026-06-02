export interface Project {
  id: number;
  slug: string;
  title: string;
  category: 'Résidentiel' | 'Retail' | 'Hospitality';
  image: string;
  aspect: string;
  description: string;
  details: {
    year: string;
    location: string;
    area: string;
    client: string;
  };
  color: string;
  logoText: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "maison-travertine",
    title: "Maison Travertine",
    category: "Résidentiel",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    aspect: "aspect-[3/4]",
    description: "A modern residential masterpiece combining traditional materials with contemporary design principles.",
    details: {
      year: "2025",
      location: "Paris, France",
      area: "450 m²",
      client: "Private"
    },
    color: "#3F4E3F",
    logoText: "ms"
  },
  {
    id: 2,
    slug: "le-pavilion-retail",
    title: "Le Pavilion Retail",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
    aspect: "aspect-[4/3]",
    description: "Contemporary retail space that redefines the shopping experience through architectural innovation.",
    details: {
      year: "2025",
      location: "Lyon, France",
      area: "800 m²",
      client: "Luxury Brand"
    },
    color: "#9E826C",
    logoText: "ms"
  },
  {
    id: 3,
    slug: "l-oasis-lounge",
    title: "L'Oasis Lounge",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    aspect: "aspect-[1/1]",
    description: "An intimate hospitality space that merges comfort with sophisticated design elements.",
    details: {
      year: "2024",
      location: "Nice, France",
      area: "350 m²",
      client: "Boutique Hotel"
    },
    color: "#5C3A21",
    logoText: "ms"
  },
  {
    id: 4,
    slug: "villa-concrete",
    title: "Villa Concrete",
    category: "Résidentiel",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800",
    aspect: "aspect-[4/3]",
    description: "Brutalist-inspired residential architecture celebrating raw materials and honest construction.",
    details: {
      year: "2024",
      location: "Marseille, France",
      area: "520 m²",
      client: "Private"
    },
    color: "#4A525A",
    logoText: "ms"
  },
  {
    id: 5,
    slug: "the-sanctuary",
    title: "The Sanctuary",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800",
    aspect: "aspect-[1/1]",
    description: "A serene retreat space designed to provide tranquility and connection with nature.",
    details: {
      year: "2024",
      location: "Bordeaux, France",
      area: "600 m²",
      client: "Wellness Resort"
    },
    color: "#2C3539",
    logoText: "ms"
  },
  {
    id: 6,
    slug: "galerie-moderne",
    title: "Galerie Moderne",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
    aspect: "aspect-[3/4]",
    description: "Contemporary gallery space that serves as both art venue and architectural statement.",
    details: {
      year: "2023",
      location: "Paris, France",
      area: "400 m²",
      client: "Art Collective"
    },
    color: "#8E5B3C",
    logoText: "ms"
  },
  {
    id: 7,
    slug: "aero-penthouse",
    title: "Aero Penthouse",
    category: "Résidentiel",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
    aspect: "aspect-[1/1]",
    description: "Sky-high urban living space with panoramic views and refined modern interiors.",
    details: {
      year: "2023",
      location: "Paris, France",
      area: "380 m²",
      client: "Private"
    },
    color: "#8C92AC",
    logoText: "ms"
  },
  {
    id: 8,
    slug: "brutalist-oasis",
    title: "Brutalist Oasis",
    category: "Résidentiel",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
    aspect: "aspect-[3/4]",
    description: "Bold architectural expression combining brutalist aesthetics with livable comfort.",
    details: {
      year: "2023",
      location: "Toulouse, France",
      area: "490 m²",
      client: "Private"
    },
    color: "#4F4A41",
    logoText: "ms"
  },
  {
    id: 9,
    slug: "ethereal-showroom",
    title: "Ethereal Showroom",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800",
    aspect: "aspect-[4/3]",
    description: "Light-filled commercial space that showcases products through thoughtful spatial design.",
    details: {
      year: "2023",
      location: "Cannes, France",
      area: "550 m²",
      client: "Design Brand"
    },
    color: "#7D6B58",
    logoText: "ms"
  }
];
