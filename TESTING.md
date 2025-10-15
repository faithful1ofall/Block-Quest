# Block Quest - Testing Guide

## Testing the Deployed Contract

### Contract Information
- **Address**: `ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5.quest-nft`
- **Network**: Stacks Testnet
- **Explorer**: [View Contract](https://explorer.hiro.so/address/ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5?chain=testnet)

### Prerequisites for Testing

1. **Install a Stacks Wallet**:
   - [Hiro Wallet](https://wallet.hiro.so/) (Browser Extension)
   - [Xverse Wallet](https://www.xverse.app/) (Browser Extension or Mobile)

2. **Get Testnet STX**:
   - Visit [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet)
   - Enter your testnet address
   - Request testnet STX tokens

3. **Configure Wallet for Testnet**:
   - Open your wallet settings
   - Switch network to "Testnet"
   - Verify you see your testnet STX balance

## End-to-End Testing Flow

### 1. Connect Wallet

1. Open the Block Quest app: [Your Preview URL]
2. Click "Connect Wallet" button
3. Select your wallet (Hiro or Xverse)
4. Approve the connection request
5. Verify your address appears in the header

### 2. Mint Quest Pass

1. On the home page, click "Mint Quest Pass"
2. Review the NFT details in the modal
3. Click "Mint NFT"
4. Approve the transaction in your wallet
5. Wait for confirmation (30-60 seconds)
6. Verify success message appears

**Expected Result**: Quest Pass NFT minted to your address

### 3. Start Playing

1. Click "Start Quest" button
2. You should see the 10×10 mining grid
3. Click on any unmined block (marked with "?")
4. Observe the animation and result:
   - 💰 Coins (+10 coins, +10 XP)
   - 💎 Crystals (+1 crystal, +50 XP)
   - ∅ Empty (+5 XP)
   - 💀 Trap (+1 trap, -20 XP)

### 4. Level Up

1. Continue mining blocks to earn XP
2. When you reach 500 XP, a "Level Up" modal appears
3. Click "Mint Badge" to mint your Level 1 Quest Badge
4. Approve the transaction in your wallet
5. Wait for confirmation
6. Verify the badge appears in your inventory

### 5. Verify NFTs On-Chain

**Check Quest Pass:**
```bash
curl -s "https://api.testnet.hiro.so/extended/v1/tokens/nft/holdings?principal=YOUR_ADDRESS&asset_identifiers=ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5.quest-nft::quest-pass"
```

**Check Quest Badges:**
```bash
curl -s "https://api.testnet.hiro.so/extended/v1/tokens/nft/holdings?principal=YOUR_ADDRESS&asset_identifiers=ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5.quest-nft::quest-badge"
```

## Manual Contract Testing

### Using Stacks Explorer

1. Visit [Contract on Explorer](https://explorer.hiro.so/address/ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5?chain=testnet)
2. Click on "quest-nft" contract
3. Navigate to "Functions" tab
4. Test read-only functions:
   - `get-last-pass-id` - Returns total Quest Passes minted
   - `get-last-badge-id` - Returns total Quest Badges minted
   - `get-badge-level` - Returns level for a specific badge token ID

### Using Clarinet Console

```bash
# Navigate to the Clarinet project
cd /tmp/block-quest-deploy/quest-nft

# Start Clarinet console
clarinet console

# Test minting Quest Pass
(contract-call? .quest-nft mint-quest-pass)

# Test minting Quest Badge
(contract-call? .quest-nft mint-quest-badge u1)

# Check last pass ID
(contract-call? .quest-nft get-last-pass-id)

# Check last badge ID
(contract-call? .quest-nft get-last-badge-id)
```

## Common Issues and Solutions

### Issue: Wallet Won't Connect
**Solution**: 
- Ensure wallet extension is installed and unlocked
- Clear browser cache and try again
- Try a different browser
- Check that you're on testnet network

### Issue: Transaction Fails
**Solution**:
- Verify you have enough testnet STX for gas fees
- Check that the contract address is correct
- Wait a few minutes and try again (network congestion)

### Issue: NFT Not Showing in Wallet
**Solution**:
- Wait 1-2 minutes for blockchain confirmation
- Refresh your wallet
- Check transaction status on explorer
- Verify the transaction was successful

### Issue: Game Progress Not Saving
**Solution**:
- Check browser localStorage is enabled
- Clear localStorage and restart game
- Ensure you're using the same browser/device

## Performance Testing

### Load Testing
- Test with multiple concurrent users
- Verify transaction queue handling
- Monitor gas costs under load

### Security Testing
- Test with invalid inputs
- Verify post-conditions work correctly
- Test transfer functions with unauthorized users
- Verify NFT ownership checks

## Automated Testing

### Unit Tests (Future)
```bash
# Install dependencies
npm install

# Run tests
npm test
```

### Integration Tests
```bash
# Test contract deployment
clarinet check

# Run integration tests
npm run test:integration
```

## Reporting Issues

If you encounter any issues:

1. **Check the Console**: Open browser DevTools (F12) and check for errors
2. **Verify Transaction**: Check transaction status on Stacks Explorer
3. **Create an Issue**: [GitHub Issues](https://github.com/faithful1ofall/Block-Quest/issues)
   - Include error messages
   - Provide transaction IDs
   - Describe steps to reproduce

## Success Criteria

✅ Wallet connects successfully  
✅ Quest Pass mints on-chain  
✅ Mining mechanics work correctly  
✅ XP and leveling system functions  
✅ Quest Badges mint at correct levels  
✅ NFTs appear in wallet  
✅ Game state persists across sessions  
✅ All transactions confirm on testnet  

## Next Steps

After successful testing:
1. Deploy to mainnet (when ready)
2. Conduct security audit
3. Launch to production
4. Monitor for issues
5. Gather user feedback
