var express = require('express');
var router = express.Router();
import HelloApi from "../api/hello.api"


let helloApi = new HelloApi();
router.get('/hello', helloApi.get);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
