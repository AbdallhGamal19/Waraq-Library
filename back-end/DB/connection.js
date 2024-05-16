import mongoose from "mongoose";
const livEurl =
  "mongodb+srv://abdallh:abdo192000@cluster0.znn0ww0.mongodb.net/waraq";
const clientUrl = "mongodb://localhost:27017/waraq";
export async function connectDB() {
  await mongoose
    .connect(process.env.DBURL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log({ DBerrorr: error });
    });
}
