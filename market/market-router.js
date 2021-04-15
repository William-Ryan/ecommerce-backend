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
    return db('market')
}

function findById(id) {
    return db('market')
        .where({ id })
        .first()
}

function add(data){
    return db('market')
        .insert(data)
}

function update(changes, id){
    return db('market')
        .update(changes)
        .where({ id })
}

function removeAll(){
    return db('market')
        .del()
}

function removeById(id){
    return db('market')
        .where({ id })
        .del()
}