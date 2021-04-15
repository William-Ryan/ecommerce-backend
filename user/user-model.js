const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findBy,
  findById,
  add,
  update,
  remove,
  removeAll
}

function findAll(){
  return db('users')
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return (user);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function update(changes, id){
  return db('users')
      .update(changes)
      .where({ id })
}

function removeAll(){
  return db('users')
      .del()
}

function remove(id){
  return db('users')
      .where({ id })
      .del()
}
