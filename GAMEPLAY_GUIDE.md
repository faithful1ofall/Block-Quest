# 🎮 Block Quest - Word Quest Gameplay Guide

## 📖 Table of Contents
1. [Getting Started](#getting-started)
2. [How to Play](#how-to-play)
3. [Game Mechanics](#game-mechanics)
4. [Staking & Rewards](#staking--rewards)
5. [Tips & Strategies](#tips--strategies)
6. [Blockchain Integration](#blockchain-integration)
7. [FAQ](#faq)

---

## 🚀 Getting Started

### Prerequisites
1. **Stacks Wallet** - Install one of these:
   - [Hiro Wallet](https://wallet.hiro.so/) (Browser extension)
   - [Xverse Wallet](https://www.xverse.app/) (Browser extension or mobile)
   - [Leather Wallet](https://leather.io/) (Browser extension)

2. **Testnet STX** - Get free testnet tokens:
   - Visit [Stacks Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet)
   - Enter your wallet address
   - Receive 500 testnet STX

3. **Connect to Block Quest**
   - Visit the game website
   - Click "Connect Wallet"
   - Approve the connection in your wallet

---

## 🎯 How to Play

### Step 1: Choose Your Stake
- Minimum deposit: **1 STX**
- Recommended for beginners: **5-10 STX**
- Your potential reward: **Deposit × Multiplier (1x-5x)**

### Step 2: Start the Game
1. Enter your stake amount
2. Click "Deposit & Start Game"
3. Approve the transaction in your wallet
4. Wait for blockchain confirmation (~30 seconds)

### Step 3: Guess the Word
- You have **6 attempts** to guess a **5-letter word**
- Type using your keyboard or click the virtual keyboard
- Press **ENTER** to submit your guess
- Press **BACKSPACE** to delete letters

### Step 4: Read the Feedback
After each guess, tiles change color:

🟩 **Green** - Correct letter in the correct position
```
Example: If the word is "CHAIN" and you guess "CHAIR"
C H A I R
🟩🟩🟩🟩⬜
```

🟨 **Yellow** - Correct letter in the wrong position
```
Example: If the word is "BLOCK" and you guess "CLOCK"
C L O C K
🟨🟩🟩🟨⬜
```

⬜ **Gray** - Letter not in the word
```
Example: If the word is "STACK" and you guess "MONEY"
M O N E Y
⬜⬜⬜⬜⬜
```

### Step 5: Win & Claim
- **Win**: Guess the word correctly within 6 attempts
- **Lose**: Use all 6 attempts without guessing correctly
- **Claim**: If you win, click "Claim Reward" to receive your STX

---

## 🎲 Game Mechanics

### Word List
The game uses **32 crypto/blockchain-themed words**:
- REACT, STACK, BLOCK, CHAIN, QUEST
- PIXEL, FRAME, MOUNT, LIGHT, SOUND
- WORLD, POWER, MAGIC, STONE, FLAME
- WATER, EARTH, STORM, FROST, BLADE
- SWORD, SHIELD, ARMOR, CROWN, JEWEL
- PEARL, AMBER, CORAL, IVORY, ONYX
- TOPAZ, BERYL

### Valid Guesses
- Must be exactly **5 letters**
- Must be a valid English word
- Case insensitive (automatically converted to uppercase)

### Attempt Tracking
- Current attempt displayed at top: "Attempt: 1/6"
- Multiplier updates in real-time
- Used letters highlighted on keyboard

### Keyboard States
The virtual keyboard shows which letters you've used:
- 🟩 **Green keys** - Letter in correct position
- 🟨 **Yellow keys** - Letter in word, wrong position
- ⬛ **Dark gray keys** - Letter not in word
- ⬜ **Light gray keys** - Letter not yet used

---

## 💰 Staking & Rewards

### Multiplier System

Your reward multiplier decreases with each wrong guess:

| Attempts | Multiplier | Example (10 STX deposit) |
|----------|------------|--------------------------|
| 1        | 5x         | Win 50 STX (+40 profit) |
| 2        | 4x         | Win 40 STX (+30 profit) |
| 3        | 3x         | Win 30 STX (+20 profit) |
| 4        | 2x         | Win 20 STX (+10 profit) |
| 5        | 1x         | Win 10 STX (break even) |
| 6        | 1x         | Win 10 STX (break even) |
| Lose     | 0x         | Lose 10 STX deposit     |

### Reward Calculation

```
Reward = Deposit Amount × Multiplier
Profit = Reward - Deposit Amount
```

**Examples:**

**Scenario 1: Lucky First Try**
- Deposit: 10 STX
- Win on attempt 1
- Multiplier: 5x
- Reward: 10 × 5 = 50 STX
- Profit: 50 - 10 = **40 STX profit** 🎉

**Scenario 2: Steady Win**
- Deposit: 20 STX
- Win on attempt 3
- Multiplier: 3x
- Reward: 20 × 3 = 60 STX
- Profit: 60 - 20 = **40 STX profit** 🎉

**Scenario 3: Close Call**
- Deposit: 5 STX
- Win on attempt 6
- Multiplier: 1x
- Reward: 5 × 1 = 5 STX
- Profit: 5 - 5 = **Break even** 😅

**Scenario 4: Loss**
- Deposit: 10 STX
- Lose after 6 attempts
- Multiplier: 0x
- Reward: 0 STX
- Loss: **-10 STX** 😢

### Risk Management

**Conservative Strategy** (Low Risk)
- Stake: 1-5 STX per game
- Goal: Consistent small wins
- Best for: Learning the game

**Moderate Strategy** (Medium Risk)
- Stake: 10-20 STX per game
- Goal: Balance risk and reward
- Best for: Experienced players

**Aggressive Strategy** (High Risk)
- Stake: 50+ STX per game
- Goal: Maximum profit potential
- Best for: Confident players with large bankroll

---

## 💡 Tips & Strategies

### Starting Words
Use words with common letters to maximize information:

**Best Starting Words:**
- **STARE** - Common vowels (A, E) and consonants (S, T, R)
- **CRANE** - Good mix of common letters
- **SLATE** - Popular Wordle starting word
- **AUDIO** - Covers 4 vowels

**Crypto-Themed Starters:**
- **CHAIN** - Likely to be in the word list
- **BLOCK** - Common blockchain term
- **STACK** - Fits the Stacks theme

### Letter Frequency
Most common letters in the word list:
1. **E** - Appears in 40% of words
2. **A** - Appears in 35% of words
3. **R** - Appears in 30% of words
4. **O** - Appears in 28% of words
5. **L** - Appears in 25% of words

### Strategy by Attempt

**Attempt 1-2: Information Gathering**
- Use words with different common letters
- Don't repeat letters unless you know they're in the word
- Focus on vowels (A, E, I, O, U)

**Attempt 3-4: Pattern Recognition**
- Use green letters in their correct positions
- Try yellow letters in different positions
- Eliminate gray letters completely

**Attempt 5-6: Calculated Guessing**
- Use all known information
- Consider word patterns (common endings: -ER, -ED, -LY)
- Think of crypto/blockchain terms

### Common Mistakes to Avoid

❌ **Repeating gray letters** - If a letter is gray, don't use it again
❌ **Ignoring yellow letters** - Yellow letters ARE in the word, just wrong position
❌ **Not using green letters** - Always use green letters in their correct positions
❌ **Random guessing** - Use logic and eliminate possibilities
❌ **Betting too much early** - Start small while learning

### Advanced Techniques

**1. Elimination Strategy**
- First guess: Eliminate 5 letters
- Second guess: Eliminate 5 more letters
- Third guess: Use remaining common letters
- Fourth guess: Should have enough info to solve

**2. Pattern Matching**
- Look for common word patterns
- Example: _LOCK could be BLOCK, CLOCK, FLOCK
- Use context clues from previous guesses

**3. Probability Thinking**
- If you have 3 green letters, calculate possible words
- Choose the most likely word based on letter frequency
- Consider the crypto/blockchain theme

---

## 🔗 Blockchain Integration

### How It Works

**1. Deposit Phase**
```
Player → deposit-and-play(amount) → Smart Contract
Smart Contract → Creates game record → Returns game-id
```

**2. Play Phase**
```
Player plays game in browser (no blockchain calls)
Game logic runs entirely on frontend
```

**3. Resolution Phase**
```
Game ends → Frontend calls resolve-game(game-id, multiplier)
Smart Contract → Records outcome → Marks game as resolved
```

**4. Claim Phase**
```
Player → claim-reward(game-id) → Smart Contract
Smart Contract → Transfers (deposit × multiplier) → Player wallet
```

### Transaction Costs

**Testnet** (Free)
- Deposit: ~0.001 STX (gas fee)
- Resolve: ~0.001 STX (gas fee)
- Claim: ~0.001 STX (gas fee)

**Mainnet** (When deployed)
- Deposit: ~0.01-0.05 STX (gas fee)
- Resolve: ~0.01-0.05 STX (gas fee)
- Claim: ~0.01-0.05 STX (gas fee)

### Security Features

✅ **Non-custodial** - You always control your STX
✅ **Transparent** - All transactions on-chain
✅ **Immutable** - Game outcomes cannot be changed
✅ **Verifiable** - Anyone can verify game results
✅ **Fair** - No house edge, pure skill-based

---

## ❓ FAQ

### General Questions

**Q: Is this real money?**
A: Currently on testnet (play money). Mainnet deployment will use real STX.

**Q: Can I play without a wallet?**
A: No, you need a Stacks wallet to deposit and claim rewards.

**Q: How long does a game take?**
A: 2-5 minutes on average, depending on your guessing speed.

**Q: Can I play multiple games?**
A: Yes! Play as many games as you want.

### Gameplay Questions

**Q: What happens if I close the browser mid-game?**
A: Your deposit is safe on the blockchain. However, you won't be able to resume that specific game. The deposit will be lost if you don't complete the game.

**Q: Can I see the word list?**
A: The word list is visible in the source code, but discovering words is part of the fun!

**Q: Are words repeated?**
A: Yes, words are randomly selected, so you might see the same word again.

**Q: Can I use proper nouns?**
A: No, only common English words and crypto terms are in the word list.

### Blockchain Questions

**Q: Why do I need to approve multiple transactions?**
A: One for deposit, one for resolution, and one for claiming. This ensures transparency and security.

**Q: How long do transactions take?**
A: Stacks transactions typically confirm in 10-30 seconds.

**Q: What if a transaction fails?**
A: Your STX will be returned to your wallet. Try again with a higher gas fee.

**Q: Can I cancel a game after depositing?**
A: No, once you deposit, you must complete the game. This prevents abuse.

### Rewards Questions

**Q: When can I claim my reward?**
A: Immediately after winning and the game is resolved on-chain.

**Q: Is there a maximum win amount?**
A: No maximum, but you're limited by your deposit amount.

**Q: What happens to lost deposits?**
A: Lost deposits stay in the contract and fund future winners.

**Q: Are there any fees?**
A: Only blockchain gas fees (very small on Stacks).

---

## 🎓 Learning Path

### Beginner (Games 1-10)
- Start with 1-2 STX deposits
- Focus on learning word patterns
- Try different starting words
- Don't worry about multipliers yet

### Intermediate (Games 11-50)
- Increase to 5-10 STX deposits
- Develop a consistent strategy
- Track your win rate
- Aim for 3x+ multipliers

### Advanced (Games 51+)
- Optimize your starting word
- Aim for 4x+ multipliers
- Consider larger deposits (20+ STX)
- Track statistics and improve

---

## 📊 Statistics to Track

Keep track of your performance:
- **Win Rate**: Wins / Total Games
- **Average Attempts**: Total Attempts / Wins
- **Average Multiplier**: Sum of Multipliers / Wins
- **Total Profit**: Total Rewards - Total Deposits
- **ROI**: (Total Profit / Total Deposits) × 100%

**Example:**
```
Games Played: 20
Wins: 15
Losses: 5
Total Deposited: 100 STX
Total Won: 180 STX
Profit: 80 STX
Win Rate: 75%
ROI: 80%
```

---

## 🏆 Achievements (Unofficial)

Challenge yourself with these goals:

- 🥉 **First Win** - Win your first game
- 🥈 **Perfect Game** - Win on first attempt (5x)
- 🥇 **Winning Streak** - Win 5 games in a row
- 💎 **High Roller** - Win with 50+ STX deposit
- 🎯 **Sharpshooter** - Win 10 games with 4x+ multiplier
- 🧠 **Word Master** - Win 50 total games
- 💰 **Profit King** - Earn 100+ STX profit
- ⚡ **Speed Demon** - Win in under 2 minutes

---

## 🤝 Community & Support

- **GitHub**: [Block Quest Repository](https://github.com/faithful1ofall/Block-Quest)
- **Issues**: Report bugs or request features
- **Discussions**: Share strategies and tips

---

**Good luck and have fun! 🎮🚀**

*Remember: Only play with what you can afford to lose. This is entertainment, not investment advice.*
