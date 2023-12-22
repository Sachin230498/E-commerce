const cartService = require("../services/cart.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");

async function createOrder(user, shippAdress) {
  let address;

  if (shippAdress._id) {
    let existAddress = await Address.findById(shippAdress._id);
    address = existAddress;
  } else {
    address = new Address(shippAdress);
    address.user = user;
    await address.save();

    user.addresses.push(address);
    await user.save();
  }
  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new orderItems({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    totalItem: cart.totalItem,
    shippAdress: address,
  });

  const saveOrder = await createOrder.save();
  return saveOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderByID(orderId);

  order.orderStatus = "Placed";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmOrder(orderId) {
  const order = await findOrderByID(orderId);

  order.orderStatus = "Confirmed";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderByID(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderByID(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderByID(orderId);

  order.orderStatus = "cANCEL ORDER";

  return await order.save();
}

async function findOrderByID(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
}

async function userOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderByID(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderByID,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
