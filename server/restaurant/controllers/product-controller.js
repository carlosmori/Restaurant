const product = require("../models").product;
const orderProduct = require("../models").order_product;
module.exports = {
  // Create One
  async create(req, res) {
    try {
      const { description, price, cook_time_minutes } = req.body;
      const new_order = await product.create({
        description,
        price,
        cook_time_minutes
      });
      return res.status(201).json(new_order);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get all
  async getAll(req, res) {
    try {
      const products = await product.findAll({});
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get one
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const current_product = await product.findOne({
        where: { id }
      });
      return res.status(200).json(current_product);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Delete one
  async delete(req, res) {
    try {
      const { orderId, productId } = req.body;
      const deletedProduct = await orderProduct.destroy({
        where: { order_id: orderId, product_id: productId, dispatched: 0 }
      });
      const response = deletedProduct
        ? `Product with id deleted successfully`
        : `No Product found that matched provided criteria`;
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Update one
  async update(req, res) {
    try {
      const { id, description, price, cook_time_minutes } = req.body;
      const productUpdated = await product.update(
        {
          description,
          price,
          cook_time_minutes
        },
        { where: { id } }
      );
      const response = productUpdated[0]
        ? `Product with id ${id} updated successfully`
        : `No Product found that matched provided criteria`;
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
