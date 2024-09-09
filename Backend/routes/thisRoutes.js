const express = require('express');
const router = express.Router();
const userModel = require('../models/userModels');

async function isRecordPresent(email) {
    const data = await userModel.findOne({ email });
    return data !== null;
}

router.post('/', async (req, res) => {
    const { name, email, age } = req.body;
    if (await isRecordPresent(email)) {
        return res.status(400).json({message:"Record all ready exist"});
    }
    try {
        const createDoc = new userModel({
            name:name,
            email:email,
            age:age,
        });
        await createDoc.save();
        res.status(200).json({ message: "Record saved" });
        console.log('Record saved successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

router.get('/',async (req, res)=>{
    try {
        const data = await userModel.find({});
        res.status(200).json(data);
        // console.log(data);
    } catch(error) {
        res.status(300).json({error:error.message});
        console.log(error);
    }
})

//get single user

router.get('/:id',async (req, res)=>{
    const {id} = req.params;
    try {
        const singleUser = await userModel.findById({_id:id});
        res.status(200).json(singleUser);
        console.log(singleUser);
    } catch(error) {
        res.status(300).json({error:error.message});
        console.log(error);
    }
})

//delete single user
router.delete('/:id',async (req, res)=>{
    const {id} = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete({_id:id});
        res.status(200).json(deletedUser);
        console.log(deletedUser);
    } catch(error) {
        res.status(300).json({error:error.message});
        console.log(error);
    }
})

//update single user
//put/patch
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            { _id: id },
            {
                name: name,
                email: email,
                age: age,
            },
            { new: true } // Return the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
        console.log(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});


module.exports = router;