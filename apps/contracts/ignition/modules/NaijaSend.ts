import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NaijaSendModule = buildModule("NaijaSendModule", (m) => {
  const cngn = m.contract("cNGN");
  const naijaSend = m.contract("NaijaSend", [cngn]);
  const billPay = m.contract("BillPayEscrow", [cngn]);

  return { cngn, naijaSend, billPay };
});

export default NaijaSendModule;
