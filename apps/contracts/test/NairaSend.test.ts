import { expect } from "chai";

describe("NaijaSend", function () {
  let cngn: any, naijasend, owner, user1, user2;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const CNGN = await ethers.getContractFactory("cNGN");
    cngn = await CNGN.deploy();
    await cngn.waitForDeployment();

    const NaijaSend = await ethers.getContractFactory("NaijaSend");
    naijasend = await NaijaSend.deploy(cngn.target);
    await naijasend.waitForDeployment();

    await cngn.faucet(10_000 * 1e18);
    await cngn.transfer(user1.address, 5000 * 1e18);
  });

  it("Should send cNGN", async () => {
    await cngn.connect(user1).approve(naijasend.target, 1000 * 1e18);
    await naijasend.connect(user1).sendToWallet(user2.address, 1000 * 1e18, "Family support");
    expect(await cngn.balanceOf(user2.address)).to.equal(1000 * 1e18);
  });
});