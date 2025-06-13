const express=require("express");
const dotenv=require("dotenv");
dotenv.config();

const mongoose=require("mongoose");

const app=express();
const PORT =3000;

app.get("/nothing",(req,res)=>{
    res.send("hello guys");
})


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log("✅ MongoDB successfully connected");

    } catch (error) {
        console.error("❌ Error while connecting to MongoDB:", error);
    }
};

// Start server after DB is connected
app.listen(PORT, () => {
    console.log("🚀 Server started at http://localhost:" + PORT);
    connectDb();
});