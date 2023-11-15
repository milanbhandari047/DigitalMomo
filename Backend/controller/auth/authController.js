const User = require("../../model/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register api
exports.registerUser = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  if (!username || !email || !password || !phoneNumber) {
    return res.status(400).json({
      message: "Please provide email,password,phoneNumber",
    });
  }

  //check if that email user already exist or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with that email already registered",
    });
  }

  //else
  await User.create({
    userName: username,
    userEmail: email,
    userPhoneNumber: phoneNumber,
    userPassword: bcrypt.hashSync(password, 10),
  });

  res.status(201).json({
    message: "User register successfully",
  });
};

//login api
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email, password",
    });
  }

  //check if that email user exist or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User with that email is not Registered",
    });
  }

  // password check
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
  if (isMatched) {
    //generate token

    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } else {
    res.status(404).json({
      message: "Invalid Password",
    });
  }
};
