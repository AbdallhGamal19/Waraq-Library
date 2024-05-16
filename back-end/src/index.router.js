import { connectDB } from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import bookRouter from "./modules/book/book.router.js";
import userRouter from "./modules/user/user.router.js";
import cors from "cors";
function bootstrap(app, express) {
  app.use(express.json());
  app.use(cors());
  app.use("/uploads", express.static("uploads"));
  app.use("/auth", authRouter);
  app.use("/book", bookRouter);
  app.use("/user", userRouter);
  app.all("*", (req, res, next) => {
    next(new Error("page not found", { cause: 404 }));
  });
  app.use((error, req, res, next) => {
    return res.json([
      {
        error: error.message,
        errorStack: error.stack,
      },
    ]);
  });
  connectDB();
}

export default bootstrap;
