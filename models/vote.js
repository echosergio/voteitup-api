"use strict";

module.exports = function (sequelize, DataTypes) {
    var Vote = sequelize.define('Vote', {}, {
        classMethods: {
            associate: function (models) {
                Vote.belongsTo(models.User, {});
            }
        }
    });

    return Vote;
};