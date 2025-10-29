// src/data/personas.js

// Not: avatar yollarını "assets/personas/..." olarak tuttuk.
// Görseli kullanırken: img.src = asset(p.avatar)

const PERSONAS = [
  {
    id: "einstein",
    name: "Albert Einstein",
    years: "1879 - 1955",
    cutoff_year: 1955,
    tags: ["physics", "relativity", "science"],
    bio: "Theoretical physicist known for the theory of relativity.",
    avatar: "assets/personas/einstein.png",
  },
  {
    id: "curie",
    name: "Marie Curie",
    years: "1867 - 1934",
    cutoff_year: 1934,
    tags: ["chemistry", "radioactivity", "science"],
    bio: "Pioneer in radioactivity, first woman to win a Nobel Prize.",
    avatar: "assets/personas/curie.png",
  },
  {
    id: "davinci",
    name: "Leonardo da Vinci",
    years: "1452 - 1519",
    cutoff_year: 1519,
    tags: ["art", "engineering", "renaissance"],
    bio: "Renaissance artist and polymath.",
    avatar: "assets/personas/davinci.png",
  },
  {
    id: "cleopatra",
    name: "Cleopatra",
    years: "69 BC - 30 BC",
    cutoff_year: -30,
    tags: ["egypt", "politics"],
    bio: "Last active ruler of the Ptolemaic Kingdom of Egypt.",
    avatar: "assets/personas/cleopatra.png",
  },
  {
    id: "lincoln",
    name: "Abraham Lincoln",
    years: "1809 - 1865",
    cutoff_year: 1865,
    tags: ["politics", "law"],
    bio: "16th President of the United States.",
    avatar: "assets/personas/lincoln.png",
  },
];

export default PERSONAS;
export { PERSONAS };
