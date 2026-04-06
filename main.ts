type GameStatus = "playing" | "won" | "lost";

type RuntimeWindow = Window & {
  __HANGMAN_TS_READY__?: boolean;
};

interface GameState {
  word: string;
  category: string;
  hint: string;
  hintType: string;
  guessed: Set<string>;
  misses: number;
  status: GameStatus;
}

interface RuntimeReadyDetail {
  status: "ok";
  version: string;
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
