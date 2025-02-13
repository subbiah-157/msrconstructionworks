const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel=require('./models/Customer')
const DetailsModel=require('./models/Details')

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001; // Ensure backend always runs on 3001

mongoose.connect("mongodb://127.0.0.1:27017/MsrConstructionWorks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await CustomerModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/signup", (req, res) => {
  CustomerModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/booking", (req, res) => {
  DetailsModel.create(req.body)
  .then((user) => res.json(user))
  .catch((err) => res.status(500).json({ error: err.message }));
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
