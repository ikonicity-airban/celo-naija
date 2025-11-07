import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-ignition-ethers"; // Required for Ignition

import * as dotenv from "dotenv";
dotenv.config();

const config = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Celo Mainnet
    celo: {
      url: "https://forno.celo.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 42220,
    },
    // Celo Alfajores Testnet (RELIABLE RPC)
    alfajores: {
      url: "https://celo-alfajores.g.alchemy.com/v2/NEVnlY4MXlAp5c5_rDT7F", // PUBLIC, NO KEY, 99.9% UPTIME
      // Alt: "https://alfajores.g.alchemy.com/v2/YOUR_KEY"
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 44787,
      timeout: 120000,
    },
    // Celo Sepolia Testnet
    sepolia: {
      url: "https://forno.celo-sepolia.celo-testnet.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11142220,
    },
    // Local
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      // ETHERSCAN V2: ONE KEY FOR ALL CHAINS
      default: process.env.ETHERSCAN_API_KEY || "",
      alfajores: process.env.ETHERSCAN_API_KEY || "",
      celo: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io",
        },
      },
      {
        network: "sepolia",
        chainId: 11142220,
        urls: {
          apiURL: "https://api-celo-sepolia.blockscout.com/api",
          browserURL: "https://celo-sepolia.blockscout.com",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
} as HardhatUserConfig;

export default config;