import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { openContractCall } from '@stacks/connect';
import { 
  uintCV, 
  standardPrincipalCV,
  PostConditionMode,
} from '@stacks/transactions';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

const appDetails = {
  name: 'Block Quest',
  icon: window.location.origin + '/logo.png',
};

export const connectWallet = (onFinish, onCancel) => {
  showConnect({
    appDetails,
    onFinish: () => {
      const userData = userSession.loadUserData();
      const address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet;
      onFinish(address);
    },
    onCancel: () => {
      if (onCancel) onCancel();
    },
    userSession,
  });
};

export const disconnectWallet = () => {
  userSession.signUserOut();
};

export const isWalletConnected = () => {
  return userSession.isUserSignedIn();
};

export const getWalletAddress = () => {
  if (userSession.isUserSignedIn()) {
    const userData = userSession.loadUserData();
    return userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet;
  }
  return null;
};

// Contract details
const CONTRACT_ADDRESS = 'ST28MDT9SAV31XJ73M2W3W5DVC1NWHYX713Q6SEP5';
const CONTRACT_NAME = 'quest-nft';

// Mint Quest Pass NFT
export const mintQuestPass = async () => {
  return new Promise((resolve, reject) => {
    openContractCall({
      network: 'testnet',
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'mint-quest-pass',
      functionArgs: [],
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => {
        console.log('Quest Pass minted, txId:', data.txId);
        resolve({
          success: true,
          txId: data.txId,
          message: 'Quest Pass NFT minted successfully!',
        });
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled'));
      },
    });
  });
};

// Mint Quest Badge NFT
export const mintQuestBadge = async (level) => {
  return new Promise((resolve, reject) => {
    openContractCall({
      network: 'testnet',
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'mint-quest-badge',
      functionArgs: [uintCV(level)],
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data) => {
        console.log(`Quest Badge Level ${level} minted, txId:`, data.txId);
        resolve({
          success: true,
          txId: data.txId,
          message: `Quest Badge Level ${level} minted successfully!`,
        });
      },
      onCancel: () => {
        reject(new Error('Transaction cancelled'));
      },
    });
  });
};

// Network configuration
export const network = 'testnet';
