const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');


    res.json({
        ok: true,
        events
    });

}
const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de Editar Este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    res.json({
        ok: true,
        eventoId
    });
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de Eliminar Este evento'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}