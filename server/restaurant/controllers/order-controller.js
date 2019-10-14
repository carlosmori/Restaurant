const order = require("../models").order;
const user = require("../models").user;
const table = require("../models").table;
const product = require("../models").product;
const orderProduct = require("../models").order_product;
const moment = require("moment");
const Op = require("Sequelize").Op;

module.exports = {
  // Create One
  async create(req, res) {
    try {
      const { amount, cook_time, table_id, products } = req.body;
      //@todo fix hardcoded userId with user id from localstorage
      const user_id = 1;
      //Crear Orden y con el id, actualizar la mesa
      const deliver_time = moment()
        .add(cook_time, "minutes")
        .format("YYYY-MM-DD HH:mm:ss");
      let new_order = await order.create({
        user_id,
        status: 1,
        amount,
        deliver_time
      });
      //@todo refactor hardcoded status for a proper enum
      const tableUpdated = await table.update(
        {
          status: 2,
          order_id: new_order.id
        },
        { where: { id: table_id } }
      );
      for (const id of products) {
        await orderProduct.create({
          order_id: new_order.id,
          product_id: id,
          dispatched: 0
        });
      }
      new_order = await order.findOne({
        where: { id: new_order.id },
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
      new_order = new_order.toJSON();
      new_order = { ...new_order, tableId: table_id, tableStatus: 2 };
      return res.status(201).send(new_order);
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
  //Get Pending Dishes
  async getPendingDishes(req, res) {
    try {
      //@todo refactor order status enum
      const pending_orders = await order.findAll({
        where: {
          status: 1
        },
        include: [
          {
            model: product,
            through: {
              where: {
                dispatched: 0
              },
              attributes: []
            }
          }
        ]
      });
      return res.status(200).json(pending_orders);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get Pending Orders
  async getPendingOrders(req, res) {
    try {
      //@todo refactor order status enum
      const pending_orders = await order.findAll({
        where: {
          status: { [Op.or]: [1, 2, 3] }
        },
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
          },
          { model: table }
        ]
      });
      return res.status(200).json(pending_orders);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Dispatch Product
  async dispatchProduct(req, res) {
    try {
      const { orderId, productId } = req.body;
      const orderProductIndex = await orderProduct.update(
        {
          dispatched: 1
        },
        {
          where: { order_id: orderId, product_id: productId }
        }
      );
      await order.update(
        {
          status: 2
        },
        { where: { id: orderId } }
      );
      const current_order = await order.findOne({
        where: { id: orderId },
        include: [
          {
            model: product,
            where: {
              id: productId
            },
            through: { attributes: [] }
          }
        ]
      });

      const response = current_order;
      return res.status(201).json(response);
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
      const updated_order = await order.findOne({
        where: { id }
      });
      const response = updated_order;
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
