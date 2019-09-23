const user = require("../models").user;
module.exports = {
  // Create One
  async create(req, res) {
    try {
      const {
        name,
        last_name,
        date_of_birth,
        role,
        email,
        cellphone
      } = req.body;
      const new_user = await user.create({
        name,
        last_name,
        date_of_birth,
        role,
        email,
        cellphone
      });
      return res.status(201).json(new_user);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get all
  async getAll(req, res) {
    try {
      const users = await user.findAll({});
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  //Get one
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const current_user = await user.findOne({
        where: { id }
      });
      return res.status(200).json(current_user);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Delete one
  async delete(req, res) {
    try {
      const { id } = req.body;
      const deletedUser = await user.destroy({
        where: { id }
      });
      const response = deletedUser
        ? `User with id ${id} deleted successfully`
        : `No user found that matched provided criteria`;
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  },
  // Update one
  async update(req, res) {
    try {
      const {
        id,
        name,
        last_name,
        date_of_birth,
        role,
        email,
        cellphone
      } = req.body;
      const userUpdated = await user.update(
        {
          name,
          last_name,
          date_of_birth,
          role,
          email,
          cellphone
        },
        { where: { id } }
      );
      const response = userUpdated[0]
        ? `User with id ${id} updated successfully`
        : `No user found that matched provided criteria`;
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
