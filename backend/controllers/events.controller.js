const { Event } = require('../models');

const heroController = {
  async getEvent(req, res) {
    try {
      const events = await Event.findAll();
  
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Error fetching events' });
    }  
  },
  async addEvent(req, res) {
    try {
      const { name, startedAt, finishedAt } = req.body;
  
      const event = await Event.create({
        name,
        startedAt,
        finishedAt,
      });
  
      return res.status(201).json(event);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Event creation failed' });
    }
  },
  async deleteEvent(req, res) {
    try {
      const { id } = req.body;
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      await event.destroy();

      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Event delete failed' });
    }
  }
}

module.exports = heroController;