const Friend = require('../models/Friend');

class FriendController {
    showAll(req, res) {
        Friend.find()
            .then((data) => {
                return res.status(200).json({
                    msg: 'success',
                    data,
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    msg: error.message,
                });
            });
    }

    addFriend(req, res){
        Friend.create(req.body)
        .then( () =>{
            console.log("friend")
            return res.status(200).json({message: "success"})
        })
        .catch((error) =>{
            return res.status(500).json({message: error.message})
        })
    }
    
    getByID(req, res){
        const {id} = req.params;
        Friend.findById(id)
        .then((friend) =>{
            return res.status(200).json(friend)
        })
        .catch((error) =>{
            return res.status(500).json({message: error.message})
        })
    }

    deleteByID(req, res){
        const {id} = req.params;
        Friend.findByIdAndDelete(id)
        .then((friend) =>{
            if(!friend){
                return res.status(404).json({message: "Friend not found"})
            }
            return res.status(200).json({message: "Delete success"})
        })
        .catch((error) =>{
            return res.status(500).json({message: error.message})
        })
    }

    getByUsername(req, res) {
        const { username } = req.params;
        Friend.findOne({ username: username })
            .then((friend) => {
                if (!friend) {
                    return res.status(404).json({ message: 'Friend not found' });
                }
                return res.status(200).json(friend);
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
    }

    getByField(req, res) {
        const { field, value } = req.query;
        const query = {};
        query[field] = value;
    
        Friend.findOne(query)
            .then((friend) => {
                if (!friend) {
                    return res.status(404).json({ message: 'Friend not found' });
                }
                return res.status(200).json(friend);
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message });
            });
    }

    updateFriend(req, res){
        const {id} = req.params;
        Friend.findByIdAndUpdate(id, req.body)
            .then((friend) =>{
                if(!friend){
                    return res.status(404).json({message: "Friend not found"})
                }
                res.json({message: "update success"})
            })
            .catch((error) =>{
                res.status(500).json({message: error.message})
            })
    }
    

}

module.exports = new FriendController();
