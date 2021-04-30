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
    return db('itemImage')
}

function findById(id) {
    return db('itemImage')
        .where({ id })
        .first()
}

function add(data){
    return db('itemImage')
        .insert(data)
}

function update(changes, id){
    return db('itemImage')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('itemImage')
        .del()
}

function removeById(id){
    return db('itemImage')
        .where({ id })
        .del()
}