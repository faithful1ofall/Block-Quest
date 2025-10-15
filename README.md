# 🧱 Block Quest

A browser-based blockchain mining adventure built on **Stacks** (Bitcoin Layer 2).

![Block Quest](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎮 About

Block Quest is an interactive mining game where players click blocks to discover treasures, earn XP, level up, and mint NFTs on the Stacks blockchain as proof of their achievements. The game combines classic arcade-style gameplay with Web3 technology.

## ✨ Features

- 🎯 **Interactive Mining Grid** - 10×10 grid with randomized rewards
- 💰 **Resource Collection** - Gather coins, crystals, and avoid traps
- 📈 **Leveling System** - Earn XP and level up your character
- 🏆 **NFT Minting** - Mint Quest Pass and Quest Badge NFTs on Stacks
- 🔗 **Wallet Integration** - Connect with Stacks wallet (Hiro, Xverse)
- 🎨 **Retro Pixel Theme** - Nostalgic arcade-style UI with animations
- 💾 **Progress Saving** - LocalStorage persistence for game state

## 🎲 Gameplay

### Mining Mechanics

Click on any unmined block to discover:
- **60%** - Coins 💰 (+10 coins, +10 XP)
- **20%** - Crystals 💎 (+1 crystal, +50 XP)
- **15%** - Empty ∅ (+5 XP)
- **5%** - Trap 💀 (+1 trap, -20 XP)

### Leveling Up

- Earn **500 XP per level** to advance
- Each level unlocks the ability to mint a new Quest Badge NFT
- Track your progress with the XP progress bar

### NFT System

1. **Quest Pass** - Mint once to start your journey
2. **Quest Badges** - Mint a unique badge for each level achieved
3. All NFTs are minted on Stacks Testnet

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: TailwindCSS 4.1
- **Animations**: Framer Motion
- **Blockchain**: Stacks.js, @stacks/connect
- **Icons**: React Icons
- **State Management**: React Context API
- **Storage**: LocalStorage

## 💻 Run Locally

### Prerequisites

- Node.js 18+ and npm
- Stacks wallet (Hiro Wallet or Xverse)

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
│   │   ├── GameGrid.jsx          # 10×10 mining grid
│   │   ├── Inventory.jsx         # Player stats & inventory
│   │   ├── WalletConnect.jsx     # Wallet connection UI
│   │   ├── MintModal.jsx         # NFT minting modal
│   │   └── LevelUpModal.jsx      # Level up celebration
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   └── Game.jsx              # Main game page
│   ├── context/
│   │   └── GameContext.jsx       # Global game state
│   ├── utils/
│   │   └── stacks.js             # Blockchain utilities
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🔗 Smart Contract (Clarity)

The game uses mock NFT minting for demonstration. In production, deploy this Clarity contract:

```clarity
;; Quest Pass NFT
(define-non-fungible-token quest-pass uint)

;; Quest Badge NFT
(define-non-fungible-token quest-badge uint)

;; Mint Quest Pass
(define-public (mint-pass)
  (let ((token-id (+ (var-get last-pass-id) u1)))
    (try! (nft-mint? quest-pass token-id tx-sender))
    (var-set last-pass-id token-id)
    (ok token-id)))

;; Mint Quest Badge
(define-public (mint-badge (level uint))
  (let ((token-id (+ (var-get last-badge-id) u1)))
    (try! (nft-mint? quest-badge token-id tx-sender))
    (var-set last-badge-id token-id)
    (ok token-id)))
```

## 🎯 Roadmap

- [ ] Deploy smart contracts to Stacks Mainnet
- [ ] Add leaderboard with on-chain verification
- [ ] Implement multiplayer mining zones
- [ ] Add rare legendary items (1% drop rate)
- [ ] Create marketplace for trading NFTs
- [ ] Mobile app version

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
- Powered by Stacks blockchain
- Inspired by classic mining games

## 📞 Contact

- GitHub: [@faithful1ofall](https://github.com/faithful1ofall)
- Project Link: [https://github.com/faithful1ofall/Block-Quest](https://github.com/faithful1ofall/Block-Quest)

---

**Built with ❤️ on Stacks • Powered by Bitcoin**
