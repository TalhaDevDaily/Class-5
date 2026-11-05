function middlewareBlockage {
    if (req.headers.authorization !== 'getintoallusers') return res.status(200).json({
        message: `Unauthorized access: Authentication failed`
    })
    next()
}

module.exports = middlewareBlockage