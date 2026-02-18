import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import Task from "../src/model/Task.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const count = await Task.countDocuments();

    if (count === 0) {
      await Task.insertMany([
        { title: "Welcome to Todo Work" },
        { title: "Create your first task" },
      ]);
    }

    console.log("Database initialized successfully");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    process.exit(1);
  }
};

seed();

