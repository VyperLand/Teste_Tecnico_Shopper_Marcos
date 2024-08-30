"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, dataTypes) => {
    class Measure extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Measure.init({
        measure_type: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [["WATER", "GAS"]],
                    msg: "Tipo incorreto de leitura"
                },
                notNull: {
                    msg: "Tipo da medição não pode ser nulo"
                }
            }
        },
        measure_datetime: {
            type: dataTypes.DATE,
            allowNull: false
        },
        customer_code: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: dataTypes.STRING,
            allowNull: true
        },
        measure_value: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        measure_confirmed: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: dataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: dataTypes.DATE
        },
        deletedAt: {
            allowNull: true,
            type: dataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Measure',
        tableName: 'tbMeasure',
        paranoid: true
    });
    return Measure;
};
