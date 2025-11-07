export const CONTRACTS = {
    cNGN: {
      address: '0x5Ce0574CD6470781b002599F3cc8Da9fB439e991' as `0x${string}`,
      abi: [
        'function balanceOf(address) view returns (uint256)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function transfer(address to, uint256 amount) returns (bool)',
        'function faucet(uint256 amount)',
        'function decimals() view returns (uint8)',
        'function symbol() view returns (string)',
      ],
    } as const,
    celoNaija: {
      address: '0x2cec797506339AE0A03EC41f1824dDd9674A79Af' as `0x${string}`,
      abi: [
        'function linkPhone(string phone)',
        'function sendToPhone(string toPhone, uint256 amount, string purpose)',
        'function sendToWallet(address to, uint256 amount, string purpose)',
        'function buyAirtime(uint256 amount, string provider)',
        'function phoneToWallet(string) view returns (address)',
        'function walletToPhone(address) view returns (string)',
        'event PhoneLinked(address indexed wallet, string phone)',
        'event Sent(address indexed from, address indexed to, uint256 amount, string purpose)',
        'event AirtimePurchase(address indexed buyer, uint256 amount, string provider)',
      ],
    } as const,
    billPay: {
      address: '0xd197c9712cfa3b488F8d3Bed211E6D8730B210Fb' as `0x${string}`,
      abi: [
        'function payBill(string billType, string accountNumber, uint256 amount) returns (uint256)',
        'function completeBill(uint256 billId)',
        'function getBill(uint256 billId) view returns (tuple(address payer, string billType, string accountNumber, uint256 amount, bool completed, uint256 timestamp))',
        'function getBillCount() view returns (uint256)',
        'event BillCreated(uint256 indexed billId, address indexed payer, string billType, uint256 amount)',
        'event BillCompleted(uint256 indexed billId)',
      ],
    },
  } as const;