# Celo Naija – README  
**Send Money. Pay Bills. Buy Airtime. With Your Phone Number.**  

[![Celo](https://img.shields.io/badge/Celo-L2-blue?logo=celo)](https://celo.org) [![Valora](https://img.shields.io/badge/Wallet-Valora-green?logo=valora)](https://valoraapp.com) [![Sepolia](https://img.shields.io/badge/Network-Sepolia-orange)](https://sepolia.celoscan.io) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![pnpm](https://img.shields.io/badge/Manager-pnpm-green)](https://pnpm.io)

---

## 🚀 **What is Celo Naija?**  
**Celo Naija** is a **mobile-first, Nigeria-first remittance app** that empowers **anyone with a phone** to send money, pay bills, and buy airtime — **no bank account or seed phrase required**.  

Powered by **Celo L2**, it transforms your phone number into a secure wallet via **SocialConnect**, uses **cNGN** (Naira-pegged stablecoin) for instant transfers, and includes **USSD fallback (*888#)** for feature phones like Nokia or Tecno. It's designed for the 40M+ unbanked Nigerians, slashing fees from 7–12% (Western Union) to **<1%** while feeling as simple as WhatsApp.  

**Live Demo:** [celo-naija.vercel.app/demo](https://celo-naija.vercel.app/demo) (Sepolia testnet)  

---

## ✨ **Key Features**

| Feature | Description | Tech Highlight |
|---------|-------------|---------------|
| **Phone-Number Wallet** | Enter `+234...` → Instant login & wallet creation | SocialConnect + Valora |
| **Instant cNGN Sends** | Send ₦5,000 to another phone in <10 seconds | CeloNaija.sol escrow |
| **Bill Payments** | NEPA, DSTV, Bet9ja via QR or meter number | BillPayEscrow.sol + Chainlink oracles |
| **Airtime Top-Ups** | MTN, Airtel, Glo — convert airtime to cNGN | Mock MTN MoMo API (real integration ready) |
| **USSD Fallback** | `*888#` menu for basic phones: Send, Check Balance | Africa’s Talking sandbox |
| **Zero Gas Illusion** | Fees paid in cNGN — users see **₦0** | Celo fee abstraction |
| **Receipt NFTs** | Mint on-chain proof for every transaction | ERC-1155 integration |

**Target Users:** Diaspora Nigerians ($24B remittances/year), unbanked traders, students paying JAMB fees.

---

## 🏗️ **Tech Stack**

| Layer | Tech | Why It Fits Naija |
|-------|------|-------------------|
| **Blockchain** | Celo L2 (Sepolia → Mainnet) | <0.01 USD/tx, mobile-first |
| **Contracts** | Solidity 0.8.28 + Hardhat + Ignition | TypeScript-safe, one-click deploys |
| **Stablecoin** | cNGN (testnet) → Monierate (live) | 1:1 Naira peg |
| **Wallet** | Valora / MiniPay (Opera) | Pre-installed on 50M+ Androids |
| **Frontend** | Next.js 14 + Tailwind + wagmi/viem | PWA for low-data networks |
| **State/Data** | Zustand + React Query | Offline-first caching |
| **API** | Node.js + Express + viem | REST for sends/bills, mock airtime |
| **USSD/SMS** | Africa’s Talking | Works on ₦2k Nokias |
| **Deploy** | Vercel (frontend) + Sepolia (contracts) | Free, global CDN |

---

## 📍 **Live Contracts (Celo Sepolia)**

All contracts deployed & verified on Sepolia testnet (ready for mainnet migration):

```
cNGN           → 0x5Ce0574CD6470781b002599F3cc8Da9fB439e991
BillPayEscrow  → 0xd197c9712cfa3b488F8d3Bed211E6D8730B210Fb
CeloNaija      → 0x2cec797506339AE0A03EC41f1824dDd9674A79Af
```

[View on Celoscan Sepolia](https://sepolia.celoscan.io/address/0x2cec797506339AE0A03EC41f1824dDd9674A79Af)  
[ABIs & Explorer](https://github.com/ikonicity-airban/celo-naija/tree/main/apps/contracts/artifacts) (generated via Hardhat)

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ & pnpm (install: `npm i -g pnpm`)
- Valora app (switch to Sepolia: Settings → Networks → Add Custom RPC)
- `.env` files (see below)

### 1. Clone & Install
```bash
git clone https://github.com/ikonicity-airban/celo-naija.git
cd celo-naija
pnpm install  # Installs all workspaces
```

### 2. Environment Setup
Create `.env` in root + each `apps/*` folder:
```env
# Root + contracts/api/web
PRIVATE_KEY=0xYourValoraSepoliaKey  # Export from Valora
ETHERSCAN_API_KEY=YourEtherscanV2Key  # From etherscan.io/myapikey
NEXT_PUBLIC_CONTRACTS_CNGN=0x5Ce0574CD6470781b002599F3cc8Da9fB439e991
NEXT_PUBLIC_CONTRACTS_NAIJA=0x2cec797506339AE0A03EC41f1824dDd9674A79Af
NEXT_PUBLIC_SEPOLIA_RPC=https://forno.celo-sepolia.celo-testnet.org
AFRICAS_TALKING_API_KEY=YourATKey  # Sandbox from africastalking.com
```

### 3. Deploy/Run Contracts (If Needed)
```bash
cd apps/contracts
pnpm deploy:sepolia  # Deploys to Sepolia (already done in this repo)
pnpm verify  # Verifies on Etherscan V2
```

### 4. Run API Backend
```bash
cd apps/api
pnpm dev  # Runs on http://localhost:4000
# Test: curl -X POST http://localhost:4000/send -d '{"toPhone":"+2348023456789","amount":5000}'
```

### 5. Run Frontend
```bash
cd apps/web
pnpm dev  # Runs on http://localhost:3000
# Test: Open in browser, connect Valora, send test ₦1,000
```

### 6. USSD Testing (Optional)
```bash
cd apps/api
pnpm ussd:dev  # Starts *888# sandbox via Africa's Talking
# Test: Dial *888# in simulator at africastalking.com/console
```

---

## 📱 **Demo Flow**

1. **Setup Valora**: Download app → Switch to **Sepolia** → Fund via [faucet.celo.org/celo-sepolia](https://faucet.celo.org/celo-sepolia) (paste `0xd13ab...` for cUSD).
2. **Launch App**: Visit [localhost:3000](http://localhost:3000) → Connect Valora.
3. **Send Money**: Enter recipient `+234 802 345 6789` → Amount `₦1,000` → Tap **Send** → Instant cNGN transfer.
4. **Pay Bill**: Scan NEPA QR or enter meter → `₦5,000` → Receipt NFT minted.
5. **Buy Airtime**: Select MTN → `₦500` → Mock confirmation → cNGN credited.
6. **USSD Fallback**: Dial `*888#` → "1. Send Money" → Follow prompts.

**Video Demo:** [2-Min Loom](https://www.loom.com/share/your-link) (includes diaspora send simulation).

---

## 🛠️ **Project Structure**

Monorepo with pnpm workspaces for easy scaling:

```
celo-naija/
├── apps/
│   ├── contracts/          # Hardhat + Solidity (deployed/verified)
│   │   ├── contracts/      # cNGN.sol, CeloNaija.sol, BillPayEscrow.sol
│   │   ├── scripts/        # deploy.ts
│   │   ├── test/           # NaijaSend.test.ts
│   │   └── hardhat.config.ts
│   ├── api/                # Express backend for sends/bills/airtime
│   │   ├── src/            # index.ts (REST endpoints + viem client)
│   │   └── package.json    # deps: express, viem, africastalking
│   └── web/                # Next.js PWA frontend
│       ├── src/            # app/, components/, hooks/ (useSend, useBalance)
│       ├── lib/            # wagmi config, queryClient
│       └── package.json    # deps: next, wagmi, zustand, react-query
├── packages/
│   └── shared/             # Shared types/utils (e.g., PhoneValidation.ts, cNGN types)
├── .env.example            # Template for env vars
├── pnpm-workspace.yaml     # Monorepo config
└── README.md
```

---

## 🎯 **Roadmap**

| Milestone | Status | Timeline |
|-----------|--------|----------|
| **Contracts Deployed & Verified** | ✅ Done | Nov 2025 |
| **API Backend (Sends/Bills)** | ✅ Live | Nov 2025 |
| **Frontend + Valora Integration** | 🔄 In Progress | Nov 2025 |
| **USSD *888# Full Flow** | ⏳ Planned | Q1 2026 |
| **Mainnet Launch (cNGN Live)** | ⏳ Planned | Q2 2026 |
| **1M Users + Partnerships (MTN/Paga)** | ⏳ Planned | 2027 |

**Impact Goal:** Save Nigerians ₦1.6B/year in fees; onboard 1M unbanked via phone-first UX.

---

## 🤝 **Contribute**

Love mobile money for Naija? Join us!

1. Fork the repo  
2. Create feature branch: `git checkout -b feature/phone-validation`  
3. Commit: `git commit -m "Add phone regex for +234"`  
4. Push: `git push origin feature/phone-validation`  
5. Open PR (link to issue if any)  

**Issues:** Report bugs/lack of airtime mocks at [Issues](https://github.com/ikonicity-airban/celo-naija/issues).  
**Discussions:** Ideas for Ghana/Kenya expansion? [Start Here](https://github.com/ikonicity-airban/celo-naija/discussions).

**Good First Issues:**  
- [ ] Add real MTN MoMo API integration  
- [ ] Pidgin English i18n for UI  
- [ ] Offline txn queuing  

---

## 🏆 **Hackathon Ready**

- **Live Demo:** 2-min send flow (UK → Lagos simulation)  
- **Contracts:** Verified on Sepolia—tx hashes included  
- **API + Frontend:** Full stack, deployable to Vercel  
- **Pitch Deck:** [Figma Link](https://figma.com/file/your-pitch-deck) (10 slides, Naija-themed)  
- **Metrics:** 90% fee savings, <10s sends, works on ₦15k Androids  

**Past Wins Potential:** Targets Celo Mobile Hackathon ($10K pool) or Naija SDGs Fintech (₦10M prizes).  

---

## 📄 **License**

MIT © ikonicity-airban (2025)  

---

**Celo Naija – One Phone. One Wallet. One Africa.**  
**#NaijaSend #CeloL2 #FinancialInclusion**  

**Star ⭐ if you're building the unbanked future!**  
[Watch Demo Video](https://www.loom.com/share/your-demo) | [Join Discord](https://discord.gg/celo-naija)
