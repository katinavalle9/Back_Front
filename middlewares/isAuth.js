import jwt from "jwt-simple";

const isAuth = (req, res, next) => {
  // Obtener el encabezado Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  // Valido que si venga el encabezado Authorization
  if (!authHeader) {
    return res
      .status(404)
      .json({ message: "Authorization header is required" });
  }

  const [bearer, token] = authHeader.split(" "); // String a Arreglo: ['Bearer', 'token']

  if (bearer !== "Bearer") {
    return res
      .status(400)
      .json({ message: "Authorizacion header format is Bearer {token}" });
  }

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const payload = jwt.decode(token, process.env.SECRET);

    const now = Math.floor(Date.now() / 1000); // Fecha actual en segundos

    if (payload.exp < now) {
      return res.status(403).json({ message: "Token has expired" });
    }

    req.role = payload.role;

    next();
  } catch (error) {
    return res.status(403).json({ message: `Token Error: ${error.message}` });
  }
};

export { isAuth };
