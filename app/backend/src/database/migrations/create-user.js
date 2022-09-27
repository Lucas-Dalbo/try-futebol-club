// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       username: Sequelize.STRING,
//       role: Sequelize.STRING,
//       email: Sequelize.STRING,
//       password: Sequelize.STRING
//     });
//   },

//   down: async (queryInterface, _Sequelize) => {
//     await queryInterface.dropTable('Users');
//   }
// };