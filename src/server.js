require("express-async-errors")
require("dotenv/config")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const cors = require("cors")
const express = require("express") //importando biblioteca express
const routes = require("./routes")

migrationsRun()

const app = express() //inicializando express
app.use(cors()) //ativando CORS
app.use(express.json()) //informando que o padrão do body das requisições vai ser JSON

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })

// app.get("/message/:id/:user", (req, res) => {
//   const { id, user } = req.params // id = req.params.id & user = req.params.user

//   res.send(`
//     Id da mensagem é ${id}.
//     Para o usuário ${user}.
//   `)
// })

// app.get("/users", (req, res) => {
//   const { page, limit } = req.query

//   res.send(`Página ${page}. Mostrar ${limit}.`)
// })

//tratando erro com express-async-errors
app.use(( error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

const PORT = process.env.PORT || 3000 //qual porta nossa api vai ficar observando
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) //fique escutando nessa porta, e quando a app iniciar rode a arrow function
