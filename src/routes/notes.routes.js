const { Router } = require("express")

const NotesController = require("../controllers/NotesController")
const ensureAuthenticate = require("../middlewares/ensureAuthenticate")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticate) // middleware para verificar se o usuário está logado

notesRoutes.get("/", notesController.index)
notesRoutes.post("/", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes