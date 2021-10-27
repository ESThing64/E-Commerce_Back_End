const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    product_id: {
      type: DataTypes.INTEGER,
      references: 'product', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name

    },
    
    
    tag_id: {
      type: DataTypes.INTEGER,
      references: 'tag', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name

    }
    



    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
