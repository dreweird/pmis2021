'use strict';

let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token);
  let result;
  if (token) {
    try {
      result = jwt.verify(token, 'pmis2019');
      req.decoded = result;
      next();
    } catch (err) {
      res.status(401).send(err);
      throw new Error(err);
    }
  } else {
    result = {
      error: 'Authentication error. Token required.',
      status: 401
    };
    res.status(401).send(result);
  }
};

module.exports = {
  checkToken: checkToken
};
