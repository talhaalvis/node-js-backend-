const app = require("./App");
const dotenv = require("dotenv");
const connectDataBase = require("./Config/DataBase");

dotenv.config({ path: "Backend/Config/Config.env" });
// connect data base to mongoDb

connectDataBase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost://http${process.env.PORT}`);
});
