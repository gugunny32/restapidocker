const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  namee: String,
  address: {
    province : String
  },
},{ collection : 'companys'
});

const company = mongoose.model('companys', schema);

module.exports = company;