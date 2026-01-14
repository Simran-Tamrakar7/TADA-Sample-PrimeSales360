
import express from "express";
import cors from "cors";
import { travelTypes, travels, expenses } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

// Travel types
app.get("/travel-types", (req, res) => {
  res.json(travelTypes);
});

// Create travel request
app.post("/travel", (req, res) => {
  const travel = {
    id: Date.now(),
    status: "Submitted",
    ...req.body
  };
  travels.push(travel);
  res.json(travel);
});

// Get all travels
app.get("/travel", (req, res) => {
  res.json(travels);
});

// Add expense
app.post("/expense", (req, res) => {
  const expense = {
    id: Date.now(),
    status: "Pending",
    ...req.body
  };
  expenses.push(expense);
  res.json(expense);
});

// Get expenses
app.get("/expense", (req, res) => {
  res.json(expenses);
});

app.listen(4000, () =>
  console.log("✅ Backend running on http://localhost:4000")
);
