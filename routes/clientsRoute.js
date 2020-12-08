const { createClient } = require("../controllers/clientsController");
const router = require("express").Router();

router.post("/",createClient);

module.exports = router;