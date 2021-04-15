const express = require('express');
const Market = require('./market-model')

const router = express.Router()

router.get('/market', (req, res) => {
    
    Market.findAll()
    .then(market => {
        res.status(200).json(market)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving market columns' })
    })
})

router.get('/market/:id', (req, res) => {
    const id  = req.params.id;

    Market.findById(id)
    .then(market => {
        if(market.id >= 0){
            return res.status(200).json(market)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving market column' })
    })
})

router.post('/market', (req, res) => {
    const data = req.body;

    Market.add(data)
    .then(market => {
        res.status(201).json(market)
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to Create market column'})
    })
})

router.put('/market/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Market.findById(id)
    .then(market => {
        if (market){
            Market.update(changes, id)
            .then(updatedMarket => {
                res.status(200).json(updatedMarket)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified market column'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating market column' })
    })
})

router.delete('/market', (req, res) => {

    Market.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All market columns successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete market columns' })
    })
})

router.delete('/market/:id', (req, res) => {
    const id  = req.params.id;

    Market.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'market column removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified market column' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting market column' })
    })
})

module.exports = router