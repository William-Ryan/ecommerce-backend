const db = require('../data/dbConfig.js')

module.exports = {
    findAll,
    findById,
    findByUserId,
    add,
    update,
    removeAll,
    removeById
}

function findAll(){
    return db('cart')
}

function findById(id) {
    return db('cart')
        .where({ id })
        .first()
}

function findByUserId(user_id) {
    return db('cart as c')
        .select('c.user_id', 'c.quantity','u.name', 'm.name', 'm.category', 'm.seller')
        .join('user as u', 'c.user_id', "=", "u.id")
        .join('market as m', 'c.market_id', "=", "m.id")
        .where({ user_id })
}

function add(data){
    return db('cart')
        .insert(data)
}

function update(changes, id){
    return db('cart')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('cart')
        .del()
}

function removeById(id){
    return db('cart')
        .where({ id })
        .del()
}