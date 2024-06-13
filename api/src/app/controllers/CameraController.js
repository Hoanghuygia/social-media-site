const { exec } = require('child_process');

async function openCamera(req, res){
    exec('start microsoft.windows.camera:', (err) => {
        if (err) {
            res.status(500).json({message: 'Fail to load camera'});
        } else {
            res.status(200).json({message: 'Open camera success'});
        }
    });
}

module.exports = { openCamera };