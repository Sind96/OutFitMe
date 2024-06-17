const jwt = require('jsonwebtoken');

exports.verifyToken = async (ctx, next) => {
  const token = ctx.request.header.authorization;
  if (!token) {
    return ctx.throw(401, 'You need to login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = decoded;
    next();
  } catch (err) {
    return ctx.throw(403, 'Invalid token');
  }
}