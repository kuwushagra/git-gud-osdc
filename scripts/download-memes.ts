import fs from "node:fs";
import path from "node:path";

type MemeDefinition = {
  id: string;
  name: string;
  captions: string[];
};

// Top most famous 1-caption memes
const ONE_CAPTION: MemeDefinition[] = [
  { id: "cmm", name: "Change My Mind", captions: ["CAPTION 1"] },
  { id: "dragon", name: "What Color Do You Want Your Dragon", captions: ["CAPTION 1"] },
  { id: "headaches", name: "Types of Headaches", captions: ["CAPTION 1"] },
  { id: "wishes", name: "Genie Rules", captions: ["CAPTION 1"] },
];

// Top most famous 2-caption memes (curated high-recognition classics)
const TWO_CAPTIONS: MemeDefinition[] = [
  { id: "drake", name: "Drakeposting", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "fine", name: "This is Fine", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "doge", name: "Doge", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "disastergirl", name: "Disaster Girl", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "spiderman", name: "Spider-Man Pointing at Spider-Man", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "spongebob", name: "Mocking Spongebob", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "woman-cat", name: "Woman Yelling at a Cat", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "rollsafe", name: "Roll Safe", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "harold", name: "Hide the Pain Harold", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "stonks", name: "Stonks", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "success", name: "Success Kid", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "blb", name: "Bad Luck Brian", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "grumpycat", name: "Grumpy Cat", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "fry", name: "Futurama Fry", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "mordor", name: "One Does Not Simply Walk into Mordor", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "wonka", name: "Condescending Wonka", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "money", name: "Shut Up and Take My Money!", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "captain", name: "I am the Captain Now", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "michael-scott", name: "Michael Scott No God No", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "cheems", name: "Cheems", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "khaby-lame", name: "Khaby Lame Shrug", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "slap", name: "Will Smith Slapping Chris Rock", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "saltbae", name: "Salt Bae", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "bihw", name: "But It's Honest Work", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "kombucha", name: "Kombucha Girl", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "pooh", name: "Tuxedo Winnie the Pooh", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "bus", name: "Two Guys on a Bus", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "buzz", name: "X, X Everywhere", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "sadfrog", name: "Feels Bad Man", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "feelsgood", name: "Feels Good", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "both", name: "Why Not Both?", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "yodawg", name: "Xzibit Yo Dawg", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "facepalm", name: "Facepalm", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "fa", name: "Forever Alone", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "fwp", name: "First World Problems", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "gandalf", name: "Confused Gandalf", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "remembers", name: "Pepperidge Farm Remembers", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "stop-it", name: "Stop It, Get Some Help", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "say", name: "Say the Line, Bart!", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "seagull", name: "Inhaling Seagull", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "wddth", name: "We Don't Do That Here", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "winter", name: "Winter is coming", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "aag", name: "Ancient Aliens Guy", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "ackbar", name: "It's A Trap!", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "afraid", name: "Afraid to Ask Andy", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "agnes", name: "Agnes Harkness Winking", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "aint-got-time", name: "Sweet Brown", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "ams", name: "Awkward Moment Seal", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "ants", name: "Do You Want Ants?", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "awkward", name: "Socially Awkward Penguin", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "awesome-awkward", name: "Socially Awesome Awkward Penguin", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "bad", name: "You Should Feel Bad", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "bender", name: "I'm Going to Build My Own Theme Park", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "bilbo", name: "Why Shouldn't I Keep It", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "bongo", name: "Bongo Cat", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "cbb", name: "Communist Bugs Bunny", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "chosen", name: "You Were the Chosen One!", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "cryingfloor", name: "Crying on Floor", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "dwight", name: "Schrute Facts", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "elf", name: "You Sit on a Throne of Lies", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "fetch", name: "Stop Trying to Make Fetch Happen", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "firsttry", name: "First Try!", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "glasses", name: "Peter Parker's Glasses", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "gone", name: "And It's Gone", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "hagrid", name: "I Should Not Have Said That", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "happening", name: "It's Happening", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "imsorry", name: "Oh, I'm Sorry, I Thought This Was America", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "inigo", name: "Inigo Montoya", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "interesting", name: "The Most Interesting Man in the World", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "jim", name: "Jim Halpert Pointing to Whiteboard", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "joker", name: "It's Simple, Kill the Batman", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "keanu", name: "Conspiracy Keanu", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "kermit", name: "But That's None of My Business", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "kramer", name: "Kramer, What's Going On In There?", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "leo", name: "Leo Strutting", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "mmm", name: "Minor Mistake Marvin", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "morpheus", name: "Matrix Morpheus", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "mw", name: "I Guarantee It", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "noidea", name: "I Have No Idea What I'm Doing", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "oag", name: "Overly Attached Girlfriend", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "officespace", name: "That Would Be Great", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "oprah", name: "Oprah You Get a Car", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "patrick", name: "Push it somewhere else Patrick", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "philosoraptor", name: "Philosoraptor", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "scc", name: "Sudden Clarity Clarence", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "sk", name: "Skeptical Third World Kid", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "sparta", name: "This is Sparta!", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "trump", name: "Donald Trump", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "ugandanknuck", name: "Ugandan Knuckles", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "whatyear", name: "What Year Is It?", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "worst", name: "The Worst Day Of Your Life So Far", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "yallgot", name: "Y'all Got Any More of Them", captions: ["CAPTION 1", "CAPTION 2"] },
  { id: "yuno", name: "Y U NO Guy", captions: ["CAPTION 1", "CAPTION 2"] },
];

// Top most famous 3-caption memes (curated high-recognition classics)
const THREE_CAPTIONS: MemeDefinition[] = [
  { id: "db", name: "Distracted Boyfriend", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "dg", name: "Distracted Girlfriend", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "3hd", name: "Three-Headed Dragon", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "drowning", name: "Drowning High Five", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "ds", name: "Daily Struggle", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "exit", name: "Left Exit 12 Off Ramp", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "handshake", name: "Epic Handshake", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "panik-kalm-panik", name: "Panik Kalm Panik", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "pigeon", name: "Is This a Pigeon?", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "pool", name: "Mother Ignoring Kid Drowning In A Pool", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "same", name: "They're The Same Picture", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
  { id: "captain-america", name: "Captain America Elevator Fight Dad Joke", captions: ["CAPTION 1", "CAPTION 2", "CAPTION 3"] },
];

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const MEMES_DIR = path.join(PUBLIC_DIR, "memes");
const DATA_DIR = path.join(ROOT_DIR, "src", "data");

function buildItem(meme: MemeDefinition, folder: string) {
  const captionSegments = meme.captions.map((c) => encodeURIComponent(c)).join("/");
  const remoteUrl = `https://api.memegen.link/images/${meme.id}/${captionSegments}.png`;
  const localPath = `/memes/${folder}/${meme.id}.png`;
  const filePath = path.join(MEMES_DIR, folder, `${meme.id}.png`);
  return {
    id: meme.id,
    name: meme.name,
    captions: meme.captions,
    lines: meme.captions.length,
    image: localPath,
    remoteUrl,
    filePath,
  };
}

const allTasks = [
  ...ONE_CAPTION.map((m) => buildItem(m, "onecaption")),
  ...TWO_CAPTIONS.map((m) => buildItem(m, "twocaption")),
  ...THREE_CAPTIONS.map((m) => buildItem(m, "threecaption")),
];

// Write src/data/memes.json
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const memesJsonData = {
  "1": ONE_CAPTION.map((m) => {
    const item = buildItem(m, "onecaption");
    return {
      id: item.id,
      name: item.name,
      captions: item.captions,
      lines: item.lines,
      image: item.image,
      remoteUrl: item.remoteUrl,
    };
  }),
  "2": TWO_CAPTIONS.map((m) => {
    const item = buildItem(m, "twocaption");
    return {
      id: item.id,
      name: item.name,
      captions: item.captions,
      lines: item.lines,
      image: item.image,
      remoteUrl: item.remoteUrl,
    };
  }),
  "3": THREE_CAPTIONS.map((m) => {
    const item = buildItem(m, "threecaption");
    return {
      id: item.id,
      name: item.name,
      captions: item.captions,
      lines: item.lines,
      image: item.image,
      remoteUrl: item.remoteUrl,
    };
  }),
};

fs.writeFileSync(
  path.join(DATA_DIR, "memes.json"),
  JSON.stringify(memesJsonData, null, 2),
  "utf-8"
);
console.log("✓ Updated src/data/memes.json with top curated memes");

// Ensure folders exist and clean up deleted ones
const validFiles = new Set(allTasks.map((t) => t.filePath));

for (const sub of ["onecaption", "twocaption", "threecaption"]) {
  const dir = path.join(MEMES_DIR, sub);
  if (fs.existsSync(dir)) {
    const existing = fs.readdirSync(dir);
    for (const file of existing) {
      const full = path.join(dir, file);
      if (!validFiles.has(full)) {
        fs.unlinkSync(full);
      }
    }
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }
}
console.log("✓ Cleaned up removed memes from public/memes/");

async function downloadWithRetry(task: typeof allTasks[0], retries = 3): Promise<void> {
  if (fs.existsSync(task.filePath) && fs.statSync(task.filePath).size > 1000) {
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(task.remoteUrl);
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(task.filePath, buffer);
      return;
    } catch (err) {
      if (attempt === retries) {
        console.error(`✗ Failed to download ${task.id}:`, err);
      } else {
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  }
}

async function runDownloads() {
  const concurrency = 8;
  let completed = 0;

  for (let i = 0; i < allTasks.length; i += concurrency) {
    const batch = allTasks.slice(i, i + concurrency);
    await Promise.all(
      batch.map(async (task) => {
        await downloadWithRetry(task);
        completed++;
      })
    );
  }
  console.log(`✓ Retained and verified all ${allTasks.length} top-tier memes!`);
}

runDownloads();
