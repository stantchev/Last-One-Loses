# 🧠 Line Game – Last One Loses

A simple two-player strategy game where **the player who crosses out the last line loses**.

---

## 🎮 Gameplay Overview

Line Game is a turn-based game for **2 players**. It can be played with pen and paper or as a digital app. Players take turns crossing out horizontal lines across three rows.

The layout:

- Row 1: 3 horizontal lines
- Row 2: 5 horizontal lines
- Row 3: 7 horizontal lines

Example visual:

```
— — —         (Row 1)  
— — — — —     (Row 2)  
— — — — — — — (Row 3)
```

---

## 📜 Rules

1. Players take turns.
2. At any time, players may only cross out lines from the **current active row**.
3. You **start from the top** (Row 1). You can only move to Row 2 when Row 1 is empty, and to Row 3 when Row 2 is empty.
4. On your turn, you may cross out **as many lines as you want**, but only from the active row.
5. The player who **crosses out the final remaining line** on the board **loses** the game.

---

## 🧠 Strategy

The game is similar to a variant of the **Nim game**, but with limited access to one row at a time.

### ✅ Winning Tips

- **Control the parity** of the remaining lines (leave an even number for your opponent).
- **First move tip**: Cross out 1 line from Row 1. This forces your opponent into a disadvantage.
- Try to make sure that you always leave your opponent with an awkward number of lines (ideally just 1 or 2).
- Play reactively. Adjust your move to return the game to a controlled state after each of your opponent's turns.

---

## 👥 Example Round

1. Player 1: removes 1 line from Row 1 → 2 lines remain  
2. Player 2: removes 1 line → 1 line remains  
3. Player 1: removes the last line from Row 1 → activates Row 2  
4. Player 1: removes 1 line from Row 2 → 4 remain  
...and so on.

Whoever crosses out the final line from Row 3 **loses**.

---

## 📄 License

MIT License

---

## 💻 Credits

Created with ❤️ by [Stanchev](https://stanchev.bg)
