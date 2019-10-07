const { Router } = require('express');
const User = require('./model');
const router = new Router();
const bcrypt = require('bcrypt');

router.post('/user', (request, response, next) => {
  const user = {
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10),
  };

  User.create(user)
    .then(result =>
      response.send({
        email: result.email,
        id: result.id,
      })
    )
    .catch(console.error);
});

module.exports = router;
