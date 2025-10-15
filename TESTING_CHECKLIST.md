# Word Quest Testing Checklist

## ✅ Completed Tests (Local)

### Game Mechanics
- [x] 5-letter word input works
- [x] Maximum 6 attempts enforced
- [x] Color feedback system:
  - [x] Green for correct letter in correct position
  - [x] Yellow for correct letter in wrong position
  - [x] Gray for incorrect letter
- [x] Win detection when word is guessed
- [x] Lose detection after 6 failed attempts
- [x] Word validation (only valid words accepted)
- [x] "Not enough letters" message for incomplete words
- [x] "Not in word list" message for invalid words

### Multiplier System
- [x] Starts at 5x for first attempt
- [x] Decreases to 4x for second attempt
- [x] Decreases to 3x for third attempt
- [x] Decreases to 2x for fourth attempt
- [x] Stays at 1x for fifth and sixth attempts
- [x] Multiplier displayed in real-time

### Keyboard
- [x] Virtual keyboard displays all letters
- [x] Physical keyboard input works
- [x] ENTER key submits guess
- [x] BACKSPACE key deletes letters
- [x] Used letters show color feedback:
  - [x] Green for correct position
  - [x] Yellow for wrong position
  - [x] Dark gray for absent letters

### UI/UX
- [x] Game board displays 6 rows of 5 tiles
- [x] Current guess shows with yellow border
- [x] Completed guesses show color feedback
- [x] Smooth animations on tile flip
- [x] Shake animation for invalid words
- [x] Message display for errors/success
- [x] Responsive design works on different screen sizes

### Navigation
- [x] Home page displays Word Quest button
- [x] Word Quest button navigates to game page
- [x] Back button returns to home
- [x] Game mode selection works
- [x] Wallet connection required to play

### Deposit/Stake System
- [x] Deposit amount input works
- [x] Minimum 1 STX enforced
- [x] Potential reward calculation displayed
- [x] Deposit button disabled without wallet
- [x] Transaction status messages shown

## ⏳ Pending Tests (Requires Deployed Contract)

### Blockchain Integration
- [ ] Deposit transaction succeeds
- [ ] Game ID returned from contract
- [ ] Resolve transaction succeeds
- [ ] Claim transaction succeeds
- [ ] Correct reward amount received
- [ ] Transaction errors handled gracefully
- [ ] Gas fees calculated correctly

### Contract Functions
- [ ] deposit-and-play creates new game
- [ ] resolve-game sets correct multiplier
- [ ] claim-reward transfers correct amount
- [ ] get-game returns correct data
- [ ] get-next-game-id increments properly

### Edge Cases
- [ ] Multiple games in sequence
- [ ] Claiming without resolving (should fail)
- [ ] Resolving twice (should fail)
- [ ] Claiming twice (should fail)
- [ ] Invalid multiplier values (should fail)
- [ ] Non-owner trying to resolve (should fail)

## 🎯 Test Scenarios

### Scenario 1: Win on First Try (5x Multiplier)
1. Connect wallet
2. Deposit 10 STX
3. Guess correct word on first attempt
4. Verify 5x multiplier shown
5. Resolve game
6. Claim 50 STX reward
7. Verify balance increased by 40 STX (50 - 10 deposit)

### Scenario 2: Win on Third Try (3x Multiplier)
1. Connect wallet
2. Deposit 5 STX
3. Make 2 wrong guesses
4. Guess correct word on third attempt
5. Verify 3x multiplier shown
6. Resolve game
7. Claim 15 STX reward
8. Verify balance increased by 10 STX (15 - 5 deposit)

### Scenario 3: Lose After 6 Attempts
1. Connect wallet
2. Deposit 10 STX
3. Make 6 wrong guesses
4. Verify game over message
5. Verify word revealed
6. Verify no claim button (lost deposit)

### Scenario 4: Invalid Word Handling
1. Start game
2. Enter 3-letter word → "Not enough letters"
3. Enter 5-letter gibberish → "Not in word list"
4. Enter valid 5-letter word → Accepted

## 📊 Performance Tests

- [x] Game loads quickly
- [x] Animations are smooth
- [x] No lag when typing
- [x] Keyboard responsive
- [ ] Transaction confirmation time acceptable
- [ ] Contract calls complete within 30 seconds

## 🐛 Known Issues

1. **Contract Deployment**: word-game.clar needs to be deployed to testnet
2. **Game ID**: Currently using timestamp as placeholder, needs actual contract game ID
3. **Auto-resolve**: Currently auto-resolving for demo, needs backend/oracle in production

## 🚀 Ready for Production Checklist

- [x] All game mechanics working
- [x] UI polished and responsive
- [x] Error messages clear and helpful
- [x] Animations smooth
- [ ] Contract deployed and verified
- [ ] All blockchain tests passing
- [ ] Documentation complete
- [ ] Security audit (if needed)
- [ ] Gas optimization
- [ ] Multi-wallet testing (Hiro, Xverse, Leather)

---

**Test Status**: Local testing complete ✅ | Blockchain testing pending ⏳
**Last Updated**: October 15, 2025
