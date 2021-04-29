const express = require("express");
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require("express-rate-limit");

const authUser = require('../user/authUser-router.js')
const userRouter = require('../user/user-router.js')

const authAdmin = require('../admin/authMain-router.js')
const adminRouter = require('../admin/admin-router.js')

const marketRouter = require('../market/market-router.js')

const cartRouter = require('../cart/cart-router.js')

const server = express();

const minuteLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 300,
    message: "The request limit has been exceeded try again in a minute."
});

const hourLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "The request limit has been exceeded try again in about an hour."
});

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(minuteLimiter)
server.use(hourLimiter)

server.use("/api", authUser)
server.use("/api", userRouter)

server.use("/api", authAdmin)
server.use("/api", adminRouter)

server.use("/api/store", marketRouter)

server.use("/api/store", cartRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

module.exports = server;