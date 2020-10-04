const base64 = require('base-64');

const User = require('../collections-schema/users/user-schema');
/**
 * 
 * @param {*this will hold authorization of type basic that we need to sign up } req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = async (req, res, next) => {
  // pass the username and password to this method;
  // Basic Authentication (HTTP Headers)
  const auth = req.headers.authorization.split(' ');
  if (auth[0] === 'Basic') {
    const [username, password] = base64.decode(auth[1]).split(':');
    const authUser = new User({ username, password });
    try {
      const { isValid, user } = await authUser.authenticateUser();
      req.isValid = isValid;
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  } else { next('Invalid Login!! '); }
};