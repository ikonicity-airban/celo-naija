import { createConfig, http } from 'wagmi';
import { celo } from 'wagmi/chains';
import { defineChain } from 'viem';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

// Celo Sepolia chain definition
const celoSepolia = defineChain({
  id: 11142220,
  name: 'Celo Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: {
      http: ['https://forno.celo-sepolia.celo-testnet.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Celo Sepolia Explorer',
      url: 'https://celo-sepolia.blockscout.com',
    },
  },
  testnet: true,
});

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

export const wagmiConfig = createConfig({
  chains: [celoSepolia, celo],
  connectors: [
    injected(),
    metaMask(),
    safe(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [celoSepolia.id]: http(),
    [celo.id]: http(),
  },
});

