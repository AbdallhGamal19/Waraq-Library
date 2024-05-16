import jwt from "jsonwebtoken";
import { userModel } from "../../DB/models/user.model.js";
const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return next(new Error("token is undefinde", { cause: 404 }));
    }
    const decode = jwt.verify(token, "192000");
    if (decode?.email) {
      const user = await userModel.findOne({ email: decode.email });
      if (!user) {
        return next(new Error("user not found", { cause: 404 }));
      }
      req.user = user;
      return next();
    }
  } catch (error) {
    return next(new Error(error, { cause: 400 }));
  }
};

export default authentication;
