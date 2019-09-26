const order = require("../models").order;
const user = require("../models").user;
module.exports = {
  // Create One
  async create(req, res) {
    try {
      const { user_id, status, amount, deliver_time } = req.body;
      const new_order = await order.create({
        user_id,
        status,
        amount,
        deliver_time
      });
      return res.status(201).json(new_order);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get all
  async getAll(req, res) {
    try {
      const orders = await order.findAll({
        include: [
          {
            model: user,
            as: "waiterWaitress",
            attributes: {
              exclude: [
                "id",
                "date_of_birth",
                "role_id",
                "email",
                "cellphone",
                "createdAt",
                "updatedAt"
              ]
            }
          }
        ]
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get one
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const current_order = await order.findOne({
        where: { id }
      });
      return res.status(200).json(current_order);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Delete one
  async delete(req, res) {
    try {
      const { id } = req.body;
      const deletedOrder = await order.destroy({
        where: { id }
      });
      const response = deletedOrder
        ? `Order with id ${id} deleted successfully`
        : `No order found that matched provided criteria`;
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Update one
  async update(req, res) {
    try {
      const { id, user_id, status, amount, deliver_time } = req.body;
      const current_order = await order.findOne({
        where: { id }
      });
      const orderUpdated = await order.update(
        {
          user_id:
            current_order.user_id === user_id ? current_order.user_id : user_id,
          status:
            current_order.status === status ? current_order.status : status,
          amount:
            current_order.amount === amount ? current_order.amount : amount,
          deliver_time:
            current_order.deliver_time === deliver_time
              ? current_order.deliver_time
              : deliver_time
        },
        { where: { id } }
      );
      const response = orderUpdated[0]
        ? `Order with id ${id} updated successfully`
        : `No order found that matched provided criteria`;
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
