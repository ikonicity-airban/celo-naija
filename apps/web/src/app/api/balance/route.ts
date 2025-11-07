// apps/web/src/app/api/balance/route.ts
import { NextResponse } from "next/server";
import { createPublicClient, http, formatEther } from "viem";
import { celoAlfajores } from "viem/chains";
import { CONTRACTS } from "@/lib/contracts";
import { cngnToNGN } from "@/lib/contracts/utils";

const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address parameter required" },
        { status: 400 }
      );
    }

    // Fetch cNGN balance from contract
    const balanceCNGN = await publicClient.readContract({
      address: CONTRACTS.cNGN.address,
      abi: CONTRACTS.cNGN.abi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    });

    // Convert to NGN for display
    const balanceNGN = cngnToNGN(balanceCNGN as bigint);

    return NextResponse.json({
      success: true,
      data: {
        cNGN: Number(formatEther(balanceCNGN as bigint)),
        ngn: balanceNGN,
        address,
      },
    });
  } catch (error: any) {
    console.error("Balance fetch error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to fetch balance",
        success: false 
      },
      { status: 500 }
    );
  }
}