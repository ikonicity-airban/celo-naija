// apps/web/src/lib/contracts/hooks.ts
import { useAccount, usePublicClient, useWalletClient, useReadContract } from "wagmi";
import { parseEther, type Address } from "viem";
import { CONTRACTS } from "../contracts";
import { ngnToCNGN, normalizePhoneNumber } from "./utils";

/**
 * Read user's cNGN balance
 */
export function useBalance() {
  const { address } = useAccount();
  
  const { data: balance, isLoading, refetch } = useReadContract({
    address: CONTRACTS.cNGN.address,
    abi: CONTRACTS.cNGN.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  return {
    balance: balance as bigint | undefined,
    isLoading,
    refetch,
  };
}

/**
 * Check if phone is linked to wallet
 */
export function usePhoneToWallet(phone?: string) {
  const normalizedPhone = phone ? normalizePhoneNumber(phone) : undefined;
  
  const { data: walletAddress, isLoading } = useReadContract({
    address: CONTRACTS.celoNaija.address,
    abi: CONTRACTS.celoNaija.abi,
    functionName: 'phoneToWallet',
    args: normalizedPhone ? [normalizedPhone] : undefined,
    query: {
      enabled: !!normalizedPhone,
    }
  });

  return {
    walletAddress: walletAddress as Address | undefined,
    isLoading,
  };
}

/**
 * Get phone linked to wallet
 */
export function useWalletToPhone(address?: Address) {
  const { data: phone, isLoading } = useReadContract({
    address: CONTRACTS.celoNaija.address,
    abi: CONTRACTS.celoNaija.abi,
    functionName: 'walletToPhone',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  return {
    phone: phone as string | undefined,
    isLoading,
  };
}

/**
 * Link phone number to wallet
 */
export function useLinkPhone() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return async (phone: string) => {
    if (!walletClient) throw new Error("Wallet not connected");

    const normalizedPhone = normalizePhoneNumber(phone);
    
    const hash = await walletClient.writeContract({
      address: CONTRACTS.celoNaija.address,
      abi: CONTRACTS.celoNaija.abi,
      functionName: 'linkPhone',
      args: [normalizedPhone],
    });

    await publicClient?.waitForTransactionReceipt({ hash });
    return hash;
  };
}

/**
 * Send money to phone number
 */
export function useSendMoney() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return async (recipientPhone: string, amountNGN: number, purpose: string = "Payment") => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const normalizedPhone = normalizePhoneNumber(recipientPhone);
    const amountCNGN = ngnToCNGN(amountNGN);

    // 1. Approve cNGN spending
    const approveHash = await walletClient.writeContract({
      address: CONTRACTS.cNGN.address,
      abi: CONTRACTS.cNGN.abi,
      functionName: 'approve',
      args: [CONTRACTS.celoNaija.address, amountCNGN],
    });

    await publicClient?.waitForTransactionReceipt({ hash: approveHash });

    // 2. Send to phone
    const sendHash = await walletClient.writeContract({
      address: CONTRACTS.celoNaija.address,
      abi: CONTRACTS.celoNaija.abi,
      functionName: 'sendToPhone',
      args: [normalizedPhone, amountCNGN, purpose],
    });

    await publicClient?.waitForTransactionReceipt({ hash: sendHash });
    return sendHash;
  };
}

/**
 * Buy airtime (mock on-chain record)
 */
export function useBuyAirtime() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return async (amountNGN: number, provider: string) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const amountCNGN = ngnToCNGN(amountNGN);

    // 1. Approve cNGN
    const approveHash = await walletClient.writeContract({
      address: CONTRACTS.cNGN.address,
      abi: CONTRACTS.cNGN.abi,
      functionName: 'approve',
      args: [CONTRACTS.celoNaija.address, amountCNGN],
    });

    await publicClient?.waitForTransactionReceipt({ hash: approveHash });

    // 2. Buy airtime
    const hash = await walletClient.writeContract({
      address: CONTRACTS.celoNaija.address,
      abi: CONTRACTS.celoNaija.abi,
      functionName: 'buyAirtime',
      args: [amountCNGN, provider],
    });

    await publicClient?.waitForTransactionReceipt({ hash });
    return hash;
  };
}

/**
 * Pay bill
 */
export function usePayBill() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return async (billType: string, accountNumber: string, amountNGN: number) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const amountCNGN = ngnToCNGN(amountNGN);

    // 1. Approve cNGN
    const approveHash = await walletClient.writeContract({
      address: CONTRACTS.cNGN.address,
      abi: CONTRACTS.cNGN.abi,
      functionName: 'approve',
      args: [CONTRACTS.billPay.address, amountCNGN],
    });

    await publicClient?.waitForTransactionReceipt({ hash: approveHash });

    // 2. Pay bill
    const hash = await walletClient.writeContract({
      address: CONTRACTS.billPay.address,
      abi: CONTRACTS.billPay.abi,
      functionName: 'payBill',
      args: [billType, accountNumber, amountCNGN],
    });

    await publicClient?.waitForTransactionReceipt({ hash });
    return hash;
  };
}