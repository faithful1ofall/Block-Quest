# 🧱 Block Quest

A browser-based blockchain word guessing game built on **Stacks** (Bitcoin Layer 2).

![Block Quest](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎮 About

Block Quest is a Wordle-style word guessing game with blockchain staking, where players deposit STX tokens, guess 5-letter words, and win rewards based on their performance. The faster you guess correctly, the higher your multiplier! The game combines engaging word puzzle gameplay with Web3 staking mechanics.

### Game Modes

- **Word Quest** 🎯 - Wordle-style word guessing with STX staking (5x-1x multipliers)
- **Physics Mode** 🎮 - Angry Birds-style slingshot mechanics with realistic physics
- **Classic Mode** 💎 - Original click-to-mine gameplay

## ✨ Features

### Word Quest (NEW! 🔥)
- 🎯 **Wordle-Style Gameplay** - Guess 5-letter words in 6 attempts
- 💰 **STX Staking** - Deposit STX tokens to play and win rewards
- 📊 **Dynamic Multipliers** - 5x for 1 attempt, down to 1x for 5-6 attempts
- 🎨 **Color-Coded Feedback** - Green (correct position), Yellow (wrong position), Gray (not in word)
- ⌨️ **Dual Input** - Virtual keyboard + physical keyboard support
- 🎮 **Smart Animations** - Tile flips, shake effects, smooth transitions
- 💎 **Blockchain Rewards** - Win up to 5x your deposit based on performance

### Physics Mode
- 🎯 **Slingshot Mechanics** - Drag and release to launch projectiles
- 💥 **Realistic Physics** - Powered by Matter.js physics engine
- 🧱 **Destructible Blocks** - Wooden, stone, metal, and crystal blocks
- 📊 **Trajectory Preview** - See your shot path before launching

### Classic Mode
- 🎯 **Interactive Mining Grid** - 10×10 grid with randomized rewards
- 💰 **Resource Collection** - Gather coins, crystals, and avoid traps

### Shared Features
- 📈 **Leveling System** - Earn XP and level up your character
- 🏆 **NFT Minting** - Mint Quest Pass and Quest Badge NFTs on Stacks
- 🔗 **Wallet Integration** - Connect with Stacks wallet (Hiro, Xverse, Leather)
- 🎨 **Retro Pixel Theme** - Nostalgic arcade-style UI with animations
- 💾 **Progress Saving** - LocalStorage persistence for game state

## 🎲 Gameplay

### Word Quest (Wordle + Staking) 🎯

**How to Play:**
1. **Connect Wallet** - Connect your Stacks wallet (Hiro, Xverse, or Leather)
2. **Deposit STX** - Choose your stake amount (minimum 1 STX)
3. **Guess the Word** - You have 6 attempts to guess a 5-letter word
4. **Color Feedback**:
   - 🟩 **Green** - Correct letter in correct position
   - 🟨 **Yellow** - Correct letter in wrong position
   - ⬜ **Gray** - Letter not in word
5. **Win Rewards** - Guess correctly to win your deposit × multiplier
6. **Claim** - Claim your STX rewards after winning

**Multiplier System:**
- **1 attempt** → 5x multiplier (500% return!)
- **2 attempts** → 4x multiplier (400% return)
- **3 attempts** → 3x multiplier (300% return)
- **4 attempts** → 2x multiplier (200% return)
- **5-6 attempts** → 1x multiplier (100% return)
- **Lose** → Lose your deposit

**Example:**
- Deposit: 10 STX
- Win on 2nd attempt: Get 40 STX (4x multiplier)
- Net profit: 30 STX

### Physics Mode (Angry Birds Style) 🎮

**How to Play:**
1. **Aim** - Click and drag from the slingshot to aim
2. **Power** - Pull back further for more power
3. **Release** - Let go to launch your projectile
4. **Destroy** - Hit blocks to earn points and progress

**Block Types:**
- **Wooden Blocks** 🟫 - Easy to destroy (10 points)
- **Stone Blocks** ⬜ - Medium difficulty (25 points)
- **Metal Blocks** ⬛ - Hard to destroy (50 points)
- **Crystal Blocks** 💎 - Bonus points (100 points)

### Classic Mode 💎

Click on any unmined block to discover:
- **60%** - Coins 💰 (+10 coins, +10 XP)
- **20%** - Crystals 💎 (+1 crystal, +50 XP)
- **15%** - Empty ∅ (+5 XP)
- **5%** - Trap 💀 (+1 trap, -20 XP)

### NFT System

1. **Quest Pass** - Mint once to start your journey
2. **Quest Badges** - Mint a unique badge for each level achieved
3. All NFTs are minted on Stacks Testnet

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: TailwindCSS 4.1
- **Animations**: Framer Motion
- **Physics Engine**: Matter.js
- **Blockchain**: Stacks.js, @stacks/connect
- **Icons**: React Icons
- **State Management**: React Context API
- **Storage**: LocalStorage

## 💻 Run Locally

### Prerequisites

- Node.js 18+ and npm
- Stacks wallet (Hiro Wallet or Xverse)
- Testnet STX tokens (get from [Stacks Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet))

### Installation

```bash
# Clone the repository
git clone https://github.com/faithful1ofall/Block-Quest.git
cd Block-Quest

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Project Structure

```
block-quest/
├── src/
│   ├── components/
│   │   ├── WordGame.jsx          # Word guessing game component
│   │   ├── GameGrid.jsx          # 10×10 mining grid
│   │   ├── PhysicsGame.jsx       # Physics-based game
│   │   ├── Inventory.jsx         # Player stats & inventory
│   │   ├── WalletConnect.jsx     # Wallet connection UI
│   │   ├── MintModal.jsx         # NFT minting modal
│   │   └── LevelUpModal.jsx      # Level up celebration
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── WordGamePage.jsx      # Word Quest game page
│   │   ├── PhysicsGamePage.jsx   # Physics mode page
│   │   └── Game.jsx              # Classic mode page
│   ├── context/
│   │   └── GameContext.jsx       # Global game state
│   ├── utils/
│   │   └── stacks.js             # Blockchain utilities
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── contracts/
│   ├── quest-nft.clar            # NFT contract (deployed)
│   └── word-game.clar            # Word game contract (pending)
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🔗 Smart Contracts (Clarity)

### Word Game Contract (word-game.clar)

**Status**: Ready for deployment

The Word Game contract manages the staking and reward system:

```clarity
;; Deposit STX and start a game
(define-public (deposit-and-play (amount uint))
  ;; Transfers STX from player to contract
  ;; Creates new game record
  ;; Returns game-id
)

;; Resolve game with multiplier (owner only)
(define-public (resolve-game (game-id uint) (multiplier uint))
  ;; Sets the multiplier (0-5) based on game outcome
  ;; Marks game as resolved
)

;; Claim reward after game is resolved
(define-public (claim-reward (game-id uint))
  ;; Transfers (deposit × multiplier) STX to player
  ;; Marks reward as claimed
)

;; Read-only functions
(define-read-only (get-game (game-id uint)))
(define-read-only (get-next-game-id))
```

### NFT Contract (quest-nft.clar)

**Deployed on Stacks Testnet:**
- **Contract Address**: `ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5.quest-nft`
- **Transaction ID**: `0x564953a1c95f0d819e0e6083bda9d37cc1bf43f9eda6a0f97ded5d72b7a66820`
- **Explorer**: [View on Stacks Explorer](https://explorer.hiro.so/txid/0x564953a1c95f0d819e0e6083bda9d37cc1bf43f9eda6a0f97ded5d72b7a66820?chain=testnet)

The NFT contract implements Quest Pass and Quest Badge minting:

```clarity
;; Quest Pass NFT
(define-non-fungible-token quest-pass uint)

;; Quest Badge NFT
(define-non-fungible-token quest-badge uint)

;; Mint Quest Pass
(define-public (mint-quest-pass)
  (let ((token-id (+ (var-get last-pass-id) u1)))
    (try! (nft-mint? quest-pass token-id tx-sender))
    (var-set last-pass-id token-id)
    (ok token-id)))

;; Mint Quest Badge
(define-public (mint-quest-badge (level uint))
  (let ((token-id (+ (var-get last-badge-id) u1)))
    (try! (nft-mint? quest-badge token-id tx-sender))
    (var-set last-badge-id token-id)
    (ok token-id)))
```

## 🎯 Roadmap

### Completed ✅
- [x] Word Quest game with Wordle-style mechanics
- [x] STX staking and multiplier system
- [x] Color-coded feedback system
- [x] Virtual and physical keyboard support
- [x] Deploy NFT contract to Stacks Testnet
- [x] Integrate wallet connection and NFT minting
- [x] Physics mode with Matter.js
- [x] Classic mining mode

### In Progress 🚧
- [ ] Deploy word-game contract to Stacks Testnet
- [ ] End-to-end testing with real STX transactions
- [ ] Backend/oracle for automated game resolution

### Future Plans 🔮
- [ ] Deploy contracts to Stacks Mainnet
- [ ] Add leaderboard with on-chain verification
- [ ] Expand word list (100+ words)
- [ ] Daily challenges with bonus rewards
- [ ] Multiplayer word battles
- [ ] NFT marketplace for trading Quest Badges
- [ ] Mobile app version
- [ ] Tournament mode with prize pools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for DoraHacks hackathon
- Powered by Stacks blockchain (Bitcoin Layer 2)
- Inspired by Wordle and classic word games
- Physics engine by Matter.js
- UI animations by Framer Motion

## 📞 Contact

- GitHub: [@faithful1ofall](https://github.com/faithful1ofall)
- Project Link: [https://github.com/faithful1ofall/Block-Quest](https://github.com/faithful1ofall/Block-Quest)

---

**Built with ❤️ on Stacks • Powered by Bitcoin**
