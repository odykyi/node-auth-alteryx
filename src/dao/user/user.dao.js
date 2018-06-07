const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const util = require('util');
fs.readFile = util.promisify(fs.readFile);
fs.writeFile = util.promisify(fs.writeFile);

const usersData = require('../../../data/users.json');
const userDataRelativePath = './data/users.json';
const writeUserData = Symbol();

class UserDAO {
  async get(id) {
    return usersData.find((user) => Number(user.id) === Number(id));
  }

  async getAll() {
    return usersData;
  }

  async remove(id) {
    const updatedUsersData = usersData
      .filter((user) => Number(user.id) !== Number(id));

    try {
      await this[writeUserData](updatedUsersData);
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }

  async update(id, data) {
    const index = usersData.findIndex((user) => Number(user.id) === Number(id));
    const updatedUsersData = usersData;
    updatedUsersData[index] = Object.assign({}, updatedUsersData[index], data);

    try {
      await this[writeUserData](updatedUsersData);
    } catch (err) {
      console.error(err);
      return false;
    }

    return updatedUsersData;
  }

  async [writeUserData](updatedUsersData) {
    await fs
      .writeFile(userDataRelativePath, JSON.stringify(updatedUsersData));
  }
}

module.exports = UserDAO;
