// import express from "express"
// import dotenv from "dotenv"
// import mongoose from "mongoose"
// import User from "./model/userSchema.js"
// import { hashMyPassword , comparePassword } from "./utils/hashPassword.js"

// dotenv.config()
// const app = express()
// app.use(express.json())

// // Api
// app.get('/', (req, res) => {
//   res.send('LAIBA PAGAL')
// })


// // sigup

// app.post("/signup", async (req,res)=>{
// try {
//     const {name , email , password , confirmPassword} = req.body

//     // sare fileds ko check karnay ka liya validation lagai ha 
//     if (!name || !email || !password || !confirmPassword){
//         res.status(400).json({message:"Please fill all this fields"})
//     }

//     // same email say dobara access na karnay ka liya validation
//     const duplicateUser = await User.findOne({email})
//     if(duplicateUser){
//         res.status(400).json({message:"User already exists"})
//     }

//     // password 6 characters say zyada hona cahiya
//     if(password.length < 6){
//          res.status(400).json({message:"Password must be atleast 6 characters long"})
//     }

//     // password hash karnay ka function
//     const hashedPassword = await hashMyPassword(password)
//     const userAdd = await User.create({name , email , password:hashedPassword , confirmPassword})
//     console.log(userAdd);
//     res.status(200).json({message:"Signup Successfully",userAdd})
// } catch (error) {
//     res.status(500).json({message:error.message})
// }
// })


// // login

// app.post("/login", async (req,res)=>{
//   const { email , password } = req.body
//     //  Email
//     const user = await User.findOne({email})
//     if(!user){
//         return res.status(400).json({message:"User not found"})
//     }
//     // Password
//     const match = await comparePassword(password,user.password)
//     if(!match){
//         return res.status(400).json({message:"Password does not match"})
//     }
//     res.status(200).json({message:"Login succeessfully" ,user})
// })



// // Mongodb Connect
// const db = process.env.MONGODB_URL
// const connection = mongoose.connect(db)

// .then(() =>{ console.log('✅ MongoDB connected via .env')
// })
// .catch((err) => {
//     console.log('❌ MongoDB connection error:', err)
// });




// // server 
// const port = process.env.PORT
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })






















// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import User from "./model/userSchema.js";
// import { hashMyPassword, comparePassword } from "./utils/hashPassword.js";
// import cors from 'cors';

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Home Route
// app.get('/', (req, res) => {
//   res.send('LAIBA PAGAL');
// });

// // ✅ SIGNUP Route
// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     // Check all fields
//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: "Please fill all the fields" });
//     }

//     // Check duplicate email
//     const duplicateUser = await User.findOne({ email });
//     if (duplicateUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Check password match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Password length check
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters long" });
//     }

//     // Hash the password
//     const hashedPassword = await hashMyPassword(password);

//     // Create new user (don't save confirmPassword)
//     const userAdd = await User.create({ name, email, password: hashedPassword });

//     // Don't send password in response
//     const { password: _, ...userWithoutPassword } = userAdd._doc;

//     res.status(200).json({ message: "Signup Successfully", user: userWithoutPassword });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ LOGIN Route
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Check password match
//     const match = await comparePassword(password, user.password);
//     if (!match) {
//       return res.status(400).json({ message: "Password does not match" });
//     }

//     // Don't send password in response
//     const { password: _, ...userWithoutPassword } = user._doc;

//     res.status(200).json({ message: "Login Successfully", user: userWithoutPassword });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("✅ MongoDB connected via .env");
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB connection error:", err);
//   });

// // Start Server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });






















import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import User from "./model/userSchema.js";
import { hashMyPassword, comparePassword } from "./utils/hashPassword.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🏠 Home Route
app.get("/", (req, res) => {
  res.send("LAIBA PAGAL");
});

// ✅ SIGNUP Route
app.post("/signup", async (req, res) => {
  console.log("📩 Signup API called:", req.body);

  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check all fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check duplicate email
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Hash password
    const hashedPassword = await hashMyPassword(password);

    // Create user
    const userAdd = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = userAdd._doc;

    res.status(200).json({ message: "Signup Successfully", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ LOGIN Route
app.post("/login", async (req, res) => {
  console.log("🔐 Login API called:", req.body);

  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({ message: "Login Successfully", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected via .env");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });

// ✅ Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
