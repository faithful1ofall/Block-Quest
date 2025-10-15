# Block Quest - Word Game Refactoring Plan

## 🎯 Objective

Transform Block Quest from a physics-based shooter into a **Wordle-style word guessing game** with blockchain integration on Stacks, inspired by the Word Play game.

---

## 📊 Game Mechanics Analysis

### Original Word Game Features

1. **5-Letter Word Guessing**
   - Player guesses a 5-letter word
   - 6 maximum attempts
   - Color-coded feedback:
     - 🟩 Green = Correct letter in correct position
     - 🟨 Yellow = Correct letter in wrong position
     - ⬜ Gray = Letter not in word

2. **Staking System**
   - Players deposit tokens to play
   - Multiplier starts at 5x
   - Decreases by 1 with each wrong guess
   - Win = Deposit × Multiplier
   - Lose = Lose deposit

3. **Blockchain Integration**
   - Deposit function to start game
   - Resolve function (owner sets multiplier based on win/lose)
   - Claim reward function
   - All on-chain

4. **UI Components**
   - 6×5 grid for guesses
   - Input field for current guess
   - Keyboard showing used letters
   - Multiplier display
   - Balance display
   - Deposit/Start/Claim buttons

---

## 🔄 Refactoring Strategy

### Phase 1: Smart Contract (Clarity)

Create `word-game.clar` with:

```clarity
;; Data structures
(define-map games
  { game-id: uint }
  {
    player: principal,
    deposit: uint,
    multiplier: uint,
    claim-amount: uint,
    claimed: bool,
    resolved: bool
  }
)

;; Functions
- deposit-and-play: Player deposits STX to start
- resolve-game: Owner resolves with multiplier (0-5)
- claim-reward: Player claims winnings
- get-game-info: Read game data
```

### Phase 2: Frontend Components

**New Components:**
1. `WordGameBoard.jsx` - 6×5 grid display
2. `WordInput.jsx` - Guess input field
3. `KeyboardDisplay.jsx` - Virtual keyboard with color states
4. `GameStats.jsx` - Multiplier, attempts, balance
5. `WordGamePage.jsx` - Main game page

**Game Flow:**
```
1. Connect Wallet
2. Deposit STX → Start Game
3. Guess Word (max 6 attempts)
4. Each wrong guess → Multiplier decreases
5. Win/Lose → Resolve game
6. Claim Reward
```

### Phase 3: Game Logic

**Word List:**
- 50+ blockchain/crypto-related 5-letter words
- Random selection per game
- Stored in frontend (not on-chain)

**Validation:**
- Check guess length = 5
- Check attempts < 6
- Color-code each letter
- Track used keys
- Calculate multiplier

**Scoring:**
```javascript
Attempt 1: 5x multiplier
Attempt 2: 4x multiplier
Attempt 3: 3x multiplier
Attempt 4: 2x multiplier
Attempt 5: 1x multiplier
Attempt 6: 1x multiplier
Lose: 0x multiplier
```

---

## 🎨 UI Design

### Layout
```
┌─────────────────────────────────────┐
│  Block Quest Word Game              │
│  Balance: 10.5 STX  Multiplier: 5x  │
├─────────────────────────────────────┤
│                                     │
│     [C][H][A][I][N]  ← Guess 1     │
│     [B][L][O][C][K]  ← Guess 2     │
│     [ ][ ][ ][ ][ ]                │
│     [ ][ ][ ][ ][ ]                │
│     [ ][ ][ ][ ][ ]                │
│     [ ][ ][ ][ ][ ]                │
│                                     │
│  Enter Guess: [_____] [Submit]     │
│                                     │
│  [Q][W][E][R][T][Y][U][I][O][P]   │
│  [A][S][D][F][G][H][J][K][L]      │
│  [Z][X][C][V][B][N][M]            │
│                                     │
│  Attempts: 2/6  |  Deposit: 1 STX  │
│                                     │
│  [Deposit & Play] [Claim Reward]   │
└─────────────────────────────────────┘
```

### Color Scheme
- Background: #0f172a (dark)
- Correct: #10b981 (green)
- Present: #fbbf24 (yellow)
- Absent: #6b7280 (gray)
- Accent: #fde047 (neon yellow)

---

## 📝 Implementation Steps

### Step 1: Smart Contract
```clarity
;; word-game.clar
(define-data-var game-counter uint u0)
(define-map games ...)
(define-public (deposit-and-play (amount uint)) ...)
(define-public (resolve-game (game-id uint) (multiplier uint)) ...)
(define-public (claim-reward (game-id uint)) ...)
```

### Step 2: Game Components
```javascript
// WordGameBoard.jsx
- 6x5 grid
- Color-coded tiles
- Animation on reveal

// WordInput.jsx
- 5-letter input
- Submit button
- Validation

// KeyboardDisplay.jsx
- A-Z keys
- Color states
- Click to type
```

### Step 3: Game Logic
```javascript
// Game state
{
  targetWord: "CHAIN",
  attempts: 0,
  board: [[]],
  currentGuess: "",
  usedKeys: {},
  multiplier: 5,
  gameId: 0,
  depositAmount: 0
}

// Functions
- handleGuess()
- checkWin()
- updateMultiplier()
- resolveGame()
- claimReward()
```

### Step 4: Integration
- Connect to deployed Stacks contract
- Wallet integration (Hiro/Xverse)
- Transaction handling
- Error management

---

## 🔗 Blockchain Integration

### Contract Functions

**deposit-and-play**
```clarity
(define-public (deposit-and-play (amount uint))
  (begin
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (map-set games 
      { game-id: (var-get game-counter) }
      {
        player: tx-sender,
        deposit: amount,
        multiplier: u0,
        claim-amount: u0,
        claimed: false,
        resolved: false
      }
    )
    (var-set game-counter (+ (var-get game-counter) u1))
    (ok (- (var-get game-counter) u1))
  )
)
```

**resolve-game**
```clarity
(define-public (resolve-game (game-id uint) (multiplier uint))
  (let ((game (unwrap! (map-get? games { game-id: game-id }) err-not-found)))
    (asserts! (is-eq tx-sender contract-owner) err-not-authorized)
    (asserts! (not (get resolved game)) err-already-resolved)
    (map-set games 
      { game-id: game-id }
      (merge game {
        multiplier: multiplier,
        claim-amount: (* (get deposit game) multiplier),
        resolved: true
      })
    )
    (ok true)
  )
)
```

**claim-reward**
```clarity
(define-public (claim-reward (game-id uint))
  (let ((game (unwrap! (map-get? games { game-id: game-id }) err-not-found)))
    (asserts! (is-eq tx-sender (get player game)) err-not-authorized)
    (asserts! (get resolved game) err-not-resolved)
    (asserts! (not (get claimed game)) err-already-claimed)
    (asserts! (> (get claim-amount game) u0) err-nothing-to-claim)
    (try! (as-contract (stx-transfer? (get claim-amount game) tx-sender (get player game))))
    (map-set games 
      { game-id: game-id }
      (merge game { claimed: true })
    )
    (ok true)
  )
)
```

---

## 🎮 Game Flow

### 1. Start Game
```
User → Connect Wallet
User → Enter Deposit Amount (e.g., 1 STX)
User → Click "Deposit & Play"
Frontend → Call deposit-and-play()
Contract → Store game data, return game-id
Frontend → Store game-id in localStorage
Frontend → Select random word
Frontend → Show game board
```

### 2. Play Game
```
User → Enter 5-letter guess
User → Click "Submit"
Frontend → Validate guess
Frontend → Update board with colors
Frontend → Update used keys
Frontend → Decrease multiplier if wrong
Frontend → Check win/lose condition
```

### 3. End Game
```
If Win:
  Frontend → Call resolve-game(game-id, multiplier)
  Contract → Set claim-amount = deposit × multiplier
  Frontend → Show "You Won!" message
  Frontend → Enable "Claim Reward" button

If Lose:
  Frontend → Call resolve-game(game-id, 0)
  Contract → Set claim-amount = 0
  Frontend → Show "Game Over" message
  Frontend → Show correct word
```

### 4. Claim Reward
```
User → Click "Claim Reward"
Frontend → Call claim-reward(game-id)
Contract → Transfer STX to player
Frontend → Show success message
Frontend → Reset game
```

---

## 📊 Word List

```javascript
const WORD_LIST = [
  "CHAIN", "BLOCK", "MINTS", "NODES", "COINS",
  "LAYER", "ETHER", "BYTES", "PROOF", "VOTER",
  "STATE", "TRUST", "VALID", "SIGNS", "BUYER",
  "VAULT", "VALUE", "LOGIC", "ASSET", "OWNER",
  "DIGIT", "STOCK", "TRADE", "CODES", "MONEY",
  "TOKEN", "SMART", "PRICE", "TREND", "FUNDS",
  "YIELD", "RISKS", "CLEAR", "MERGE", "SPLIT",
  "STAKE", "POOLS", "SWAPS", "BURNS", "LOCKS",
  "VESTS", "FARMS", "MINES", "HOLDS", "SENDS",
  "CALLS", "READS", "WRITE", "QUERY", "INDEX"
];
```

---

## 🚀 Deployment Plan

### 1. Deploy Contract
```bash
# Deploy word-game.clar to Stacks Testnet
clarinet deploy --testnet
```

### 2. Update Frontend
```javascript
// Update contract address
const CONTRACT_ADDRESS = "ST...";
const CONTRACT_NAME = "word-game";
```

### 3. Test Flow
- Connect wallet
- Deposit STX
- Play game
- Win/Lose
- Claim reward

### 4. Documentation
- Update README
- Add gameplay guide
- Add contract documentation

---

## ✅ Success Criteria

- ✅ 5-letter word guessing works
- ✅ Color-coded feedback accurate
- ✅ Multiplier decreases correctly
- ✅ Deposit/Resolve/Claim flow works
- ✅ Wallet integration functional
- ✅ Contract deployed on testnet
- ✅ UI matches design
- ✅ Game is fun and engaging

---

## 🎯 Key Differences from Original

### Removed
- ❌ Physics engine (Matter.js)
- ❌ Slingshot mechanics
- ❌ Destructible blocks
- ❌ Trajectory preview
- ❌ Multiple game modes

### Added
- ✅ Word guessing mechanics
- ✅ Wordle-style feedback
- ✅ Keyboard display
- ✅ Multiplier system
- ✅ Staking/reward system

### Maintained
- ✅ Stacks blockchain integration
- ✅ NFT minting (Quest Pass/Badges)
- ✅ Wallet connection
- ✅ Retro pixel theme
- ✅ Level progression

---

This refactoring will transform Block Quest into an engaging word game while maintaining the blockchain integration and reward system!
