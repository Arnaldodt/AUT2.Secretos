const bcrypt = require('bcryptjs');

module.exports = {
    encriptar: async (info) => {
    return  await bcrypt.hash(info, 10)
},

validar : async (info, claveEncrip) => {
    return await bcrypt.compare(info, claveEncrip)
}}