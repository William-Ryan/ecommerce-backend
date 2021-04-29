const express = require('express');
const admin = require('./admin-middleware.js')
const Admin = require('./admin-model.js')

const router = express.Router()

router.get('/admin', admin, (req, res) => {

    Admin.findAll()
    .then(admin => {
        res.status(200).json(admin)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving Items' })
    })
})

router.get('/admin/:id', admin, (req, res) => {
    id = req.params.id

    Admin.findById(id)
    .then(user => {
        if(user.id > 0){
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving admin' })
    })
})

router.put('/admin/:id', admin, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Admin.findById(id)
    .then(user => {
        if (user){
            admin.update(changes, id)
            .then(updatedAdmin => {
                res.status(200).json(updatedAdmin)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified user'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating user' })
    })
})

router.delete('/admin/:id', admin, (req, res) => {
    const { id } = req.params;

    Admin.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'admin Removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified user' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting admin' })
    })
})

module.exports = router