const routes = require('express').Router()

routes.get('/', (req, res) => {
  return res.json({"msg": "aoba"})
})

module.exports = routes;