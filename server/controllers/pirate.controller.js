const Pirate = require('../models/pirate.model');

module.exports.readAll = (req, res) => {
    Pirate.find().sort({ name: 1 }).collation({ locale: "en_US", strength: 1 })
        .then((results) => {
            res.json({ pirates: results })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}

module.exports.read = (req, res) => {
    Pirate.findOne({ _id: req.params.id })
        .then(result => {
            res.json({ pirate: result })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}



module.exports.create = (req, res) => {
    console.log("Req Body ---->", req.body)

    if (req.body.position === "Captain") {
        Pirate.findOne({ position: "Captain" })
        .then(result => {
            console.log("Result Captain ---->", result)
            if (result) {
                res.status(400).json({
                    errors: {
                        duplicateError: {
                            message: `Pirate ${result.name} is already a captain`
                        }
                    }
                })                
            } else {
                Pirate.create(req.body)
                .then(result => {
                    res.json({ pirate: result })
                })
                .catch((err) => {
                    res.status(400).json(err)
                });
            }
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    } else{
        Pirate.create(req.body)
        .then(result => {
            res.json({ pirate: result })
        })
        .catch((err) => {
            res.status(400).json(err)
        });        
    }
}


module.exports.update = (req, res) => {

    console.log("Req Body ---->", req.body)

    if (req.body.position === "Captain") {
        Pirate.findOne({ position: "Captain" })
        .then(result => {
            console.log("Result Captain ---->", result)
            if (result) {
                res.status(400).json({
                    errors: {
                        duplicateError: {
                            message: `Pirate ${result.name} is already a captain`
                        }
                    }
                })                
            } else {
                Pirate.findOneAndUpdate(
                    { _id: req.params.id },
                    req.body,
                    { new: true, runValidators: true }
                )
                    .then(result => {
                        res.json({ pirate: result })
                    })
                    .catch((err) => {
                        res.status(400).json(err)
                    });
            }
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    } else{
        Pirate.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(result => {
                res.json({ pirate: result })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }    


}

module.exports.delete = (req, res) => {
    Pirate.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}
