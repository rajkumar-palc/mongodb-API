const express = require('express');
const Model = require('../model');

const router = express.Router();

router.post('/ethernet',async (req,res)=>{
    const data = new Model(
        {
        id: req.body.id,
        name : req.body.name,
        usage: req.body.usage
        }
    );

    try{
        const dataToSave = await data.save();
        res.status(201).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
});

router.get('/ethernets', async (req, res) => {
    try {
        const filter = { usage: "no" }; // Define the filter criteria
        const sort_data = { id: 1 };
        const data = await Model.find(filter).sort(sort_data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/ethernet/:id', async (req, res) => {
    try {
        const data = await Model.findOne({ id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/ethernet/:id', async (req, res) => {
    try {
        const updatedData = await Model.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/ethernet/:id', async (req, res) => {
    try {
        const deletedData = await Model.findOneAndDelete({ id: req.params.id });
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(deletedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;