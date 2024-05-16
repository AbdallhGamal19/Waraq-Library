import { userModel } from "../../../DB/models/user.model.js";
import { errorHandling } from "../../utlis/errorHandling.js";
import bcrypt from "bcrypt";
const getUser = errorHandling(async (req, res, next) => {
  const { email } = req.user;
  console.log(email);
  const user = await userModel.findOne({ email });
  return res.json({ message: " success", user });
});
const deleteUser = errorHandling(async (req, res, next) => {
  const { email } = req.user;
  const user = await userModel.findOneAndDelete({ email });
  return res.json({ message: " success", user });
});
const updateUser = errorHandling(async (req, res, next) => {
  const { email } = req.user;
  const { password, userName } = req.body;
  const hashPassword = bcrypt.hashSync(password, 5);

  const user = await userModel.findOneAndUpdate(
    { email },
    { password: hashPassword, userName },
    { new: true }
  );
  return res.json({ message: " success", user });
});

export { getUser, deleteUser, updateUser };
