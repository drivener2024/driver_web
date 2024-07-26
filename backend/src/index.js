const { PORT, HOST } = require("./config/configEnv.js");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const indexRoutes = require("./routes/index.routes.js");
const { setupDB } = require("./config/configDB.js");
const { handleFatalError, handleError } = require("./utils/errorHandler.js");
const { createRoles, createUsers } = require("./config/initSetup");

async function setupServer() {
  try {
    const server = express();
    server.use(express.json());
    server.use(cors({ credentials: true, origin: true }));
    server.use(cookieParser());
    server.use(morgan("dev"));
    server.use(express.urlencoded({ extended: true }));
    server.use("/api", indexRoutes);

    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    await createRoles();
    await createUsers();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
