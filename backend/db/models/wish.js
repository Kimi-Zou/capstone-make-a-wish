'use strict';
// const WishImage = require('./wishimage');

module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define('Wish', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});

  Wish.associate = function (models) {
    Wish.hasMany(models.WishImage, {
      foreignKey: 'wishId',
      onDelete: 'cascade',
      hooks: true
    });
    Wish.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  // --------------  Static Methods (not work for instances) ---------------
  // 1. get public wishes by user id
  Wish.getPublicWishesByUserId = async function (userId, WishImage) {
    return await Wish.findAll({
      where: {
        userId: userId,
        status: 1
      },
      include: WishImage
    });
  };

  // 2. get private wishes by user id
  Wish.getPrivateWishesByUserId = async function (userId, WishImage) {
    return await Wish.findAll({
      where: {
        userId: userId,
        status: 0
      },
      include: WishImage
    });
  };

  // 3. get single wish by wish id
  Wish.getWishById = async function (id, WishImage) {
    return await Wish.findOne({
      where: { id: id },
      include: WishImage
    });
  };

  // 4. create new wish
  Wish.createWish = async function ({ title, description, link, quantity, userId }) {
    const wish = await Wish.create({
      title,
      description,
      link,
      quantity,
      userId
    });
    return await Wish.findByPk(wish.id);
  };

  // 5. delete a wish
  Wish.deleteWish = async function (id) {
    const wish = await Wish.findByPk(id);
    return await wish.destroy();
  };

  // 6. make a wish public
  Wish.makePublic = async function (id) {
    const wish = await Wish.findByPk(id);
    wish.status = 1;
    return await wish.save();
  };

  // 7. make a wish private
  Wish.makePrivate = async function (id) {
    const wish = await Wish.findByPk(id);
    wish.status = 0;
    return await wish.save();
  };

  return Wish;
};
