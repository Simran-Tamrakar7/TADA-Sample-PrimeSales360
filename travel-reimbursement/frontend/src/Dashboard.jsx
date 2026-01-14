

import { useEffect, useState } from "react";
import { getTravels, getExpenses } from "./api";

export default function Dashboard() {
  const [travels, setTravels] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getTravels().then(setTravels);
    getExpenses().then(setExpenses);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Travels</h3>
      {travels.map(t => (
        <div key={t.id}>{t.type} – {t.status}</div>
      ))}

      <h3>Expenses</h3>
      {expenses.map(e => (
        <div key={e.id}>{e.category} – Rs {e.amount}</div>
      ))}
    </div>
  );
}
