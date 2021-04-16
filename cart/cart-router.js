const express = require('express');
const Cart = require('./cart-model')

const router = express.Router()

router.get('/cart', (req, res) => {
    
    Cart.findAll()
    .then(cart => {
        res.status(200).json(cart)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cart columns' })
    })
})

router.get('/cart/:id', (req, res) => {
    const id  = req.params.id;

    Cart.findById(id)
    .then(cart => {
        if(cart.id >= 0){
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving cart column' })
    })
})

router.post('/cart', (req, res) => {
    const data = req.body;

    Cart.add(data)
    .then(cart => {
        res.status(201).json(cart)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create cart column'})
    })
})

router.put('/cart/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Cart.findById(id)
    .then(cart => {
        if (cart){
            Cart.update(changes, id)
            .then(updatedCart => {
                res.status(200).json(updatedCart)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified cart column'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating cart column' })
    })
})

router.delete('/cart', (req, res) => {

    Cart.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All cart columns successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete cart columns' })
    })
})

router.delete('/cart/:id', (req, res) => {
    const id  = req.params.id;

    Cart.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'cart column removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified cart column' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting cart column' })
    })
})

module.exports = router