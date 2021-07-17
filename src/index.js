const express = require("express");
const socket_io = require("socket.io");

const app = express();
const cors = require("cors");

const connectDB = require("../config/db");

connectDB();
const io = socket_io();

app.use(express.json({ extended: false }));

app.use(cors());

app.get("/", (req, res) => res.send("APi running"));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/teachers", require("./routes/api/teacher"));
app.use("/api/marks", require("./routes/api/marks"));
app.use("/api/community", require("./routes/api/community"));
app.use("/api/image", require("./routes/api/image"));
app.use("/api/like", require("./routes/api/like"));
app.use("/api/profile", require("./routes/api/profile"));

io.listen(app.listen(8080, () => console.log("server running")));
