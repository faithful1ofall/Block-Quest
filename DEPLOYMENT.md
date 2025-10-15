# Block Quest - Deployment Guide

## Smart Contract Deployment

### Testnet Deployment ✅

The Block Quest smart contract has been successfully deployed to Stacks Testnet.

**Contract Details:**
- **Contract Address**: `ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5.quest-nft`
- **Transaction ID**: `0x564953a1c95f0d819e0e6083bda9d37cc1bf43f9eda6a0f97ded5d72b7a66820`
- **Network**: Stacks Testnet
- **Deployment Date**: October 15, 2025
- **Explorer Link**: [View on Stacks Explorer](https://explorer.hiro.so/txid/0x564953a1c95f0d819e0e6083bda9d37cc1bf43f9eda6a0f97ded5d72b7a66820?chain=testnet)

### Contract Functions

The deployed contract includes the following public functions:

1. **mint-quest-pass** - Mint a Quest Pass NFT (entry to the game)
2. **mint-quest-badge** - Mint a Quest Badge NFT for a specific level
3. **transfer-pass** - Transfer Quest Pass NFT to another address
4. **transfer-badge** - Transfer Quest Badge NFT to another address

### Wallet Configuration

The contract was deployed using:
- **Seed Phrase**: `mirror obscure response hat track cloud timber conduct video cute business regular`
- **Deployer Address**: `ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5`
- **Initial Balance**: 500 STX (from testnet faucet)

### Testing the Contract

You can interact with the contract using:

1. **Stacks Explorer**: Visit the contract page and call functions directly
2. **Clarinet Console**: Use `clarinet console` to test locally
3. **Frontend Integration**: Connect your wallet in the Block Quest app

### Verification Steps

To verify the contract deployment:

```bash
# Check contract interface
curl -s "https://api.testnet.hiro.so/v2/contracts/interface/ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5/quest-nft"

# Check transaction status
curl -s "https://api.testnet.hiro.so/extended/v1/tx/0x564953a1c95f0d819e0e6083bda9d37cc1bf43f9eda6a0f97ded5d72b7a66820"

# Check deployer balance
curl -s "https://api.testnet.hiro.so/extended/v1/address/ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5/balances"
```

## Frontend Deployment

### Prerequisites

- Node.js 18+
- npm or yarn
- Vercel or Netlify account (for hosting)

### Build for Production

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Preview the build locally
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Configuration

The app is configured to use Stacks Testnet by default. To switch to mainnet:

1. Update `src/utils/stacks.js`:
   - Change `network: 'testnet'` to `network: 'mainnet'`
   - Update contract address to mainnet deployment

2. Rebuild and redeploy

## Mainnet Deployment (Future)

To deploy to Stacks Mainnet:

1. **Get Mainnet STX**: Purchase STX from an exchange
2. **Deploy Contract**:
   ```bash
   stx deploy_contract contracts/quest-nft.clar quest-nft 50000 0 <PRIVATE_KEY>
   ```
3. **Update Frontend**: Change network configuration to mainnet
4. **Test Thoroughly**: Verify all functions work correctly
5. **Announce**: Share the mainnet deployment with the community

## Security Considerations

- ⚠️ Never commit private keys or seed phrases to git
- ✅ Use environment variables for sensitive data
- ✅ Test thoroughly on testnet before mainnet deployment
- ✅ Consider a security audit for mainnet deployment
- ✅ Implement proper error handling in frontend

## Support

For issues or questions:
- GitHub Issues: [Block Quest Issues](https://github.com/faithful1ofall/Block-Quest/issues)
- Stacks Discord: [Join Stacks Discord](https://discord.gg/stacks)
- Documentation: [Stacks Docs](https://docs.stacks.co/)
