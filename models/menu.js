let mongoose = require('mongoose')
let Schema = mongoose.Schema


const schema = new Schema({
    name: { type : String, required : true, trim : true },
    price: { type : Number },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'menus'
})

schema.virtual('price_vat').get(function(){
    return (this.price * 1.07)
})

const menu = mongoose.model('Menu', schema)
module.exports = menu;