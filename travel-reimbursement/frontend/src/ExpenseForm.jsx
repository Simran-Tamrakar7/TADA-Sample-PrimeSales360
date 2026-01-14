

import { useState } from "react";
import { addExpense } from "./api";

export default function ExpenseForm() {
  const [expense, setExpense] = useState({});

  const submit = async () => {
    await addExpense(expense);
    alert("Expense Added");
  };

  return (
    <div>
      <h2>Add Expense</h2>

      <input
        placeholder="Category"
        onChange={e => setExpense({ ...expense, category: e.target.value })}
      />
      <input
        placeholder="Amount"
        onChange={e => setExpense({ ...expense, amount: e.target.value })}
      />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
