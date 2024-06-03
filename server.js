const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Load users from the JSON file
const usersFilePath = path.join(__dirname, "files", "userdetails.json");

// Endpoint for user signup
app.post("/api/signup", (req, res) => {
  const { name, mobileNumber, email } = req.body;

  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const users = JSON.parse(data);
    const newID = users.length ? users[users.length - 1].id * 1 + 1 : 1;
    const newUser = { id: newID, name, mobileNumber, email };

    users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error writing users file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json(newUser);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
