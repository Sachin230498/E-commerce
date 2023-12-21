const { connectDb } = require("./config/db");
const app = require("./index");
const PORT = process.env.PORT || 5454;

app.listen(PORT, async() => {
    await connectDb();
    console.log(`E-commerce API listening on PORT: ${PORT}`);
});
