function middlewareBlockage(req, res, next) {
  if (req.headers.authorization !== 'getintoallusers')
    return res.status(401).json({
      message: `Unauthorized access: Authentication failed`,
    });
  next();
}

module.exports = middlewareBlockage;
