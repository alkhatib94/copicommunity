export async function fetchCMCPrices() {
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=COPI,ETH,ADA&convert=USD";

  try {
    const r = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY ?? "",
        Accept: "application/json",
      },
      // important: no cache
      cache: "no-store",
    });

    if (!r.ok) {
      throw new Error(`CMC API error: ${r.status}`);
    }

    const data = await r.json();
    return data.data;
  } catch (e) {
    console.error("CMC fetch failed, using fallback", e);
    return {
      COPI: { quote: { USD: { price: 0.02, percent_change_24h: 0.5 } } },
      ETH: { quote: { USD: { price: 3500, percent_change_24h: -1.2 } } },
      ADA: { quote: { USD: { price: 0.45, percent_change_24h: 0.8 } } },
    };
  }
}
