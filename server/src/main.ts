import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import smsRoutes from "./routes/smsRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import locationRoutes from "./routes/locationRoutes";
import { loadCitiesFromCSV } from "./utilities/locationUtils";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/sms", smsRoutes);
app.use("/api/locations", locationRoutes);
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
