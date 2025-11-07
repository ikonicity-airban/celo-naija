export const mockAirtime = async (phone: string, amount: number) => {
    await new Promise((r) => setTimeout(r, 800));
    return { success: true, phone, amount, receipt: `AIR-${Date.now()}` };
  };
  
  export const mockBill = async (biller: string, meter: string, amount: number) => {
    await new Promise((r) => setTimeout(r, 800));
    return { success: true, biller, meter, amount, receipt: `BILL-${Date.now()}` };
};