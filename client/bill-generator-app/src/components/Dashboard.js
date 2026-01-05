import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  const fetchMonthlySales = async () => {
    const res = await axios.get(
      "https://bill-generator-fhaf.onrender.com/api/orders/stats/monthly"
    );
    setSales(res.data);
  };

  return (
    <div>
      <h2>📊 Monthly Sales</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Sales</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((s) => (
            <tr key={s._id}>
              <td>{new Date(2024, s._id - 1).toLocaleString("default", { month: "long" })}</td>
              <td>₹{s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
