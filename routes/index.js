const express = require('express');
const Model_ether = require('../model_ethernet');
const Model_node = require('../model_node');

const router = express.Router();

//Ethernet Routes
router.get('/ethernets', async (req, res) => {
    try {
        const filter = { usage: "no" }; // Define the filter criteria
        const sort_data = { id: 1 };
        const data = await Model_ether.find(filter).sort(sort_data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/ethernet/:id', async (req, res) => {
    try {
        const data = await Model_ether.findOne({ id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/ethernet',async (req,res)=>{
    const data = new Model_ether(
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

router.put('/ethernet/:id', async (req, res) => {
    try {
        const updatedData = await Model_ether.findOneAndUpdate(
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
        const deletedData = await Model_ether.findOneAndDelete({ id: req.params.id });
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(deletedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Ethernet Routes
router.get('/nodes', async (req, res) => {
    try {
        const data = await Model_ether.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/node/:id', async (req, res) => {
    try {
        const data = await Model_ether.findOne({ id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/node',async (req,res)=>{
    const data = new Model_node(
        {
        id: req.body.id,
        type: req.body.type,
        position: req.body.position,
        sourcePosition: req.body.sourcePosition,
        targetPosition: req.body.targetPosition,
        data: { label: req.body.data.label}
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

module.exports = router;