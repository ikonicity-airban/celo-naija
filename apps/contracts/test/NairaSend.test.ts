import { expect } from "chai";
import { parseEther, type Signer } from "ethers";
import hre from "hardhat";
import type { CNGN } from "../typechain-types/contracts/CNGN";
import type { NaijaSend } from "../typechain-types/contracts/NaijaSend";

describe("NaijaSend", function () {
  let cngn: CNGN;
  let naijasend: NaijaSend;
  let owner: Signer;
  let user1: Signer;
  let user2: Signer;

  beforeEach(async () => {
    const ethers = (hre as any).ethers;
    [owner, user1, user2] = await ethers.getSigners();

    const CNGN = await ethers.getContractFactory("cNGN");
    cngn = await CNGN.deploy();
    await cngn.waitForDeployment();

    const NaijaSendFactory = await ethers.getContractFactory("NaijaSend");
    naijasend = await NaijaSendFactory.deploy(await cngn.getAddress());
    await naijasend.waitForDeployment();

    const user1Address = await user1.getAddress();
    await cngn.faucet(parseEther("10000"));
    await cngn.transfer(user1Address, parseEther("5000"));
  });

  it("Should send cNGN", async () => {
    const user1Address = await user1.getAddress();
    const user2Address = await user2.getAddress();
    const naijasendAddress = await naijasend.getAddress();
    
    await cngn.connect(user1).approve(naijasendAddress, parseEther("1000"));
    await naijasend.connect(user1).sendToWallet(user2Address, parseEther("1000"), "Family support");
    expect(await cngn.balanceOf(user2Address)).to.equal(parseEther("1000"));
  });
});