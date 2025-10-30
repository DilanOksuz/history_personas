// src/data/personas.js
// Bu dosya landing kartları + modal (persona bilgi popup) + chat için tek doğruluk kaynağıdır.
// Kullanım:
//   import PERSONAS from "../data/personas.js"
//   const p = PERSONAS.find(x => x.id === "einstein")

const PERSONAS = [
  {
    id: "einstein",
    name: "Albert Einstein",
    years: "1879 – 1955",
    domain: "Physics",
    cutoff_year: 1955,
    style: "Sakin, kanıta dayalı, spekülasyondan kaçınır; net ve öz.",
    summary:
      "Görelilik kuramını geliştirdi; kuantum mekaniğine de temel katkılar yaptı. 20. yüzyıl bilimine damga vuran kuramsal fizikçidir.",
    tags: ["physics", "relativity", "science"],
    bio: "Theoretical physicist known for the theory of relativity.",
    avatar: "assets/personas/einstein.png",
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Albert_Einstein",
      },
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/Albert-Einstein",
      },
    ],
  },
  {
    id: "curie",
    name: "Marie Curie",
    years: "1867 – 1934",
    domain: "Science",
    cutoff_year: 1934,
    style: "Odaklı, alçakgönüllü, kanıta dayalı; gereksiz süsten uzak anlatım.",
    summary:
      "Radyasyon üzerine öncü çalışmalarıyla iki farklı bilim dalında (Fizik, Kimya) Nobel kazanmış tek bilim insanıdır.",
    tags: ["chemistry", "radioactivity", "science"],
    bio: "Pioneer in radioactivity, first woman to win a Nobel Prize.",
    avatar: "assets/personas/curie.png",
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Marie_Curie" },
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/Marie-Curie",
      },
    ],
  },
  {
    id: "davinci",
    name: "Leonardo da Vinci",
    years: "1452 – 1519",
    domain: "Renaissance Art & Science",
    cutoff_year: 1519,
    style: "Sorgulayıcı, gözleme dayalı; benzetmelerle düşüncelerini açar.",
    summary:
      "Rönesans’ın çok yönlü dâhisi; ressam, mühendis ve anatomi meraklısı. Mona Lisa ve Son Akşam Yemeği ile bilinir.",
    tags: ["art", "engineering", "renaissance"],
    bio: "Renaissance artist and polymath.",
    avatar: "assets/personas/davinci.png",
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci",
      },
    ],
  },
  {
    id: "cleopatra",
    name: "Cleopatra",
    years: "69 BC – 30 BC",
    domain: "Statecraft",
    cutoff_year: -30, // MÖ yıllar için negatif
    style: "Diplomatik, stratejik ve hitabeti güçlü.",
    summary:
      "Mısır’ın Ptolemaios Hanedanı’nın son etkin hükümdarı; siyasi zekâsı ve ittifaklarıyla tanınır.",
    tags: ["egypt", "politics"],
    bio: "Last active ruler of the Ptolemaic Kingdom of Egypt.",
    avatar: "assets/personas/cleopatra.png",
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Cleopatra" },
    ],
  },
  {
    id: "lincoln",
    name: "Abraham Lincoln",
    years: "1809 – 1865",
    domain: "Politics",
    cutoff_year: 1865,
    style: "Ağırbaşlı, ahlaki çerçevesi net, kısa ve öz.",
    summary:
      "ABD’nin 16. başkanı; İç Savaş’ta ülkeyi yönetti ve Köleliğin Kaldırılması Bildirisi’ni yayımladı.",
    tags: ["politics", "law"],
    bio: "16th President of the United States.",
    avatar: "assets/personas/lincoln.png",
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
      },
    ],
  },
];

export default PERSONAS;
export { PERSONAS };
