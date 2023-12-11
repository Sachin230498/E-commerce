const mongoose = require("mongoose");

const orderSchema =new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    //required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItems",
    },
  ],
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  paymentDetails: {

    paymentMethod:{
        type:String
    },
    transactionId:{
        type:String
    },
    paymentId:{
        type:String
    },
    paymentStatus:{
        type:String
    }
  },
  totalPrice:{
    type:Number,
    required:true
  },
  totalDiscountPrice:{
    type:Number,
    required:true
  },
  discount:{
    type:Number,
    required:true
  },
  orderStatus:{
    type:String,
    required:true,
    default:"PANDING"
  },
  totalItem:{
    type:Number,
    required:true
  },
  createAt:{
    type:Date,
    default:Date.now()
  }
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
