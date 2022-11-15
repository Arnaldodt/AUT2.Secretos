const {Usuario} = require("../models/modelo");
const encrypt  = require("../config/encriptacion");

module.exports = (req, res) => {    
    
        Usuario.findOne({correo:req.body.correo})
        .then(async data => {
            if (data !== null){
                const validPassword = await encrypt.validar(req.body.pwd, data.pwd)
                if (validPassword){
                    req.session.id_usr=data._id;
                    res.redirect("/Secretos")
                }else{
                    res.send("PASSWORD INCORRECTA<br><a href='/'>Volver!</a>");
                }
            } else {
                res.send("USUARIO NO ENCONTRADO<br><a href='/'>Volver!</a>");
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });
}