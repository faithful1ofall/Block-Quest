import { connect, disconnect, isConnected, getLocalStorage, request } from '@stacks/connect';
import { 
  uintCV, 
  PostConditionMode,
} from '@stacks/transactions';

// Connect wallet using modern Stacks Connect API
export const connectWallet = async (onFinish, onCancel) => {
  try {
    // Check if already connected
    if (isConnected()) {
      const userData = getLocalStorage();
      if (userData?.addresses?.stx?.[0]?.address) {
        onFinish(userData.addresses.stx[0].address);
        return;
      }
    }

    // Connect to wallet
    const response = await connect();
    
    if (response?.addresses?.stx?.[0]?.address) {
      const address = response.addresses.stx[0].address;
      onFinish(address);
    }
  } catch (error) {
    console.error('Wallet connection error:', error);
    if (onCancel) onCancel();
  }
};

export const disconnectWallet = () => {
  disconnect();
};

export const isWalletConnected = () => {
  return isConnected();
};

export const getWalletAddress = () => {
  const userData = getLocalStorage();
  return userData?.addresses?.stx?.[0]?.address || null;
};

// Contract details
const CONTRACT_ADDRESS = 'ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5';
const CONTRACT_NAME = 'quest-nft';

// Mint Quest Pass NFT
export const mintQuestPass = async () => {
  try {
    const response = await request('stx_callContract', {
      contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName: 'mint-quest-pass',
      functionArgs: [],
      postConditionMode: PostConditionMode.Allow,
    });

    console.log('Quest Pass minted, txId:', response.txid);
    return {
      success: true,
      txId: response.txid,
      message: 'Quest Pass NFT minted successfully!',
    };
  } catch (error) {
    console.error('Error minting Quest Pass:', error);
    throw error;
  }
};

// Mint Quest Badge NFT
export const mintQuestBadge = async (level) => {
  try {
    const response = await request('stx_callContract', {
      contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName: 'mint-quest-badge',
      functionArgs: [uintCV(level)],
      postConditionMode: PostConditionMode.Allow,
    });

    console.log(`Quest Badge Level ${level} minted, txId:`, response.txid);
    return {
      success: true,
      txId: response.txid,
      message: `Quest Badge Level ${level} minted successfully!`,
    };
  } catch (error) {
    console.error(`Error minting Quest Badge Level ${level}:`, error);
    throw error;
  }
};

// Network configuration
export const network = 'testnet';
