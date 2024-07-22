export const Languages = {
  en: "English",
  tr: "Türkçe",
};

export const LanguagesDropdown = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "tr", label: "Türkçe", flag: "🇹🇷" },
];

export const defaultLang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "categories.Programming": "Programming",
    "categories.Travel": "Travel",
    "post.minRead": "min read",
    "post.backToBlog": "Back to Blog",
    "post.readMore": "Read More",
  },
  tr: {
    "nav.home": "Anasayfa",
    "nav.blog": "Blog",
    "categories.Programming": "Programlama",
    "categories.Travel": "Seyahat",
    "post.minRead": "dakika okuma",
    "post.backToBlog": "Yazılara Geri Dön",
    "post.readMore": "Devamını Oku",
  },
} as const;
