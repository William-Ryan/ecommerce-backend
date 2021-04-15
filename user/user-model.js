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
  return db('user')
}

function findBy(filter) {
  return db('user').where(filter);
}

async function add(user) {
  const [id] = await db('user').insert(user);

  return (user);
}

function findById(id) {
  return db('user')
    .where({ id })
    .first();
}

function update(changes, id){
  return db('user')
      .update(changes)
      .where({ id })
}

function removeAll(){
  return db('user')
      .del()
}

function remove(id){
  return db('user')
      .where({ id })
      .del()
}
