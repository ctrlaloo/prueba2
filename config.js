/* ============================================================
   SITE_CONFIG — the ONLY file you need to edit to reuse this
   for another person. {name} and {nick} work inside any text.
   ============================================================ */
const SITE_CONFIG = {
  storageKey: "kalel-v1",            // change per person so saves don't mix
  title: "for you",
  person: { name: "Kalel", nickname: "Superman" },
  access: { password: "1709", extraNames: [] }, // extra accepted names
  relationship: { firstMeeting: "September 17" },
  favorites: ["Spider-Man", "Miles Morales", "Zelda", "Anime"],
  colors: { background: "#050505", primary: "#e50914", text: "#ffffff", accent: "#ff9ec4" }, // accent = soft kawaii pink
  icons: { catch: "♥", quiz: "✦", adventure: "☾", choose: "✿", final: "✉" },
  mascot: {                           // Arañita, the little spider who talks
    lines: ["hi {nick}! pick something ✦", "I've been guarding this place for you", "psst... there are secrets here", "you look good today. just saying."],
    pet: ["eep! again again", "hehe that tickles", "best pats in the city", "I'm yours now, you know that?", "more... please"],
    win: ["you're so good at this!", "I knew you could do it ♥", "okay that was cool"],
    fail: ["it's okay, I'm still proud of you", "so close! try again?", "I believe in you ♥"]
  },
  music: { src: "assets/music/background.mp3" },
  timing: { idleMs: 45000 },

  messages: {
    intro1: "HEY, YOU.",
    intro2: "I MADE SOMETHING FOR YOU.",
    granted: "ACCESS GRANTED.",
    welcome: "I WAS WAITING FOR YOU.",
    hubTitle: "YOUR EXPERIENCE",
    wrongName: ["Are you sure that's you?", "That's not quite right."],
    wrongPass: ["That's not quite right.", "Try again."],
    locked: "LOCKED. COMPLETE THE EXPERIENCE TO UNLOCK THIS.",
    unlocked: "THE FINAL THING IS WAITING FOR YOU.",
    finalSeq: ["YOU MADE IT.", "BUT I THINK YOU ALREADY KNEW..."],
    finalTitle: "For you",
    exploring: "you're really exploring everything, huh?",
    idle: "still there?",
    believe: "I believe in you. Try again."
  },

  sections: [
    { id: "catch", title: "CATCH MY HEART" },
    { id: "quiz", title: "HOW WELL DO YOU KNOW ME?" },
    { id: "adventure", title: "OUR LITTLE ADVENTURE" },
    { id: "choose", title: "CHOOSE CAREFULLY" },
    { id: "final", title: "SOMETHING WAITING FOR YOU" }
  ],

  games: {
    catch: {
      seconds: 30, goal: 15, gap: 900, gapStep: 30, minGap: 380,
      life: 1700, speedUp: 50, minLife: 800,
      hint: "Catch them all before time runs out.",
      hover: "that one's yours.",
      winTitle: "YOU GOT THEM ALL.",
      winLines: ["Guess you caught my heart too.", "That one was always yours.", "Not bad, {nick}."],
      loseTitle: "SO CLOSE.",
      lose: "Okay, okay. One more try."
    },
    quiz: {
      right: "You actually know me.",
      wrong: "I'll let that slide...",
      questions: [
        { question: "What was the first thing I noticed about you?",
          options: ["Your smile", "Your laugh", "Your style", "How you talked about what you love"], correct: 3 },
        { question: "What's my comfort movie?",
          options: ["Into the Spider-Verse", "Howl's Moving Castle", "Interstellar", "Coco"], correct: 0 },
        { question: "Where did we first meet?",
          options: ["Online", "School", "A friend's place", "Somewhere I still smile about"], correct: 3 }
      ],
      results: [
        { min: 1, line: "Okay... you know me really well. Scary." },
        { min: 0.5, line: "Okay... you know me pretty well." },
        { min: 0, line: "You have some studying to do. 😭" }
      ]
    },
    adventure: {
      scenes: {
        start: { text: "You're walking through the city at night. Neon bleeds into the wet pavement. Somewhere above you, something moves between the rooftops.",
          choices: [["Follow the lights", "lights"], ["Take the shortcut", "alley"], ["Turn around", "turn"]] },
        lights: { text: "The lights lead to a rooftop. The whole city glows below, and someone left two coffees on the ledge. One has your name on it.",
          choices: [["Take the coffee", "roof"], ["Look for who left it", "look"]] },
        look: { text: "You check behind the vent, the stairs, the water tank. Nobody. Then you hear a quiet laugh behind you.",
          choices: [["Turn around", "roof"], ["Pretend you didn't hear", "tag"]] },
        alley: { text: "The shortcut is... not a shortcut. You are, in fact, very lost. A cat watches you with deep disappointment.",
          choices: [["Follow the cat", "cat"], ["Call me for directions", "call"]] },
        turn: { text: "You turn around and I'm already there, pretending I wasn't following you. \"Wasn't me,\" I say. It was me.",
          choices: [["Admit you were hoping I'd show up", "roof"], ["Run", "tag"]] },
        roof: { end: 1, title: "THE ROOFTOP", text: "We sit there until the city goes quiet. No mission. No rush. Just you, me, and a view that finally makes sense." },
        cat: { end: 1, title: "THE CAT KNEW", text: "The cat leads you straight back to me. Best navigator in the city. I'm giving it your snacks." },
        call: { end: 1, title: "SIGNAL FOUND", text: "I pick up on the first ring. \"Where are you?\" \"Lost.\" \"Stay there. I'm coming.\" I always will." },
        tag: { end: 1, title: "TAG, YOU'RE IT", text: "You run. I'm faster. Obviously. Caught you, {nick}." }
      }
    },
    choose: {
      doneTitle: "NOTED.",
      doneLine: "I'll remember all of that.",
      rounds: [
        { prompt: "Pick one.", options: [["Movie night", "Cozy. I approve."], ["Going out", "Oh, interesting choice."]] },
        { prompt: "Pick one.", options: [["Hug", "I'll remember that."], ["Kiss", "Bold choice."]] },
        { prompt: "Pick one.", options: [["Me", "Correct answer."], ["Obviously me", "Correct answer. Again."]] }
      ]
    }
  },

  // Easter eggs. type "type" = typed on keyboard, "click" = click [data-secret] element
  secrets: [
    { id: "title", type: "click", clicks: 5, nudgeAt: 3, nudge: "okay... you're curious, huh?", msg: "Curiosity looks good on you." },
    { id: "miles", type: "type", value: "miles", msg: "With great power... comes great taste in boyfriends." },
    { id: "zelda", type: "type", value: "zelda", msg: "It's dangerous to go alone. Take me with you." },
    { id: "anime", type: "type", value: "senpai", msg: "Notice me? You already did." },
    { id: "pet", type: "pet", msg: "Ten pats. Arañita is yours forever." },
    { id: "spider", type: "click", clicks: 5, nudgeAt: 0, nudge: "", msg: "You found the tiny one. Nobody finds the tiny one." }
  ],

  photos: [
    { src: "assets/images/photo1.jpg", caption: "Add a caption here" },
    { src: "assets/images/photo2.jpg", caption: "Another memory" },
    { src: "assets/images/photo3.jpg", caption: "This one's my favorite" }
  ],

  letter: [
    "You made it all the way here.", "",
    "I could have just written you a message.",
    "I could have sent you a picture.",
    "I could have said 'I love you' and left it there.", "",
    "But I wanted to make you something.", "",
    "Something you could click through.",
    "Something you could play.",
    "Something that would remind you that someone thought about you enough to make all of this.", "",
    "So...", "",
    "hi, {nick}.", "",
    "I love you."
  ]
};
