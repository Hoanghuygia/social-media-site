const User = require('../models/User');

class UserController {
    showAll(req, res) {
        User.find()
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

    addUser(req, res){
        User.create(req.body)
        .then( () =>{
            console.log("user")
            return res.status(200).json({message: "success"})
        })
        .catch((error) =>{
            return res.status(500).json({message: error.message})
        })
    }
}

module.exports = new UserController();