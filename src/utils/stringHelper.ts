export function shuffle(str: string): string {
  const a = str.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }

  return a.join("");
}

export function shufflePhrase(phrase: string, separator = " "): string {
  const words = phrase.split(separator);
  for (let i = 0; i < words.length; i++) {
    words[i] = shuffle(words[i]);
  }

  return words.join(separator);
}
