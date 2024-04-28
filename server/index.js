const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const adminRouter = require("./src/controllers/admin.controller");
const cityRouter = require("./src/controllers/city.controller");
const busRouter = require("./src/controllers/bus.controller");
const userRouter = require("./src/controllers/user.controller");
const orderRouter = require("./src/controllers/order.controller");
const paymentController = require('./src/controllers/payment.controller');
const connect = require("./src/configs/db");
app.use(cors({
  origin: ["https://swami-travels-client.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/city", cityRouter);
app.use("/bus", busRouter);
app.use("/order", orderRouter);

// Razorpay payment
app.use("/api/payment", paymentController);

// Handle preflight requests
app.options('*', cors());

app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listening on port ${port}`);
    console.log('Server is running');
  } catch (error) {
    console.log(error.message);
  }
});
