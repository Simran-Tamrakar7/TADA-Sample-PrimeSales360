

import TravelForm from "./TravelForm";
import ExpenseForm from "./ExpenseForm";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div>
      <h1>Travel & Reimbursement</h1>
      <Dashboard />
      <TravelForm />
      <ExpenseForm />
    </div>
  );
}
