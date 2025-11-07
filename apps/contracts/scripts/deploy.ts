import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1. Deploy cNGN
  const cNGN = await ethers.deployContract("cNGN");
  await cNGN.waitForDeployment();
  console.log("cNGN deployed to:", cNGN.target);

  // 2. Deploy NaijaSend (mock SocialConnect = zero address)
  const NaijaSend = await ethers.deployContract("NaijaSend", [cNGN.target, ethers.ZeroAddress]);
  await NaijaSend.waitForDeployment();
  console.log("NaijaSend deployed to:", NaijaSend.target);

  // 3. Deploy BillPayEscrow
  const BillPay = await ethers.deployContract("BillPayEscrow", [cNGN.target]);
  await BillPay.waitForDeployment();
  console.log("BillPayEscrow deployed to:", BillPay.target);

  // 4. Demo mint
  await cNGN.demoMint(100_000 * 1e18);
  console.log("Demo: 100k cNGN minted");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});