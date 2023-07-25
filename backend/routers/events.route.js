const Router = require('express');
const controller = require('../controllers/events.controller.js');
const router = new Router();

router.get('/', controller.getEvent);
router.post('/', controller.addEvent);
router.delete('/', controller.deleteEvent);

module.exports = router;