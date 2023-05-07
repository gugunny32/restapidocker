const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  name: { type : String, required : true, trim : true },
  photo: { type : String, default : "nopic.png" },
  location: {
    lat: Number,
    lgn:Number
  }
},{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'shops'
});

schema.virtual('menus', {
  ref: 'Menu', //ลิงค์ไปที่ Model Menu
  localField: '_id', // _id ฟิลด์โมเดลของไฟล์นี้ (shop)
  foreignField: 'shop'
})

const shop = mongoose.model('Shop', schema)
module.exports = shop