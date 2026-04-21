# AI Usage Log — Submarine Dash

This file tracks every way AI was used during this project.

---

## Planning & Design

| What I asked | What AI helped with |
|---|---|
| Game concept and mechanic ideas | Suggested Flappy Bird-style movement with oxygen survival twist |
| MVP scope definition | Helped define what's core vs what's bonus |
| Folder and file structure | Recommended clean 3-file structure |
| Build order and step plan | Created PLAN.md with step-by-step instructions |
| Balancing the oxygen numbers | Reviewed 100 start / 2 drain / 25 hit / 25 tank and confirmed balance |

---

## Development


| What I asked | What AI suggested | What I did |
|---|---|---|
| How does `requestAnimationFrame` work? | Explained the browser paint cycle and why it's better than `setInterval` for games | Used it to build the game loop |
| What's the difference between `let` and `const` for game state variables? | Explained mutability and when to use each | Chose `let` for values that change during gameplay |
| Why isn't my submarine stopping at the screen edge? | Explained clamping with `Math.max` / `Math.min` | Wrote the bounds check myself |
| How do I detect collision between two elements? | Explained `getBoundingClientRect()` and rectangle overlap logic | Implemented `rectanglesOverlap()` and hit insets |
| Why does my score keep resetting mid-game? | Explained variable scope and where to initialise state | Moved score reset into `startGame()` |
| How does `localStorage` work? | Explained key/value storage and JSON serialisation | Built the high score save/load system |
| How do I play a sound in the browser? | Explained the `Audio` API | Added sound effects to hit and collect events |
| How can I delay showing the game over screen? | Explained `setTimeout` | Used it to add a pause before the UI transition |

---

## Notes

- All game logic was written by me following the step plan
- AI was used for planning, structure, and design feedback — not to generate final code
