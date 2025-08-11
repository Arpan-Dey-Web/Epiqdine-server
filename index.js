require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
// imported jwt =>jsonWebToken
const jwt = require("jsonwebtoken");
// firebase admin
const admin = require("firebase-admin");
// firebase service key file
const decoded = Buffer.from(process.env.FIREBASE_KEY_BASE64, "base64");
// console.log(decoded);

// firebase access token setup
const serviceAccount = JSON.parse(decoded);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// middlewars
app.use(
  cors({
    origin: ["http://localhost:5173", "https://epiqdine.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// mongodb connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.uxzompv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// token verify using firebase
const verifyAcessToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized Acess" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized Acess" });
  }
};
// verify email
const emailVerification = (req, res, next) => {
  if (req.params.email !== req.decoded.email) {
    return res.status(403).send({ message: "Forbidden Access" });
  }
  next();
};

async function run() {
  try {
    // my database
    const database = client.db("foodsProjectdb");
    // database collection
    const foodCollection = database.collection("foodlist");
    const purchaseFoodCollection = database.collection("purchasefoodlist");

    //jwt with cookie
    app.post("/jwt", (req, res) => {
      const userInfo = req.body;
      const email = userInfo;
      // console.log(email);
      const token = jwt.sign(email, process.env.JWT_ACESS_SECRET, {
        expiresIn: "1h",
      });
      // console.log(token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });
      res.send({ sucess: true });
    });

    // add food to database
    app.post("/addfood", async (req, res) => {
      const food = req.body;
      const result = await foodCollection.insertOne(food);
      res.send(result);
    });

    // add purchase food to database
    app.post("/purchasefood", async (req, res) => {
      const purchaseFood = req.body;
      const result = await purchaseFoodCollection.insertOne(purchaseFood);
      res.send(result);
    });

    app.get("/purchasefood", async (req, res) => {
      const result = await purchaseFoodCollection.find().toArray();
      res.send(result);
    });

    // find purchase food by email
    app.get(
      "/purchasefood/:email",
      verifyAcessToken,
      emailVerification,
      async (req, res) => {
        const email = req.params.email;
        const data = req.cookies;
        console.log("coookies", data);
        const result = await purchaseFoodCollection.find({ email }).toArray();
        res.send(result);
      }
    );
// get api 
    // get food by id
    app.get("/getfood/:id", async (req, res) => {
      try {
        const id = req.params.id;
      
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid ID format" });
        }

        const query = { _id:new ObjectId(id) };
        const food = await foodCollection.findOne(query);

        if (!food) {
          return res.status(404).send({ error: "Food not found" });
        }

        res.send(food);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    app.patch("/update/purchasecount/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      console.log(req.body.newvalue);
      const updatedPurchaseFoodCount = req.body.newvalue;
      const updatedDoc = {
        $inc: {
          purchaseFoodCount: updatedPurchaseFoodCount,
        },
      };
      const options = { upsert: true };
      const result = await foodCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // update purchase food by id
    app.put("/update/myfood/:id", verifyAcessToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedFood = req.body;
      const updatedDoc = {
        $set: updatedFood,
      };
      const options = { upsert: true };
      const result = await foodCollection.updateOne(
        filter,
        updatedDoc,
        options
      );

      res.send(result);
    });

    // get food data limit 6
    app.get("/addfood", async (req, res) => {
      const limitedFood = await foodCollection
        .find()
        .sort({ purchaseFoodCount: -1 })
        .limit(6)
        .toArray();
      // console.log(limitedFood);
      res.send(limitedFood);
    });

    // get all food data
    app.get("/addfood/all-food", async (req, res) => {
      const allFoods = await foodCollection.find().toArray();
      res.send(allFoods);
    });

    // get added food by current logged in user email
    app.get(
      "/addfood/all-food/:email",
      verifyAcessToken,
      emailVerification,
      async (req, res) => {
        const email = req.params.email;
        const cursor = foodCollection.find({ userEmail: email });
        const result = await cursor.toArray();
        res.send(result);
      }
    );

    // Delete Food Order
    app.delete("/deleteOrder/:id", async (req, res) => {
      console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await purchaseFoodCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Resturent Server Is Running");
});
app.listen(port, (req, res) => {
  console.log(`Server Is Running On Port ${port}`);
});
