const express = require('express')
const router = express.Router();
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')

const User = require('../model/user')
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        //create instance of user
        let user = new User({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        })//save user
        user.save()
        res.json(user)
    } catch (err) {
        console.log(err)

    }
});
router.get('/find', (req, res) => {
    User.find(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.delete("/remove", async (req, res) => {
    try {
        let user = await User.findById(req.body._id)
        await cloudinary.uploader.destroy(user.cloudinary_id)//delete cloude_id
        await user.remove()//remove database
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})
// router.put('/:id', async (req, res) => {
//     try {
//         let user = await User.findById(req.params.id)
//         await cloudinary.uploader.destroy(user.cloudinary_id)
//         const result = await cloudinary.uploader.upload(req.file.path)
//         const data = {
//             name: req.body.name || user.name,
//             avatar: result.secure_url || user.avatar,
//             cloudinary_id: result.public_id || user.cloudinary_id
//         }
//         user = await User.findByIdAndUpdate(req.params.id, data, { new: true })
//         res.json(user)
//     } catch (error) {
//         console.log(error)
//     }
// })
module.exports = router
