const {Usuario,Secreto,Comentario}  = require("../models/modelo");

const Secretos = {
    TraeSecretos: (req, res) => {    
        if  (req.session.id_usr === '')
        {
            res.redirect("/")
        }

        Secreto.find({id_usu:req.session.id_usr})
        .then(data => {
            console.log(data);
            if (data !== null){
                res.render("secretos",{secretos:'S',mensajes:data})
            } else {
                res.render("secretos",{secretos:'N'})
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });
    },
    CrearSecreto: (req, res) => {   
        if  (req.session.id_usr === '')
        {
            res.redirect("/")
        }
         
        const SEC = new Secreto;
        SEC.secreto = req.body.secreto
        SEC.id_usu = req.session.id_usr
        Secreto.create(SEC)
        .then(data => {
            if (data !== null){
               res.redirect("/Secretos")
            } else {
                res.redirect("/")
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });
    },
    MuestraComentarios: async (req, res) => {    
        await Secreto.findOne({ _id:req.params.id })
        .then(data => {
            if (data !== null){
                req.session.id_sec=data._id;
                req.session.nom_sec=data.secreto;
            } else {
                res.redirect("/Secretos")
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });

        Comentario.find({ id_sec:req.session.id_sec })
        .then(data => {
            console.log(data)
            if (data !== null){
                res.render("comentarios",{comentarios:'S', id_sec: req.session.id_sec, Secreto: req.session.nom_sec, mensajes:data})
            } else {
                res.render("comentarios",{comentarios:'N', id_sec: req.session.id_sec, Secreto: req.session.nom_sec})
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });
    },

    CreaComentarios: (req, res) => {    
        const COM = new Comentario;
        COM.comentario = req.body.comentario
        COM.id_sec = req.params.id

        Comentario.create(COM)
        .then(data => {
            console.log(data)
            if (data !== null){
               res.redirect("/MuestraComentarios/" + req.session.id_sec)
            } else {
                res.redirect("/")
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });
    },


    EliminarSecreto: (req, res) => {    
        Comentario.deleteMany({id_sec:req.params.id})
        .then(data => {
            console.log(data)
            if (data !== null){
                console.log("paso")
            } else {
                res.redirect("/")
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });

        Secreto.deleteOne({_id:req.params.id})
        .then(data => {
            console.log(data)
            if (data !== null){
                res.redirect("/Secretos")
            } else {
                res.redirect("/")
            }
        })
        .catch(err => {
            res.send(err + "<br><a href='/'>Volver!</a>")
        });
    }
}

module.exports = Secretos;