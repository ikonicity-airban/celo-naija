import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserPhone } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useAccount } from "wagmi";

/**
 * Hook to fetch user balance
 */
export function useBalance() {
  const { address } = useAccount();
  const phone = getUserPhone();

  return useQuery({
    queryKey: ["balance", address || phone],
    queryFn: async () => {
      if (!address && !phone) return null;
      
      const url = address 
        ? `/api/balance?address=${encodeURIComponent(address)}`
        : `/api/balance?phone=${encodeURIComponent(phone!)}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch balance");
      const data = await res.json();
      return data.data || data;
    },
    enabled: !!(address || phone),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

/**
 * Hook to fetch user transactions
 */
export function useTransactions() {
  const phone = getUserPhone();

  return useQuery({
    queryKey: ["transactions", phone],
    queryFn: async () => {
      if (!phone) return [];
      
      const res = await fetch(`/api/transactions?phone=${encodeURIComponent(phone)}`);
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return await res.json();
    },
    enabled: !!phone,
    refetchInterval: 30000,
  });
}

/**
 * Hook to send money
 */
export function useSendMoney() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const phone = getUserPhone();

  return useMutation({
    mutationFn: async ({ recipientPhone, amountNGN, txHash }: {
      recipientPhone: string;
      amountNGN: number;
      txHash?: string;
    }) => {
      const res = await apiRequest("POST", "/api/send", {
        senderPhone: phone,
        senderAddress: address,
        recipientPhone,
        amountNGN,
        txHash,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

/**
 * Hook to purchase airtime
 */
export function usePurchaseAirtime() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const phone = getUserPhone();

  return useMutation({
    mutationFn: async ({ network, phone: recipientPhone, amountNGN, txHash }: {
      network: string;
      phone: string;
      amountNGN: number;
      txHash?: string;
    }) => {
      const res = await apiRequest("POST", "/api/airtime", {
        userPhone: phone,
        userAddress: address,
        network,
        phone: recipientPhone,
        amountNGN,
        txHash,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

/**
 * Hook to pay bills
 */
export function usePayBill() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const phone = getUserPhone();

  return useMutation({
    mutationFn: async ({ billType, meterNumber, amountNGN, packageName, txHash }: {
      billType: string;
      meterNumber: string;
      amountNGN: number;
      packageName?: string;
      txHash?: string;
    }) => {
      const res = await apiRequest("POST", "/api/bill", {
        userPhone: phone,
        userAddress: address,
        billType,
        meterNumber,
        amountNGN,
        packageName,
        txHash,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}


