import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    const sms = await axios.post("https://api.ideamart.io/sms/send", {
      version: "1.0",
      applicationId: "APP_066154",
      password: "16d09f64ea091a23ca011a372c6ddb65",
      message: "Hello",
      destinationAddresses: ["tel:94779364550"],
      sourceAddress: "77000",
      deliveryStatusRequest: "1",
      encoding: "245",
      binaryHeader:
        "526574697265206170706c69636174696f6e20616e642072656c6561736520524b7320696620666f756e642065787069726564",
    });
    console.log(sms.data);
    res.send(sms.data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
