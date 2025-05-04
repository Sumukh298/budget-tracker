const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
require("./routes/user.routes")(app);
require("./routes/transaction.routes")(app);
require("./routes/category.routes")(app);
require("./routes/bank.routes")(app);

// Connect to DB and sync
db.sequelize.sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Failed to sync DB: " + err.message);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
