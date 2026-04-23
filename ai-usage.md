# AI Usage Log — Submarine Dash

This file documents how AI was actually used during the development of this project.

The usage was practical and iterative, based on real problems encountered while building the game — not for generating code, but for understanding concepts, structuring the project, and debugging when needed.

---

## 1. Brainstorming the Project

At the beginning, I used ChatGPT to explore ideas until I settled on the final concept.
I went back and forth with different directions until landing on:

- a Flappy-style movement system
- combined with a survival mechanic (oxygen instead of lives)

AI was used here only for idea exploration and narrowing down a concept that fits the project requirements.

---

## 2. Structuring the Project

Once the idea was clear, I used AI to validate how to organize the project.

**What I asked:**
- best practice structure for a small HTML/CSS/JS game
- how to split logic into files
- what kind of responsibilities each file should have

**What I got:** High-level structure suggestions (no code), such as separating:
- game logic
- player logic
- entity systems
- event handling

**What I did:** Applied that structure to my project and built everything manually following that plan.

---

## 3. Planning the Build

Before coding, I asked AI for a step-by-step plan.
Not code — just:
- what to build first
- what systems come next
- what methods might be needed

This helped me move in a clear order:
1. basic movement
2. game loop
3. obstacles
4. collisions
5. UI
6. extra features

I also asked about the best starting pattern: should I build and style the full HTML first, or write the HTML structure and add CSS only when a new class is needed during development? AI suggested the second approach — build the HTML skeleton, then add styles on the go as each element becomes functional. That way CSS stays connected to what's actually being built rather than guessing layout upfront.

---

## 4. Understanding Core Concepts

During development, I used AI mostly to understand how things work based on what we learned in the module.

**Example — `let` vs `const`**

I asked about:
- when to use `let` vs `const`
- which variables should stay constant vs change during the game

This helped me decide:
- which variables represent state (dynamic)
- which ones are fixed configuration values

**Example — Hitbox Adjustment**

I asked: *"is it possible to make the hitbox smaller than the visual element?"*

AI explained the concept (bounding boxes and offsets). I then implemented my own solution by shrinking the collision area manually.

---

## 5. Game Loop & Frame Handling (Most Important Part)

This was the biggest challenge in the project.

**What I asked:**
- how to make movement consistent across devices
- how to avoid frame-rate dependent speed

**AI introduced the concept of:**
- `requestAnimationFrame`
- using the time difference between frames (`lastTimestamp`)
- calculating a `dtFactor`

I asked multiple follow-up questions like:
- where this factor should be applied
- which types of functions need it (movement, physics, etc.)

**Important:**
- I did not ask for code implementation
- I asked for use cases and explanations

**What I did:** Manually implemented a frame-based system with normalized movement using `dtFactor`.

This part would have been very difficult to achieve correctly without guidance.

---

## 6. Debugging

AI was used carefully when something was not working.

**Example — Game Not Running (No Errors)**

I had a case where:
- the game was not working
- no console errors

I asked AI what could cause this. It suggested checking the script loading order in HTML. That was the issue. I fixed it manually by correcting the `<script>` order. No code was generated or modified by AI.

**Using Codex**

Codex was used only for small, focused debugging checks, such as:
- reviewing a function for logical mistakes
- confirming assumptions

Prompts were short and specific, not requesting full solutions.

---

## 7. Methods & Use Cases

For some parts, I didn't know exactly which method to use. I searched for method names, then asked AI to explain them in context.

Examples:
- collision-related methods
- DOM methods
- timing-related functions

This helped me understand when and why to use them, then apply them myself.

---

## 8. Balancing Gameplay

AI was used to validate values like:
- speed
- sizes
- spacing
- oxygen drain

Not to decide them automatically, but to understand relationships between them. I adjusted everything manually through testing.

---

## 9. UI & CSS

AI was used slightly for visual improvements only:
- spacing
- layout suggestions
- small CSS class ideas

No logic or behavior was generated through AI in this part.

---

## 10. What AI Was NOT Used For

AI did not generate:
- the game loop
- movement system
- collision logic
- spawning systems
- oxygen mechanics
- scoring system

All core systems were written manually.

---

## 11. Tools Used

- **ChatGPT** — brainstorming, explanations, planning, debugging guidance
- **Codex** — small targeted debugging checks

Both were used as support tools, not for generating full solutions.

---

## Final Reflection

AI was used throughout the project, but in a controlled and practical way. Most of the usage was:

- asking *"how does this work?"*
- asking *"when should I use this?"*
- asking *"what could be wrong here?"*

The actual implementation was always done manually.

Some parts — especially the frame-rate independent system — would have been very difficult to implement correctly without that guidance.

This project reflects a combination of what was learned during the 7 weeks, personal problem-solving, and AI used as a support tool — not a shortcut.

---

*This document was generated by AI as a structured summary of a full development session about this project. The content reflects real decisions, questions, and approaches used throughout the build.*
