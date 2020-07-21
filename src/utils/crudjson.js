import jwt from 'jsonwebtoken';

const CryptoJS = require('crypto-js');

require('dotenv').config();
const fs = require('fs').promises;

export default {
  async createUSer(req) {
    try {
      const newRes = await fs.readFile((__dirname, './src/assets/img/data/users.json'), 'utf8');
      const json = JSON.parse(newRes);

      const isEmailExist = json.users.filter((data) => data.email === req.email.trim())[0];
      if (isEmailExist) return { error: true, message: 'Email already exist' };

      const token = jwt.sign(req.name, process.env.SECRET);
      req.token = token;

      req.password = CryptoJS.AES.encrypt(req.password, process.env.SECRET).toString();

      json.users.push(req);
      const newData = JSON.stringify(json);
      await fs.writeFile((__dirname, './src/assets/img/data/users.json'), newData);

      return req;
    } catch (err) {
      return { error: true, message: 'something went wrong', data: err };
    }
  },
  async findUser(req) {
    try {
      const newRes = await fs.readFile((__dirname, './src/assets/img/data/users.json'), 'utf8');
      const json = JSON.parse(newRes);
      const findOne = json.users.filter((data) => data.email === req.email);
      if (findOne[0]) {
        const dec = CryptoJS.AES.decrypt(findOne[0].password, process.env.SECRET);
        const isCorrectPassword = dec === req.pasword.trim();
        if (isCorrectPassword) {
          return findOne[0];
        }
        return { error: true, message: 'Password incorrect' };
      }
      return { error: true, message: 'Email invalid' };
    } catch (err) {
      return { error: true, message: 'something went wrong', data: err };
    }
  },
  //   async createNewsLetter() {
  //     try {

  //     } catch (err) {

  //     }
  //   },
  //   async addFavorite() {
  //     try {

  //     } catch (err) {

  //     }
  //   },
  //   async removeFavorite() {
  //     try {

  //     } catch (err) {

//     }
//   },
};
