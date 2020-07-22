import jwt from 'jsonwebtoken';

require('dotenv').config();

const CryptoJS = require('crypto-js');

const fs = require('fs').promises;

export default {
  async createUSer(req) {
    try {
      if (!req.name || !req.email || !req.password) return { error: true, message: 'All field are mandatory' };

      const isEmailExist = await this.findUserBy(req, 'email');
      if (isEmailExist[0]) return { error: true, message: 'Email already exist' };

      const token = jwt.sign(req.name, process.env.SECRET);
      req.token = token;

      req.password = this.encryptData(req.password);

      await this.saveDataTo(req, 'users');

      return req;
    } catch (err) {
      return { error: true, message: 'something went wrong', data: err };
    }
  },

  async findUserBy(req, by) {
    const newRes = await fs.readFile((__dirname, './src/assets/img/data/users.json'), 'utf8');
    const json = JSON.parse(newRes);
    const find = json.users.filter((data) => data[by] === req[by].trim());
    return find;
  },

  async saveDataTo(req, by) {
    const newRes = await fs.readFile((__dirname, './src/assets/img/data/users.json'), 'utf8');
    const json = JSON.parse(newRes);
    json[by].push(req);
    const newData = JSON.stringify(json);
    await fs.writeFile((__dirname, './src/assets/img/data/users.json'), newData);
    return req;
  },

  encryptData(req) {
    const enc = CryptoJS.AES.encrypt(req, process.env.SECRET).toString();
    return enc;
  },

  decryptData(req) {
    const dec = CryptoJS.AES.decrypt(req, process.env.SECRET);
    const originalText = dec.toString(CryptoJS.enc.Utf8);
    return originalText;
  },

  async findUser(req) {
    try {
      if (!req.email || !req.password) return { error: true, message: 'All field are mandatory' };

      const findOne = await this.findUserBy(req, 'email');

      if (findOne[0]) {
        const originalText = this.decryptData(findOne[0].password);

        const isCorrectPassword = originalText === req.password.trim();
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

  async findNewsLetter() {
    const newRes = await fs.readFile((__dirname, './src/assets/img/data/users.json'), 'utf8');
    const json = JSON.parse(newRes);
    const findAll = json.newsLetter;
    return findAll;
  },

  async findNewsLetterAll() {
    try {
      const findAll = await this.findNewsLetter();
      return findAll;
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
