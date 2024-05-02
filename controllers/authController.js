import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email or password are required" });
    }
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);

    newUser.password = undefined;

    return res.status(201).json({
      msg: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `error creating user: ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email or password are required" });
    }

    const user = await User.findOne({ email: req.body.email }); //que el email sea igual al req.body.email

    if (!user) {
      return res.status(400).json({ message: `user or password error` });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password, //contra enviada por el usuario
      user.password //contra hasheada en la bd
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: `User or password error` });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), //fecha de creacion del token
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7), //convertir  segundos y sumar 7 dias
    };

    const token = jwt.encode(payload, process.env.SECRET);

    return res.status(200).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Incorrect login data ${error.message}` });
  }
};

export { register, login };
