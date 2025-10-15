import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const connectWallet = (onFinish, onCancel) => {
  showConnect({
    appDetails: {
      name: 'Block Quest',
      icon: window.location.origin + '/logo.png',
    },
    redirectTo: '/',
    onFinish: (data) => {
      const userData = data.userSession.loadUserData();
      onFinish(userData.profile.stxAddress.testnet);
    },
    onCancel: () => {
      if (onCancel) onCancel();
    },
    userSession,
  });
};

export const disconnectWallet = () => {
  userSession.signUserOut('/');
};

export const isWalletConnected = () => {
  return userSession.isUserSignedIn();
};

export const getWalletAddress = () => {
  if (userSession.isUserSignedIn()) {
    const userData = userSession.loadUserData();
    return userData.profile.stxAddress.testnet;
  }
  return null;
};

// Mock NFT minting functions (replace with actual contract calls)
export const mintQuestPass = async (address) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Quest Pass minted for:', address);
      resolve({
        success: true,
        txId: 'mock-tx-' + Date.now(),
        message: 'Quest Pass NFT minted successfully!',
      });
    }, 2000);
  });
};

export const mintQuestBadge = async (address, level) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Quest Badge Level ${level} minted for:`, address);
      resolve({
        success: true,
        txId: 'mock-tx-' + Date.now(),
        message: `Quest Badge Level ${level} minted successfully!`,
      });
    }, 2000);
  });
};

// Network configuration
export const network = 'testnet';
