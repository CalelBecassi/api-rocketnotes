const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticate = require("../middlewares/ensureAuthenticate")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

// function myMiddleware(req, res, next) {
//   console.log("Estou no middleware");

//   next();
// }

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticate, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticate, upload.single("avatar"), userAvatarController.update)
// usersRoutes.post("/", myMiddleware, usersController.create)

module.exports = usersRoutes