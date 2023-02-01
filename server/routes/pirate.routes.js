const PirateController = require('../controllers/pirate.controller');
 
module.exports = app => {
    app.get('/api/pirates', PirateController.readAll);
    app.get('/api/pirates/:id', PirateController.read);
    app.put('/api/pirates/:id', PirateController.update);
    app.post('/api/pirates', PirateController.create);
    app.delete('/api/pirates/:id', PirateController.delete);
}
