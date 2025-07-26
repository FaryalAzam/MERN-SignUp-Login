// import mongoose from "mongoose";


// const UserSchema = mongoose.Schema(
//     {
//         name : {
//             type : String,
//             required : [true , "Please enter name"]
//         },
//         email : {
//             type : String,
//             required : [true , "Please enter email"],
//             unique : true
//         },
//         password : {
//             type : String,
//             required : [true , "Please enter password"]
//         },
//     }
// )




// const User = mongoose.model("User",UserSchema)
// export default User






import mongoose from "mongoose";

// User Schema
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Export User Model
const User = mongoose.model("User", UserSchema);
export default User;
