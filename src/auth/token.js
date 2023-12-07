require("dotenv").config();
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Usuario não Logado!" });
  }

  try {
    const acesssecret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, acesssecret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}

function getUserNameFromToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Token não fornecido!" });
  }

  try {
    const acesssecret = process.env.ACCESS_TOKEN_SECRET;
    const payload = jwt.verify(token, acesssecret);

    res.locals.userName = payload.UserInfo.name;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}

module.exports = { checkToken, getUserNameFromToken };
