const express = require("express")
const router = express.Router()
const User = require("../models/User.js") 

router.post("/create", async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).send(user)
    } catch (error) {
        console.error(error)
        res
            .status(500)
            .send({ message: "There was a problem trying to create a user" })
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error al obtener usuarios" });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        await User.findByIdAndUpdate(id, data)

        res.send({ message: "Usuario actualizado" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Error al actualizar el usuario" })
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id

        await User.findByIdAndDelete(id)

        res.send({ message: "Usuario eliminado" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Error al eliminar el usuario" })
    }
});


module.exports = router