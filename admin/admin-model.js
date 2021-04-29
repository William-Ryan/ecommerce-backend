const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove
}

function findAll(){
  return db('admin')
}

function findBy(filter) {
  return db('admin').where(filter);
}

async function add(user) {
  const [id] = await db('admin').insert(user);

  return (user);
}

function findById(id) {
  return db('admin')
    .where({ id })
    .first();
}

function update(changes, id){
  return db('admin')
      .update(changes)
      .where({ id })
}

function remove(id){
  return db('admin')
      .where({ id })
      .del()
}