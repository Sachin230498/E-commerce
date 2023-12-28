const orderService = require("../services/order.Service");

const createOrder = async (req, res) => {
  const user = req.user;
  try {
    let createdOrder = await orderService.createOrder(user, req.body);
    req.status(201).send(createOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const findOrderById = async (req, res) => {
    const user = req.user;
    try {
      let createdOrder = await orderService.findOrderByID(user, req.body);
      req.status(201).send(createOrder);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };