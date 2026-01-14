

const BASE = "http://localhost:4000";

export const getTravelTypes = () =>
  fetch(`${BASE}/travel-types`).then(r => r.json());

export const createTravel = data =>
  fetch(`${BASE}/travel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());

export const getTravels = () =>
  fetch(`${BASE}/travel`).then(r => r.json());

export const addExpense = data =>
  fetch(`${BASE}/expense`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());

export const getExpenses = () =>
  fetch(`${BASE}/expense`).then(r => r.json());
