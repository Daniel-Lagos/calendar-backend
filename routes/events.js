const {Router} = require('express');
const {check} = require('express-validator');
const {fieldValidator} = require('../middlewares/field-validator')
const {validateJWT} = require('../middlewares/validate-jwt');
const {isDate} = require('../helpers/isDate');
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');

const router = Router();
//Todas deben estar validadas en el token del JWT

router.use(validateJWT);

//Obtener Eventos
router.get(
    '/',
    getEvents);

//Crear Evento
router.post('/',
    [
        check('title', 'El titulo deve ser obligatorio').not().isEmpty(),
        check('start', 'La fecha inicial es obligatoria').custom(isDate),
        check('end', 'La fecha Final es obligatoria').custom(isDate),
        fieldValidator
    ],
    createEvent);

//Actualizaar Evento
router.put('/:id',
    [
        check('title', 'El titulo deve ser obligatorio').not().isEmpty(),
        check('start', 'La fecha inicial es obligatoria').custom(isDate),
        check('end', 'La fecha Final es obligatoria').custom(isDate),
        fieldValidator
    ],
    updateEvent);

//Borrar Evento
router.delete('/:id', deleteEvent);

module.exports = router;