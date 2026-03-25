"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {}

  Game.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          min: 0,
          max: 10,
        },
      },
      isMultiplayer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );

  return Game;
};
