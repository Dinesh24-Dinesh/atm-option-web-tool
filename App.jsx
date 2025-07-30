import { useState } from "react";

const stockList = [
  "RELIANCE", "TATASTEEL", "INFY", "HDFCBANK", "ICICIBANK", "SBIN",
];

export default function App() {
  const [stock, setStock] = useState("RELIANCE");
  const [ltp, setLtp] = useState(2900);
  const [strike, setStrike] = useState(2900);

  const expiry = "29AUG2024";

  const handleStockChange = (e) => {
    const selected = e.target.value;
    setStock(selected);
    let dummyLtp = 2921;
    setLtp(dummyLtp);
    setStrike(Math.round(dummyLtp / 10) * 10);
  };

  const getSymbol = (type) => {
    return `${stock}${expiry}${strike}${type}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">ATM Option Charts Tool</h1>

        <div className="mb-4">
          <label className="mr-2 font-medium">Select Stock:</label>
          <select
            value={stock}
            onChange={handleStockChange}
            className="p-2 border rounded"
          >
            {stockList.map((stk) => (
              <option key={stk} value={stk}>{stk}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 text-lg">
          LTP: ₹{ltp} | ATM Strike: {strike}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-2 bg-white rounded">
            <h2 className="font-semibold mb-2">Call Option Chart</h2>
            <TVChart symbol={`NSE:${getSymbol("CE")}`} />
          </div>

          <div className="border p-2 bg-white rounded">
            <h2 className="font-semibold mb-2">Put Option Chart</h2>
            <TVChart symbol={`NSE:${getSymbol("PE")}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TVChart({ symbol }) {
  return (
    <iframe
      src={`https://www.tradingview.com/chart/?symbol=${symbol}`}
      width="100%"
      height="400"
      frameBorder="0"
      title={symbol}
      allowFullScreen
    />
  );
}