// Middleware Blockage
function middlewareBlockage(req, res, next) {
  if (req.headers.authorization !== 'getintoallusers')
    return res.status(200).send(`Authentication failed: Unauthorized access`);
  next();
}

module.exports = middlewareBlockage;
