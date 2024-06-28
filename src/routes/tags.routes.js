const { Router } = require("express")

const TagsController = require("../controllers/TagsController")
const ensureAuthenticate = require("../middlewares/ensureAuthenticate")

const tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.get("/", ensureAuthenticate, tagsController.index)

module.exports = tagsRoutes