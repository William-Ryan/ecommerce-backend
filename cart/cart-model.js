const db = require('../data/dbConfig.js')

module.exports = {
    findAll,
    findById,
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