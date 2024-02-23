const VoucherModel = require('../models/VoucherModel'); // Replace with the actual path to your Voucher model
const UserModel = require('../models/UserModel'); // Replace with the actual path to your User model
const createVoucher = async (req, res) => {
    const { code, discount, expiryDate, restaurant_id, users } = req.body;
    
    try {
        const voucher = new VoucherModel({
            code,
            discount,
            expiryDate,
            restaurant_id,
            users
        });

        await voucher.save();

        res.status(201).json(voucher);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find({});
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

module.exports = {
    createVoucher,
    getAllUsers
};