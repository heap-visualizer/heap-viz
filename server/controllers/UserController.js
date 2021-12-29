//const User = require('./StudentModel');
import User from '../models/user.ts';

const UserController = {
  //creates user.. probably not necessary
  async createUser(req, res) {
    const { username, password } = req.body;
    await User.create({ username, password })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(400).send('unable to save to database');
      });
  },
  //gets all arrays saved by a specific user
  async getArrays(req, res) {
    const { name } = req.params;
    console.log(name);
    await User.findOne({ username: name })
      .then((user) => {
        if (user === null)
          return res.status(404).send(`${name} is not in the database`);
        return res.status(200).json(user.storedArrays);
      })
      .catch((err) => {
        return res.status(400).send('could not find the user');
      });
  },
  //saves users stored arrays
  async saveArrays(req, res) {
    const { name } = req.params;
    const { arrays } = req.body;
    await User.findOneAndUpdate(
      { username: name },
      { storedArrays: arrays },
      { new: true }
    )
      .then((user) => {
        if (user === null)
          return res.status(404).send(`${name} is not in the database`);

        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(400).send('could not find the student');
      });
  },

  async deleteArray(req, res) {
    const { name } = req.params;
    const { array } = req.body;
    await User.findOneAndDelete({ username: name }, { storedArrays: array })
      .then((user) => {
        if (user === null)
          return res.status(404).send(`${name} is not in the database`);
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(400).send('could not find the user');
      });
  },
};

export default UserController;
