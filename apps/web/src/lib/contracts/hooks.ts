import { usePublicClient, useWalletClient, useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import { db } from "../db/client";
import { createTx, linkWallet, updateTxStatus } from "../db/queries";
import { users } from "../db/schema";
import { CONTRACTS } from "../contracts";
import { eq } from "drizzle-orm";

const contracts = {
  cNGN: process.env.NEXT_PUBLIC_CNGN!,
  celoNaija: process.env.NEXT_PUBLIC_CELO_NAIJA!,
};

export const useSendMoney = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();


  return async (recipientPhone: string, amountNGN: string) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    // 1. Resolve recipient wallet (DB cache)
    const [recipient] = await db
      .select()
      .from(users)
      .where(eq(users.phoneNumber, recipientPhone))
      .limit(1);

    const amountCNGN = parseEther(amountNGN); // 1:1 for demo

    // 2. Approve cNGN
    const approveHash = await walletClient.writeContract({
      address: contracts.cNGN as `0x${string}`,
      abi: CONTRACTS.cNGN.abi,
      functionName: "approve",
      args: [contracts.celoNaija, amountCNGN],
    });
    await publicClient?.waitForTransactionReceipt({ hash: approveHash });

    // 3. Send via phone
    const sendHash = await walletClient.writeContract({
      address: contracts.celoNaija as `0x${string}`,
      abi: CONTRACTS.celoNaija.abi,
      functionName: "sendToPhone",
      args: [recipientPhone, amountCNGN, "Family support"],
    });

    // 4. Save pending tx
    await createTx({
      userId: (await db.select().from(users).where(eq(users.phoneNumber, address)))[0].id,
      type: "sent",
      recipientPhone,
      recipientWallet: recipient?.walletAddress ?? undefined,
      amountNGN,
      amountCNGN,
      txHash: sendHash,
      status: "pending",
    });

    // 5. Listen for confirmation
    publicClient?.waitForTransactionReceipt({ hash: sendHash }).then(async () => {
      await updateTxStatus(sendHash, "completed");
      // Link wallet if first send
      if (!recipient?.walletAddress) {
        await linkWallet(recipientPhone, address);
      }
    });

    return sendHash;
  };
};