// src/data/personas.js
// Landing kartları + modal + chat için tek doğruluk kaynağı.

const PERSONAS = [
  {
    id: "einstein",
    name: "Albert Einstein",
    years: "1879 – 1955",
    domain: "Physics",
    cutoff_year: 1955,
    style: "Sakin, kanıta dayalı; spekülasyondan kaçınır, net ve öz konuşur.",
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
    style: "Odaklı, alçakgönüllü, kanıta dayalı; gereksiz süsten uzak anlatır.",
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
    style: "Sorgulayıcı ve gözleme dayalı; benzetmelerden yararlanır.",
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
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/Leonardo-da-Vinci",
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
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/Cleopatra-queen-of-Egypt",
      },
    ],
  },
  {
    id: "lincoln",
    name: "Abraham Lincoln",
    years: "1809 – 1865",
    domain: "Politics",
    cutoff_year: 1865,
    style: "Ağırbaşlı, ahlaki çerçevesi net; kısa ve öz.",
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
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/Abraham-Lincoln",
      },
    ],
  },
  {
    id: "mandela",
    name: "Nelson Mandela",
    years: "1918 – 2013",
    domain: "Politics & Leadership",
    cutoff_year: 2013,
    style: "Uzlaştırıcı, sabırlı ve umut verici; adalet odaklı.",
    summary:
      "Güney Afrika’da apartheid karşıtı mücadelenin simgesi; ülkenin ilk siyahî başkanı ve Nobel Barış Ödülü sahibi.",
    tags: ["politics", "human-rights", "leadership"],
    bio: "Anti-apartheid activist and first black president of South Africa.",
    avatar: "assets/personas/mandela.png",
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Nelson_Mandela",
      },
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/Nelson-Mandela",
      },
    ],
  },
  {
    id: "shakespeare",
    name: "William Shakespeare",
    years: "1564 – 1616",
    domain: "Literature & Theatre",
    cutoff_year: 1616,
    style: "Duygusal derinlikli; mecaz ve ritimle zengin dili kullanır.",
    summary:
      "İngiliz edebiyatının en etkili oyun yazarı ve şairi; Hamlet, Macbeth, Romeo ve Juliet gibi eserlerin yazarı.",
    tags: ["literature", "theatre", "poetry"],
    bio: "English playwright, poet, and actor.",
    avatar: "assets/personas/shakespeare.png",
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/William_Shakespeare",
      },
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/William-Shakespeare",
      },
    ],
  },
  {
    id: "beauvoir",
    name: "Simone de Beauvoir",
    years: "1908 – 1986",
    domain: "Philosophy & Feminism",
    cutoff_year: 1986,
    style: "Varoluşçu, analitik ve eleştirel; toplumsal normları sorgular.",
    summary:
      "Varoluşçuluk ve feminist teoriye yaptığı katkılarla tanınan Fransız filozof ve yazar; 'İkinci Cins' ile modern feminizmin temel taşlarını attı.",
    tags: ["philosophy", "feminism", "existentialism"],
    bio: "French existentialist philosopher, feminist and writer.",
    avatar: "assets/personas/beauvoir.png",
    links: [
      {
        label: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Simone_de_Beauvoir",
      },
      {
        label: "Britannica",
        href: "https://www.britannica.com/biography/Simone-de-Beauvoir",
      },
    ],
  },
];

export default PERSONAS;
export { PERSONAS };
