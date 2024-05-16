import { userModel } from "../../../../DB/models/user.model.js";
import { errorHandling } from "../../../utlis/errorHandling.js";
import sendEmail from "../../../utlis/sendEmail.js";
import * as authValidation from "../validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const sginUp = errorHandling(async (req, res, next) => {
  const { userName, email, password, phone } = req.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    const hashPassword = bcrypt.hashSync(password, 5);
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
      phone,
    });
    const token = jwt.sign(
      {
        userName,
        email,
      },
      process.env.SECRETKEY
    );
    const resulte = await sendEmail({
      to: email,
      subject: "confirmation Email",
      html: `<p>Click to confirm email...<a href=http://localhost:5001/auth/confirmEmail/${token}>confirm</a></p>`,
    });
    console.log(resulte);
    if (!resulte) return next(new Error("Invalid Email"));
    return res.status(200).json([{ message: "success" }]);
  }
  return next(new Error("email already registered"));
});
const logIn = errorHandling(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, isConfirmed: true });
  if (!user) {
    return next(new Error("UnRegistered acount"));
  }
  const dhashPassword = bcrypt.compareSync(password, user.password);
  if (!dhashPassword) {
    return next(new Error(" unRegistered acount", { cause: 404 }));
  }
  const token = jwt.sign(
    {
      userName: user.userName,
      email: user.email,
      phone: user.phone,
    },
    process.env.SECRETKEY
  );
  res.json({ message: "login success", token: token });
});

const confirmEmail = errorHandling(async (req, res, next) => {
  const { token } = req.params;
  const decode = jwt.verify(token, process.env.SECRETKEY);
  const user = await userModel.findOneAndUpdate(
    { email: decode.email },
    { isConfirmed: true },
    { new: true }
  );
  if (user.isConfirmed) {
    return res.redirect("http://localhost:3000/logIn");
  }
  return next(new Error("Can not confirm "));
});
export { sginUp, logIn, confirmEmail };
