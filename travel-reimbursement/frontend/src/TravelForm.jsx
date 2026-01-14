import { useEffect, useState } from "react";
import { getTravelTypes, createTravel } from "./api";

export default function TravelForm() {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    getTravelTypes().then(setTypes);
  }, []);

  const submit = async () => {
    await createTravel(form);
    alert("Travel Submitted");
  };

  return (
    <div>
      <h2>New Travel</h2>

      <select onChange={e => setForm({ ...form, type: e.target.value })}>
        <option>Select Travel Type</option>
        {types.map(t => (
          <option key={t.type}>{t.type}</option>
        ))}
      </select>

      <input
        placeholder="Purpose"
        onChange={e => setForm({ ...form, purpose: e.target.value })}
      />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
