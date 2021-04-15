const express = require('express');
const restricted = require('./restricted-middleware.js')
const User = require('./user-model.js')

const router = express.Router()

router.get('/user', (req, res) => {

    User.findAll()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving User' })
    })
})

router.get('/user/:id', (req, res) => {
    const id  = req.params.id

    User.findById(id)
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

router.patch('/user/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    User.findById(id)
    .then(user => {
        if (user){
            User.update(changes, id)
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

router.delete('/user', (req, res) => {

    User.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All user successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete user' })
    })
})

router.delete('/user/:id', (req, res) => {
    const id  = req.params.id;

    User.remove(id)
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