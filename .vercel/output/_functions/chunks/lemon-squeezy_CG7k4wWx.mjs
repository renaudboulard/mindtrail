async function verifyPurchaseByEmail(email) {
  {
    console.warn("LEMONSQUEEZY_API_KEY not configured — dev mode, skipping verification");
    return true;
  }
}

export { verifyPurchaseByEmail as v };
