const db = require("./db");
const Sequelize = require("sequelize");
const queryInterface = db.getQueryInterface();

async function addColumn() {
  console.log('Adding "read" column');
  await queryInterface.addColumn('messages', 'read', {
    type: Sequelize.BOOLEAN,
  });
};


async function migrate() {
  console.log('Perfoming db migration')
  try {
    await addColumn();
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

if (module === require.main) {
  migrate();
};