import express, { Application, Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import smsRoutes from "./routes/smsRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import { loadCitiesFromCSV } from "./utilities/locationUtils";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/sms", smsRoutes);
app.use("/api/subscription", subscriptionRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the Rescue Smart API");
});

loadCitiesFromCSV().catch((err: any) => {
  console.error("Failed to load cities:", err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
