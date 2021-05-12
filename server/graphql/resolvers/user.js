const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const models = require("../../database/models");
const saltRounds = 10;

module.exports = {
  Query: {
    async me(_, args, { user }) {
      if (!user) throw new Error("Usuario sin autenticar");
      return await models.user.findByPk(user.id_user);
    },
    async getSingleUser(root, { id_user }, { user }) {
      try {
        if (!user) throw new Error("Usuario sin autenticar!");
        return models.user.findByPk(id_user);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getAllUsers(root, args, { user }) {
      try {
         if (!user) throw new Error("Usuario sin autenticar!");
        return models.user.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    async registerUser(
      root,
      { document, name, email, username, password, status }
    ) {
      try {
        const user = await models.user.create({
          document,
          name,
          email,
          username,
          password: await bcrypt.hash(password, saltRounds),
          status,
        });
        const token = jsonwebtoken.sign(
          { id_user: user.id_user, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        return {
          token,
          id_user: user.id_user,
          email: user.email,
          status: true,
          message: "Autenticacion exitosa",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateUser(_, { id_user, document, name, email, password, status}) {
      const userExist = await models.User.findOne({ where: { id_user } });
      if (!userExist) {
        throw new Error("no existe usuario con ese email:" + id_user)
      }
      try {
        await models.User.update({
          document: document,
          name: name,
          email: email,
          password: password,
          status: status,
        },
          { where: { id_user: id_user } }
        );
      } catch (error) {
        throw new Error("Revisar datos e intentar de nuevo");
      }
      return userExist;
    },
    async login(_, { email, password }) {
      const user = await models.user.findOne({ where: { email } });
      var error = null;
      var isValid = false;
      let token;
      if (!user) {
        return { status: false, token: "email", message: error }
      } else {
        isValid = await bcrypt.compare(password, user.password);
      }
      if (!isValid) {
        return { status: false, token: "password", message: error }
      } else {
        token = jsonwebtoken.sign(
          { id_user: user.id_user, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return {
          status: true,
          token,
          user,
        };
      }
    },
  },

};
