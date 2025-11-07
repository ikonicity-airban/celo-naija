# Celo Naija – README  
**Send Money. Pay Bills. Buy Airtime. With Your Phone Number.**  

[![Celo](https://img.shields.io/badge/Celo-L2-blue)](https://celo.org) [![Valora](https://img.shields.io/badge/Wallet-Valora-green)](https://valoraapp.com) [![Sepolia](https://img.shields.io/badge/Network-Sepolia-orange)](https://sepolia.celoscan.io) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🚀 **What is Celo Naija?**  
**Celo Naija** is a **mobile-first, Nigeria-first remittance app** that lets **anyone with a phone** send money, pay bills, and buy airtime — **no bank account needed**.

Built on **Celo L2**, it uses **phone numbers as wallets**, **cNGN (Naira-pegged stablecoin)**, and **USSD fallback (*888#)** for feature phones.

---

## ✨ **Key Features**

| Feature | Description |
|--------|-------------|
| **Send by Phone** | Enter `+234...` → Send ₦5,000 instantly |
| **Pay Bills** | NEPA, DSTV, Bet9ja via QR or meter number |
| **Buy Airtime** | MTN, Airtel, Glo — instant top-up |
| **USSD Fallback** | `*888#` menu for Nokia/Tecno |
| **Zero Gas Feel** | Gas paid in cNGN → user sees **₦0 fees** |
| **Valora Login** | No seed phrase. Just your phone. |

---

## 🏗️ **Tech Stack**

| Layer | Tech |
|------|------|
| **Blockchain** | Celo L2 (Sepolia → Mainnet) |
| **Contracts** | Solidity + Hardhat + Ignition |
| **Stablecoin** | cNGN (testnet) |
| **Wallet** | Valora / MiniPay |
| **Frontend** | Next.js + Tailwind + wagmi |
| **API** | Node.js + Express + viem |
| **USSD** | Africa’s Talking |
| **Deploy** | Vercel, Sepolia |

---

## 📍 **Live Contracts (Celo Sepolia)**

```
cNGN           → 0x5Ce0574CD6470781b002599F3cc8Da9fB439e991
BillPayEscrow  → 0xd197c9712cfa3b488F8d3Bed211E6D8730B210Fb
CeloNaija      → 0x2cec797506339AE0A03EC41f1824dDd9674A79Af
```

[View on Celoscan](https://sepolia.celoscan.io/address/0x2cec797506339AE0A03EC41f1824dDd9674A79Af)

---

## 🚀 **Quick Start**

### 1. Clone & Install
```bash
git clone https://github.com/yourname/celo-naija.git
cd celo-naija
pnpm install
```

### 2. Set Environment
```env
# .env (apps/contracts + apps/api)
PRIVATE_KEY=0x...          # Valora Sepolia key
ETHERSCAN_API_KEY=...      # From etherscan.io
```

### 3. Deploy Contracts
```bash
cd apps/contracts
pnpm deploy:sepolia
```

### 4. Run API
```bash
cd apps/api
pnpm dev
# → http://localhost:4000
```

### 5. Run Frontend
```bash
cd apps/web
pnpm dev
# → http://localhost:3000
```

---

## 📱 **Demo Flow**

1. Open Valora → Switch to **Sepolia**  
2. Go to [localhost:3000](http://localhost:3000)  
3. Enter `+234 802 345 6789` → `₦1,000` → **Send**  
4. Recipient gets SMS + cNGN in Valora  

---

## 🛠️ **Project Structure**

```
celo-naija/
├── apps/
│   ├── contracts/     # Hardhat + Solidity
│   ├── api/           # Express + viem
│   └── web/           # Next.js + Valmi
├── packages/
│   └── shared/        # Types, utils
└── README.md
```

---

## 🎯 **Roadmap**

| Milestone | Status |
|---------|--------|
| MVP Deployed | Done |
| Frontend + Valora | In Progress |
| USSD *888# | Q1 2026 |
| Mainnet Launch | Q2 2026 |
| 1M Users | 2027 |

---

## 🤝 **Contribute**

1. Fork it  
2. Create your feature branch  
3. Commit your changes  
4. Push & open a PR  

---

## 🏆 **Hackathon Ready**

- Live demo: 2-min send flow  
- Contracts verified  
- API + frontend included  
- Pitch deck: [View Here](#)  

---

## 📄 **License**

MIT © [Your Name]

---

**Celo Naija – One Phone. One Wallet. One Africa.**  
**#NaijaSend #CeloL2 #FinancialInclusion**

---

**Star this repo if you believe in mobile money for all.** ⭐
