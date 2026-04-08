type GameStatus = "playing" | "won" | "lost";

interface GameState {
  word: string;
  category: string;
  hint: string;
  hintType: string;
  guessed: Set<string>;
  misses: number;
  status: GameStatus;
}

interface DomRefs {
  category: HTMLElement;
  hintType: HTMLElement;
  hintText: HTMLElement;
  hintMeta: HTMLElement;
  wordBoard: HTMLElement;
  lettersBoard: HTMLElement;
  missCount: HTMLElement;
  maxMissCount: HTMLElement;
  gallowsParts: HTMLElement[];
  resultOverlay: HTMLElement;
  resultTitle: HTMLElement;
  resultMessage: HTMLElement;
  newGameButton: HTMLButtonElement;
  playAgainButton: HTMLButtonElement;
}

interface WordEntry {
  word: string;
  hint: string;
  hintType: string;
}

type WordBank = Record<string, WordEntry[]>;

const WORD_BANK: WordBank = {
  movies: [
    {
      word: "blade runner",
      hint: "A futuristic movie about tracking human-like replicants.",
      hintType: "Scene clue",
    },
    {
      word: "inception",
      hint: "A film where teams enter layered dreams to plant ideas.",
      hintType: "Scene clue",
    },
    {
      word: "interstellar",
      hint: "Space travel through wormholes to save humanity.",
      hintType: "Scene clue",
    },
    {
      word: "the matrix",
      hint: "A hacker discovers reality is a simulation.",
      hintType: "Scene clue",
    },
    {
      word: "spirited away",
      hint: "An animated journey through a magical spirit world.",
      hintType: "Scene clue",
    },
    {
      word: "mad max",
      hint: "A high-speed action movie set in a desert wasteland.",
      hintType: "Scene clue",
    },
    {
      word: "parasite",
      hint: "Oscar-winning thriller about two families from different classes.",
      hintType: "Scene clue",
    },
    {
      word: "the godfather",
      hint: "Classic crime saga centered on a powerful mafia family.",
      hintType: "Scene clue",
    },
    {
      word: "finding nemo",
      hint: "A clownfish crosses the ocean to find his son.",
      hintType: "Scene clue",
    },
    {
      word: "back to the future",
      hint: "A teenager time-travels with a scientist and a special car.",
      hintType: "Scene clue",
    },
  ],
  programming: [
    {
      word: "typescript",
      hint: "JavaScript with static typing for safer code.",
      hintType: "Code clue",
    },
    {
      word: "frontend",
      hint: "The visible part of a web app users interact with.",
      hintType: "Code clue",
    },
    {
      word: "interface",
      hint: "A TypeScript shape contract for objects.",
      hintType: "Code clue",
    },
    {
      word: "compiler",
      hint: "Tool that translates source code into another form.",
      hintType: "Code clue",
    },
    {
      word: "recursion",
      hint: "A function pattern where a function calls itself.",
      hintType: "Code clue",
    },
    {
      word: "debugging",
      hint: "Process of finding and fixing software issues.",
      hintType: "Code clue",
    },
    {
      word: "algorithm",
      hint: "Step-by-step logic to solve a problem.",
      hintType: "Code clue",
    },
    {
      word: "framework",
      hint: "Reusable structure that helps build applications faster.",
      hintType: "Code clue",
    },
    {
      word: "promise",
      hint: "Represents a future result of async work in JavaScript.",
      hintType: "Code clue",
    },
    {
      word: "refactoring",
      hint: "Improving internal code without changing behavior.",
      hintType: "Code clue",
    },
  ],
  countries: [
    {
      word: "japan",
      hint: "Island nation known for sushi, anime, and Mount Fuji.",
      hintType: "Map clue",
    },
    {
      word: "brazil",
      hint: "Largest country in South America, famous for carnival.",
      hintType: "Map clue",
    },
    {
      word: "new zealand",
      hint: "Pacific country known for stunning nature and rugby.",
      hintType: "Map clue",
    },
    {
      word: "morocco",
      hint: "North African country with markets and Sahara gateways.",
      hintType: "Map clue",
    },
    {
      word: "norway",
      hint: "Scandinavian country famous for fjords and northern lights.",
      hintType: "Map clue",
    },
    {
      word: "argentina",
      hint: "South American country known for tango and Patagonia.",
      hintType: "Map clue",
    },
    {
      word: "canada",
      hint: "Second-largest country by area, north of the United States.",
      hintType: "Map clue",
    },
    {
      word: "egypt",
      hint: "Country of the Nile River and ancient pyramids.",
      hintType: "Map clue",
    },
    {
      word: "indonesia",
      hint: "Archipelago nation with thousands of islands in Southeast Asia.",
      hintType: "Map clue",
    },
    {
      word: "mexico",
      hint: "Country south of the United States with rich food culture.",
      hintType: "Map clue",
    },
  ],
  landmarks: [
    {
      word: "eiffel tower",
      hint: "Iron landmark in Paris visited by millions each year.",
      hintType: "Travel clue",
    },
    {
      word: "great wall",
      hint: "Historic defensive structure stretching across China.",
      hintType: "Travel clue",
    },
    {
      word: "taj mahal",
      hint: "White marble mausoleum in India and symbol of love.",
      hintType: "Travel clue",
    },
    {
      word: "machu picchu",
      hint: "Ancient Incan city high in the Andes mountains.",
      hintType: "Travel clue",
    },
    {
      word: "pyramids",
      hint: "Ancient monumental tombs found near Cairo.",
      hintType: "Travel clue",
    },
    {
      word: "colosseum",
      hint: "Roman amphitheater once used for public spectacles.",
      hintType: "Travel clue",
    },
    {
      word: "big ben",
      hint: "Famous clock tower landmark in London.",
      hintType: "Travel clue",
    },
    {
      word: "sydney opera house",
      hint: "Iconic Australian performing arts building by the harbor.",
      hintType: "Travel clue",
    },
    {
      word: "statue of liberty",
      hint: "Gift from France standing in New York Harbor.",
      hintType: "Travel clue",
    },
    {
      word: "mount fuji",
      hint: "Japan's iconic volcano with a near-perfect cone shape.",
      hintType: "Travel clue",
    },
  ],
  science: [
    {
      word: "gravity",
      hint: "Force that pulls objects toward each other.",
      hintType: "Lab clue",
    },
    {
      word: "atom",
      hint: "Smallest basic unit of a chemical element.",
      hintType: "Lab clue",
    },
    {
      word: "x-ray",
      hint: "Imaging method used to see inside the body.",
      hintType: "Lab clue",
    },
    {
      word: "quantum",
      hint: "Physics field dealing with tiny particles and probabilities.",
      hintType: "Lab clue",
    },
    {
      word: "neuron",
      hint: "A nerve cell that carries information in the brain.",
      hintType: "Lab clue",
    },
    {
      word: "ecosystem",
      hint: "Community of organisms interacting with their environment.",
      hintType: "Lab clue",
    },
    {
      word: "photosynthesis",
      hint: "Process plants use to make food from sunlight.",
      hintType: "Lab clue",
    },
    {
      word: "molecule",
      hint: "Group of atoms bonded together.",
      hintType: "Lab clue",
    },
    {
      word: "telescope",
      hint: "Instrument used to observe distant objects in space.",
      hintType: "Lab clue",
    },
    {
      word: "volcano",
      hint: "Mountain that can erupt lava, ash, and gas.",
      hintType: "Lab clue",
    },
  ],
  sports: [
    {
      word: "basketball",
      hint: "Team sport where players score by shooting into a hoop.",
      hintType: "Play clue",
    },
    {
      word: "swimming",
      hint: "Racing and movement sport performed in water.",
      hintType: "Play clue",
    },
    {
      word: "table tennis",
      hint: "Fast racket sport played on a small table.",
      hintType: "Play clue",
    },
    {
      word: "football",
      hint: "The world's most popular sport with goals and a ball.",
      hintType: "Play clue",
    },
    {
      word: "archery",
      hint: "Precision sport using bows and arrows.",
      hintType: "Play clue",
    },
    {
      word: "volleyball",
      hint: "Team sport where players hit the ball over a net.",
      hintType: "Play clue",
    },
    {
      word: "badminton",
      hint: "Racket sport played with a shuttlecock.",
      hintType: "Play clue",
    },
    {
      word: "marathon",
      hint: "Long-distance running race over 42.195 kilometers.",
      hintType: "Play clue",
    },
    {
      word: "baseball",
      hint: "Bat-and-ball game with innings, runs, and home plate.",
      hintType: "Play clue",
    },
    {
      word: "gymnastics",
      hint: "Sport focused on strength, flexibility, and routines.",
      hintType: "Play clue",
    },
  ],
  food: [
    {
      word: "pasta",
      hint: "Italian staple made from dough, often served with sauce.",
      hintType: "Taste clue",
    },
    {
      word: "cheesecake",
      hint: "Creamy dessert with a soft cheese-based filling.",
      hintType: "Taste clue",
    },
    {
      word: "sushi",
      hint: "Japanese dish with vinegared rice and toppings.",
      hintType: "Taste clue",
    },
    {
      word: "taco",
      hint: "Folded tortilla filled with meat, beans, or vegetables.",
      hintType: "Taste clue",
    },
    {
      word: "olive oil",
      hint: "Cooking oil pressed from olives.",
      hintType: "Taste clue",
    },
    {
      word: "chocolate",
      hint: "Sweet treat made from cocoa beans.",
      hintType: "Taste clue",
    },
    {
      word: "croissant",
      hint: "Buttery French pastry with flaky layers.",
      hintType: "Taste clue",
    },
    {
      word: "burger",
      hint: "Popular sandwich with a patty in a bun.",
      hintType: "Taste clue",
    },
    {
      word: "pancakes",
      hint: "Flat breakfast cakes often topped with syrup.",
      hintType: "Taste clue",
    },
    {
      word: "lasagna",
      hint: "Layered pasta dish baked with sauce and cheese.",
      hintType: "Taste clue",
    },
  ],
  animals: [
    {
      word: "elephant",
      hint: "Large land mammal known for its trunk.",
      hintType: "Nature clue",
    },
    {
      word: "dolphin",
      hint: "Intelligent sea mammal known for playful behavior.",
      hintType: "Nature clue",
    },
    {
      word: "kangaroo",
      hint: "Marsupial famous for hopping and carrying young in a pouch.",
      hintType: "Nature clue",
    },
    {
      word: "penguin",
      hint: "Flightless bird adapted for swimming in cold regions.",
      hintType: "Nature clue",
    },
    {
      word: "butterfly",
      hint: "Insect with colorful wings and complete metamorphosis.",
      hintType: "Nature clue",
    },
    {
      word: "giraffe",
      hint: "Tall African mammal with a very long neck.",
      hintType: "Nature clue",
    },
    {
      word: "octopus",
      hint: "Sea creature with eight arms and high intelligence.",
      hintType: "Nature clue",
    },
    {
      word: "cheetah",
      hint: "Fastest land animal over short distances.",
      hintType: "Nature clue",
    },
    {
      word: "polar bear",
      hint: "Large Arctic predator with white fur.",
      hintType: "Nature clue",
    },
    {
      word: "hummingbird",
      hint: "Tiny bird able to hover by rapidly flapping wings.",
      hintType: "Nature clue",
    },
  ],
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_MISSES = 8;

class HangmanGame {
  private state: GameState;
  private readonly refs: DomRefs;
  private readonly maxMisses = MAX_MISSES;

  constructor() {
    this.refs = this.collectDomRefs();
    this.state = this.createState();
    this.refs.maxMissCount.textContent = String(this.maxMisses);

    this.bindEvents();
    this.render();
  }

  private readonly handleKeyboardInput = (event: KeyboardEvent) => {
    if (this.state.status !== "playing" || event.repeat) return;

    const keyLetter = this.normalizeLetter(event.key);
    if (!this.isPlayableLetter(keyLetter)) return;

    this.handleGuess(keyLetter);
  };

  private bindEvents(): void {
    this.refs.newGameButton.addEventListener("click", () => {
      this.startNewRound();
    });

    this.refs.playAgainButton.addEventListener("click", () => {
      this.startNewRound();
    });

    this.refs.lettersBoard.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const letterButton = target.closest<HTMLButtonElement>(
        "button[data-letter]",
      );
      if (!letterButton || !letterButton.dataset.letter) {
        return;
      }

      this.handleGuess(letterButton.dataset.letter);
    });

    window.addEventListener("keydown", this.handleKeyboardInput);
  }

  private startNewRound(): void {
    this.state = this.createState();
    this.hideResult();
    this.render();
  }

  private handleGuess(rawLetter: string): void {
    if (this.state.status !== "playing") {
      return;
    }

    const letter = this.normalizeLetter(rawLetter);
    if (!this.isPlayableLetter(letter) || this.state.guessed.has(letter)) {
      return;
    }

    this.state.guessed.add(letter);

    if (!this.state.word.includes(letter)) {
      this.state.misses += 1;
    }

    this.state.status = this.resolveStatus();
    this.render();
  }

  private resolveStatus(): GameStatus {
    if (this.hasSolvedWord()) {
      return "won";
    }

    if (this.state.misses >= this.maxMisses) {
      return "lost";
    }

    return "playing";
  }

  private hasSolvedWord(): boolean {
    const requiredLetters = new Set<string>(
      this.getPlayableLetters(this.state.word),
    );

    return [...requiredLetters].every((letter) =>
      this.state.guessed.has(letter),
    );
  }

  private getPlayableLetters(value: string): string[] {
    return [...value].filter((char) => this.isPlayableLetter(char));
  }

  private render(): void {
    this.renderCategory();
    this.renderHint();
    this.renderWordBoard();
    this.renderLettersBoard();
    this.renderGallows();
    this.renderMissMeter();
    this.renderResult();
  }

  private renderCategory(): void {
    this.refs.category.textContent = this.state.category;
  }

  private renderHint(): void {
    this.refs.hintType.textContent = this.state.hintType;
    this.refs.hintText.textContent = this.state.hint;

    const letterCount = this.getPlayableLetters(this.state.word).length;
    const wordCount = this.state.word
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    const wordLabel = wordCount === 1 ? "word" : "words";

    this.refs.hintMeta.textContent = `${letterCount} letters - ${wordCount} ${wordLabel}`;
  }

  private renderWordBoard(): void {
    this.refs.wordBoard.innerHTML = "";

    for (const char of this.state.word) {
      const slot = document.createElement("span");
      slot.className = "word-slot";

      if (this.isPlayableLetter(char)) {
        if (this.state.guessed.has(char)) {
          slot.textContent = char;
          slot.classList.add("revealed");
        }
      } else {
        slot.classList.add("is-space", "revealed");
        if (char.trim() !== "") {
          slot.textContent = char;
        }
      }

      this.refs.wordBoard.appendChild(slot);
    }
  }

  private renderLettersBoard(): void {
    this.refs.lettersBoard.innerHTML = "";
    const isLock = this.state.status !== "playing";

    ALPHABET.forEach((letter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "letter-key";
      button.dataset.letter = letter;
      button.textContent = letter;

      const isUsed = this.state.guessed.has(letter);
      if (isUsed) {
        button.classList.add("used");
      }

      button.disabled = isLock || isUsed;
      this.refs.lettersBoard.appendChild(button);
    });
  }

  private renderGallows(): void {
    this.refs.gallowsParts.forEach((part, index) => {
      const isVisible = index > 0 && index <= this.state.misses;
      part.classList.toggle("visible", isVisible);
    });
  }

  private renderMissMeter(): void {
    this.refs.missCount.textContent = String(this.state.misses);
  }

  private renderResult(): void {
    if (this.state.status === "playing") {
      this.hideResult();
      return;
    }

    this.refs.resultOverlay.hidden = false;

    if (this.state.status === "won") {
      this.refs.resultTitle.textContent = "You Cracked The Word";
      this.refs.resultMessage.textContent = `Great job. You solved it with ${this.state.misses} mistake${this.state.misses === 1 ? "" : "s"}.`;
      return;
    }

    this.refs.resultTitle.textContent = "Round Lost";
    this.refs.resultMessage.textContent = `The word was ${this.state.word}. Hint: ${this.state.hint}. Start a new round and try again.`;
  }

  private hideResult(): void {
    this.refs.resultOverlay.hidden = true;
  }

  private createState(): GameState {
    const categories = Object.keys(WORD_BANK) as Array<keyof typeof WORD_BANK>;
    const category = this.pickRandom(categories);
    const entriesInCategory = WORD_BANK[category];

    if (!entriesInCategory || entriesInCategory.length === 0) {
      throw new Error(
        `No words available in the selected category: ${category}`,
      );
    }

    const entry = this.pickRandom(entriesInCategory);
    const wordCap = entry.word.toUpperCase();

    return {
      word: wordCap,
      category,
      hint: entry.hint,
      hintType: entry.hintType,
      guessed: new Set<string>(),
      misses: 0,
      status: "playing",
    };
  }

  private pickRandom<T>(items: readonly T[]): T {
    if (items.length === 0) {
      throw new Error("Cannot pick a random item from an empty array.");
    }

    const index = Math.floor(Math.random() * items.length);
    const selectedItem = items[index];
    if (selectedItem === undefined) {
      throw new Error("Failed to pick a random item.");
    }

    return selectedItem;
  }

  private normalizeLetter(value: string): string {
    return value.trim().toUpperCase().slice(0, 1);
  }

  private isPlayableLetter(char: string): boolean {
    return /^[A-Z]$/.test(char);
  }

  private must<T extends Element>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) {
      throw new Error(`Missing required element: ${selector}`);
    }

    return element;
  }

  private collectDomRefs(): DomRefs {
    const gallowsParts = Array.from(
      document.querySelectorAll<HTMLElement>("[data-part-index]"),
    );
    if (gallowsParts.length === 0) {
      throw new Error("Missing required hangman parts.");
    }

    return {
      category: this.must<HTMLElement>("[data-category]"),
      hintType: this.must<HTMLElement>("[data-hint-type]"),
      hintText: this.must<HTMLElement>("[data-hint-text]"),
      hintMeta: this.must<HTMLElement>("[data-hint-meta]"),
      wordBoard: this.must<HTMLElement>("[data-word-board]"),
      lettersBoard: this.must<HTMLElement>("[data-letters-board]"),
      missCount: this.must<HTMLElement>("[data-miss-count]"),
      maxMissCount: this.must<HTMLElement>("[data-max-miss]"),
      gallowsParts,
      resultOverlay: this.must<HTMLElement>("[data-result-overlay]"),
      resultTitle: this.must<HTMLElement>("[data-result-title]"),
      resultMessage: this.must<HTMLElement>("[data-result-message]"),
      newGameButton: this.must<HTMLButtonElement>("[data-action='new-game']"),
      playAgainButton: this.must<HTMLButtonElement>(
        "[data-action='play-again']",
      ),
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    new HangmanGame();
  } catch (error) {
    console.error("Error initializing Hangman game:", error);
  }
});
