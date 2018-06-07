const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const config = require('../../auth/config');
const {UserDAO} = require('../../dao');

class UserController {
  constructor() {
    this.userDAO = new UserDAO();
  }

  // async login(req, res) {
  //   const {
  //     userName,
  //     password,
  //   } = req.body;
  //
  //   if (!userName || !password) {
  //     res
  //       .status(400)
  //       .send('Fields [userName, password] are required');
  //   }
  //
  //   const user = await User
  //     .findOne({
  //       where: {
  //         userName,
  //       },
  //     });
  //
  //   if (!user) {
  //     return res
  //       .status(404)
  //       .send({
  //         message: 'user Not Found',
  //       });
  //   }
  //
  //   const passwordIsValid = bcrypt.compareSync(password, user.password);
  //
  //   if (!passwordIsValid) {
  //     return res
  //       .status(401)
  //       .send({
  //         auth: false,
  //         token: null,
  //       });
  //   }
  //
  //   const token = jwt.sign(
  //     {
  //       userId: user.id,
  //     },
  //     config.secret,
  //     {
  //       expiresIn: config.expireTime,
  //     }
  //   );
  //
  //   return res
  //     .status(200)
  //     .send({
  //       auth: true,
  //       token,
  //     });
  // }
  //
  // async register(req, res) {
  //   const {
  //     userName,
  //     phoneNumber,
  //     password,
  //   } = req.body;
  //
  //   if (!userName || !phoneNumber || !password) {
  //     return res
  //       .status(400)
  //       .send('Fields [userName, phoneNumber, password] are required');
  //   }
  //   const hashedPassword = bcrypt.hashSync(password, 8);
  //
  //   let user;
  //   try {
  //     user = await User.findOne({
  //       where: {
  //         userName,
  //       },
  //     });
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error);
  //     return res
  //       .status(400)
  //       .send(error);
  //   }
  //
  //   if (!user) {
  //     try {
  //       const createdUser = await User
  //         .create({
  //           userName,
  //           phoneNumber: phoneNumber,
  //           password: hashedPassword,
  //         });
  //
  //       const token = jwt.sign(
  //         {
  //           userId: createdUser.id,
  //         },
  //         config.secret,
  //         {
  //           expiresIn: config.expireTime,
  //         }
  //       );
  //
  //       return res
  //         .status(200)
  //         .json({
  //           auth: true,
  //           token,
  //           id: createdUser.id,
  //           userName: createdUser.userName,
  //         });
  //     } catch (error) {
  //       console.error(error);
  //       return res
  //         .status(400)
  //         .send(error);
  //     }
  //   } else {
  //     return res.
  //       status(400)
  //       .send('Username already exist!');
  //   }
  // }

  async get(req, res) {
    const {id} = req.params;

    return res.
      status(200)
      .json(await this.userDAO.get(id));
  }

  async getAll(req, res) {
    return res.
      status(200)
      .json(await this.userDAO.getAll());
  }

  async remove(req, res) {
    const {
      id,
    } = req.params;

    const result = await this.userDAO.remove(id);
    return res.
      status(204)
      .json(result);
  }

  async update(req, res) {
    const {
      id,
    } = req.params;

    const result = await this.userDAO.update(id, req.body);
    return res.
      status(200)
      .json(result);
  }
}

module.exports = UserController;
