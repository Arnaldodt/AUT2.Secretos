const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db_Secreto', {useNewUrlParser: true});
module.exports = mongoose;





