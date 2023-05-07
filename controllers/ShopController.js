const Shop = require('../models/shop');
const Menu = require('../models/menu');
const config = require('../config/index')

exports.index = async (req, res, next) => {
    const shop = await Shop.find().select('name photo location')
    const shopwithdomain = await shop.map(shop => {
        return {
            id: shop._id,
            name: shop.name,
            photo: config.DOMAIN + 'images/' + shop.photo,
            location: shop.location
        }
    })
    res.status(200).json({ 
        data : shopwithdomain
    });
}

exports.menu = async (req, res, next) => {
    const menu = await Menu.find().populate('shop', 'name location')
    res.status(200).json({ 
        data : menu
    });
}

exports.getShopWithMenu = async (req, res ,next) => {
    const { id } = req.params
    const shop = await Shop.findById(id).populate('menus')
    res.status(200).json({
        data : shop
    })
};

exports.insert = async (req, res, next) => {
    
    const { name , location } = req.body;
    let shop = new Shop({
        name: name,
        location: location
    });
    await shop.save()

    res.status(200).json({
        message : 'เพิ่มข้อมูลเรียบร้อย'
    })
}
