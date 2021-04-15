const express = require('express');
const restricted = require('./restricted-middleware.js')
const Users = require('./users-model.js')

const router = express.Router()

router.get('/users', (req, res) => {

    Users.findAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving Users' })
    })
})

router.get('/users/:id', (req, res) => {
    const id  = req.params.id

    Users.findById(id)
    .then(user => {
        if(user.id > 0){
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving user' })
    })
})

router.patch('/users/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Users.findById(id)
    .then(user => {
        if (user){
            Users.update(changes, id)
            .then(updatedUser => {
                res.status(200).json(updatedUser)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified user'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating user' })
    })
})

router.delete('/users', (req, res) => {

    Users.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All users successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete users' })
    })
})

router.delete('/users/:id', (req, res) => {
    const id  = req.params.id;

    Users.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'user Removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified user' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting user' })
    })
})

module.exports = router