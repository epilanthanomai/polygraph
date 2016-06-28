'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'People',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        display: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }).then(() => {
        return queryInterface.createTable(
          'Links',
          {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            createdAt: {
              type: Sequelize.DATE
            },
            updatedAt: {
              type: Sequelize.DATE
            },
            personAId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: 'People',
                key: 'id'
              },
              onDelete: 'cascade',
              onUpdate: 'cascade'
            },
            personBId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: 'People',
                key: 'id'
              },
              onDelete: 'cascade',
              onUpdate: 'cascade'
            }
          });
      }).then(() => {
        return queryInterface.addIndex('Links', ['personAId', 'personBId'], {
          name: 'Links_PersonAtoB',
          indicesType: 'UNIQUE'
        });
      }).then(() => {
        return queryInterface.addIndex('Links', ['personBId', 'personAId'], {
          name: 'Links_PersonBtoA',
          indicesType: 'UNIQUE'
        });
      });;
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Links').then(() => {
      queryInterface.dropTable('People');
    });
  }
};
