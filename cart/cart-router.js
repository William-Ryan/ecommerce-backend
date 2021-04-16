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

router.get('/cart/:user_id', (req, res) => {
    const user_id  = req.params.user_id;
    console.log(req.params.user_id)
    try{
        Cart.findByUserId(user_id)
        .then(cart => {
            {
                return res.status(200).json(cart)
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Error Retrieving cart column' })
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.post('/cart', (req, res) => {
    const data = req.body;
    try{
        Cart.add(data)
        .then(cart => {
            res.status(201).json(cart)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to Create cart column', error: err.message})
        })
    } catch (err){
        res.status(500).json({ message: err.message})
    }
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