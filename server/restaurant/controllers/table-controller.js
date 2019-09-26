const table = require("../models").table;
const order = require("../models").order;
module.exports = {
  // Create One
  async create(req, res) {
    try {
      const { status, order_id } = req.body;
      const new_table = await table.create({
        status,
        order_id
      });
      return res.status(201).json(new_table);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get all
  async getAll(req, res) {
    try {
      const tables = await table.findAll({
        include: [
          {
            model: order,
            as: "currentOrder"
            // attributes: {
            //   exclude: ["id", "createdAt", "updatedAt"]
            // }
          }
        ]
      });
      return res.status(200).json(tables);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get one
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const current_table = await table.findOne({
        where: { id }
      });
      return res.status(200).json(current_table);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Delete one
  async delete(req, res) {
    try {
      const { id } = req.body;
      const deletedTable = await table.destroy({
        where: { id }
      });
      const response = deletedTable
        ? `Table with id ${id} deleted successfully`
        : `No table found that matched provided criteria`;
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Update one
  async update(req, res) {
    try {
      const { id, status, order_id } = req.body;
      const currentTable = await table.findOne({
        where: { id }
      });
      const tableUpdated = await table.update(
        {
          id,
          status: currentTable.status === status ? currentTable.status : status,
          order_id:
            currentTable.order_id == order_id ? currentTable.order_id : order_id
        },
        { where: { id } }
      );
      const response = tableUpdated[0]
        ? `Table with id ${id} updated successfully`
        : `No Table found that matched provided criteria`;
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
