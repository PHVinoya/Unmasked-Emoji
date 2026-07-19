<div align="center">
<h1>🎭 Unmasked Emoji</h1>

A playful emoji memory-matching game — flip cards, find pairs, and watch each character's mask pop off with a fun little animation when you get it right.

[![Unmasked Emoji gameplay preview](./assets/unmaskemoji.gif)](https://unmasked-emoji.vercel.app/)

**[▶ Play the live demo](https://unmasked-emoji.vercel.app/)**
</div>

## About

Unmasked Emoji is a classic memory/matching card game with a twist: instead of plain cards, each tile is a smiling face wearing a mask (alien, ogre, robot, clown, pumpkin, frog, skull, cow, dragon, fox, and more). Flip two cards, find a match, and the mask animates off. Chain matches together for combo callouts, and try to beat your best score.

## Features

- 🧠 12 unique masked characters, each with its own custom flip/reveal animation
- 🔥 Combo streak detection with an animated marquee banner
- 🏆 Tracks your **Tries** and **Best** score across rounds
- 🔊 Sound effects with a mute toggle
- 🎵 Background music that starts on first interaction (to respect browser autoplay rules)
- 📱 Fully responsive layout using container queries
- ✨ Smooth, elastic CSS animations — no JavaScript animation libraries required

## Tech Stack

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>


## Project Structure

```
├── index.html      # Game markup
├── style.css        # Styling and animations
├── script.js         # Game logic
└── assets/
    ├── flip.mp3
    ├── wrong.mp3
    ├── correct.mp3
    ├── shuffle.mp3
    ├── complete.mp3
    └── bgmusic.mp3
```

## How to Play

1. Click any card to flip it and reveal the character underneath.
2. Click a second card to try for a match.
3. If the two cards match, their masks pop off and stay revealed.
4. If they don't match, they flip back after a short delay.
5. Match all pairs to win — the fewer tries, the better your score!
6. Click **Reset game** to shuffle and start a new round.

## Running Locally

No build step required — it's plain HTML/CSS/JS.

```bash
git clone https://github.com/PHVinoya/Unmasked-Emoji.git
cd unmasked-emoji
```

Then simply open `index.html` in your browser, or serve it locally:

```bash
npx serve .
```

## License

Feel free to fork, remix, and use this project for learning or fun.
