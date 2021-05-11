const express = require('express');
const Image = require('./image-model')
const { cloudinary } = require('../utils/cloudinary.js');

const router = express.Router()

router.use(express.static('public'));
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.get('/image', (req, res) => {
    
    Image.findAll()
    .then(image => {
        res.status(200).json(image)
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving image columns' })
    })
})

router.get('/image/:id', (req, res) => {
    const id  = req.params.item;

    Image.findById(id)
    .then(image => {
        if(image.id >= 0){
            return res.status(200).json(image)
        } else {
            return res.status(404).json({ message: 'Error id invalid' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error Retrieving image column' })
    })
})

router.post('/image', async (req, res) => {
    const market_id = req.body.item;
    
    try {
        const fileStr = req.body.image;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'ecommerce'
        });
        
        const data = {image: uploadResponse.url, item: market_id}

        Image.add(data)
            .then(image => {
                res.status(201).json(image)
            })
            .catch(() => {
                res.status(500).json({ message: 'Failed to Create image column'})
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }

    
})

router.put('/image/:id', (req, res) => {
    const id  = req.params.id;
    const changes = req.body;

    Image.findById(id)
    .then(image => {
        if (image){
            Image.update(changes, id)
            .then(updatedImage => {
                res.status(200).json(updatedImage)
            });
        } else {
            res.status(404).json({ message: 'Could not find specified image column'})
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error updating image column' })
    })
})

router.delete('/image', (req, res) => {

    Image.removeAll()
    .then(() => {
        res.status(200).json({ message: 'All image columns successfully deleted' })
    })
    .catch(() => {
        res.status(500).json({ message: 'Unable to delete image columns' })
    })
})

router.delete('/image/:id', (req, res) => {
    const id  = req.params.id;

    Image.removeById(id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({ message: 'image column removed' })
        } else {
            res.status(404).json({ message: 'Could not find specified image column' })
        }
    })
    .catch(() => {
        res.status(500).json({ message: 'Error deleting image column' })
    })
})

module.exports = router