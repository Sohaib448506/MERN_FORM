const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const { jwtPrivateKey } = require("../config/index");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const createUser = require("../services/createUser");
const express = require("express");
const router = express.Router();
router.post("/signup", async (req, res) => {
  const findUser = await User.find({ email: req.body.email });
  if (findUser.length !== 0) {
    return res.status(409).send("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  passwordEncrypt = await bcrypt.hash(req.body.password, salt);

  const result = await createUser(
    req.body.name,
    req.body.email,
    passwordEncrypt
  );
  const token = jwt.sign({ _id: result._id }, jwtPrivateKey, {
    expiresIn: "120",
  });

  res.send(token);
  // return res.send({
  //   name: result.name,
  //   email: result.email,
  //   Message: "User has been Created Successfully",
  // });
});
router.post("/auth", async (req, res) => {
  if (req.body.token) {
    const token = await jwt.decode(req.body.token, jwtPrivateKey);
    const findTokenDecoded = await User.find({ _id: token._id });
    if (findTokenDecoded.length === 0) {
      return res.send("No tken");
    }

    var findUser = await User.find({ email: findTokenDecoded[0].email });

    if (findUser.length === 0) {
      return res.send("Invalid Token");
    }

    return res.send("Verified Registered");
  }

  var findUser = await User.find({ email: req.body.email });
  if (findUser.length === 0) {
    return res.send("Invalid Email");
  }

  //  const passwordMarch =
  //   (await req.body.password) === findUser[0].password ? true : false;
  const passwordMarch = await bcrypt.compare(
    req.body.password,
    findUser[0].password
  );

  if (!passwordMarch) {
    return res.send("Wrong Password");
  }

  return res.send("Verified Registered");
});
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx|odt)$/)) {
      return cb(new Error("Upload a word document"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    console.log("🚀 ~ file: index.js ~ line 86 ~  req.user before", req);

    req.user.picture = req.file.buffer;
    console.log("🚀 ~ file: index.js ~ line 86 ~  req.user", req.user);
    res.send("File Uploaded Successfully");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
