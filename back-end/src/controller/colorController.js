const colorModel = require("../modal/color")

module.exports.createColor = async (req, res) => {
    try {
        const { title, colorName } = req.body;
        let userData = await colorModel.create({
            title: title,
            colorName: colorName
        })
        res.send({ userData: userData, message: "added successfully" })
    } catch (error) {
        console.log(error)
    }
}

module.exports.listColor = async (req, res) => {
    try {
        const data = await colorModel.find()
        res.json({ data: data, message: "getted color" })

    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteColor = async (req, res) => {
    try {
        const data = await colorModel.findByIdAndRemove(req.params.id)
        res.send({ data, message: "delete notes" })

    } catch (error) {
        console.log(error)
    }
}
module.exports.editColor = async (req, res) => {
    try {
        const data = await colorModel.findByIdAndUpdate(req.params.id, req.body)
        res.send({ data, message: "edit successfully" })
    } catch (error) {
        console.log(error)
    }
}