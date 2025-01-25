require("dotenv").config({ path: "src/.env" });
const express = require("express");
const currencyRoutes = require("./routes/currenciesRouters");

const app = express();

app.use(express.json());
app.use("/api/currencies", currencyRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server started listening on PORT ${PORT}`);
});
