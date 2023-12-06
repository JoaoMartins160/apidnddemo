const bcrypt = require("bcrypt");
const User = require("../models/userschema");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//registrar novo usuario
const handleNewUser = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatorio!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatorio!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatoria!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Por Favor, utilize outro e-mail" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save(
      res.status(201).json({ msg: "Usuário criado com sucesso!" })
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "error" });
  }
};

//login
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatorio!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatoria!" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const refreshsecret = process.env.REFRESH_TOKEN_SECRET;

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      refreshsecret
    );
    const accessToken = generateAcessToken({ user: user._id });

    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "Autenticação realizada com sucesso",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};

function generateAcessToken(user) {
  const acesssecret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign(user, acesssecret, { expiresIn: "10m" });
}

//logout
const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(205);
};

//resfresh do token
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: User._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.json({ accessToken });
  });
};

module.exports = {
  handleNewUser,
  handleLogin,
  handleRefreshToken,
  handleLogout,
};
