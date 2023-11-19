const { getUsers } = require("../controller/admin/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const permitTo= require("../middleware/permitTo")

const router = require("express").Router()

router.route("/users").get(isAuthenticated,permitTo('admin'), getUsers)



module.exports = router 