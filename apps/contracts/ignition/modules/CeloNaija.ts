import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CeloNaijaModule = buildModule("CeloNaijaModule", (m) => {
  const cngn = m.contract("cNGN");
  const celoNaija = m.contract("CeloNaija", [cngn]);
  const billPay = m.contract("BillPayEscrow", [cngn]);

  return { cngn, celoNaija, billPay };
});

export default CeloNaijaModule;