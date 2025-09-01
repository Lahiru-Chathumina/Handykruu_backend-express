import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/customers/register - create new customer (registration)
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const newCustomer = new Customer({ fullName, email, phone, password });
    const savedCustomer = await newCustomer.save();

    res.status(201).json({ message: "Registration successful", customer: savedCustomer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/customers/login - customer login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find customer by email and password
    const customer = await Customer.findOne({ email, password });

    if (!customer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", customer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optional: POST create new customer (generic)
router.post("/", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
