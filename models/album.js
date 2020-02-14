'use strict';
module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('album', {
    name: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    length: DataTypes.STRING,
    label: DataTypes.STRING
  }, {});
  album.associate = function(models) {
    // associations can be defined here
  };
  return album;
};