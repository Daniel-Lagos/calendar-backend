//Fernando Recomienda especificar las rutas en el siguiente comentario
/*
    Rutas de Usuarios / Auth
    host + /api/auth
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {fieldValidator} = require('../middlewares/field-validator');
const {createUser, loginUser, renewToken} = require('../controllers/auth');
const {validateJWT} = require('../middlewares/validate-jwt')
const router = Router();
//const router = express.Router


router.post(
    '/new',
    [//middlewares
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El Password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldValidator
    ],
    createUser);


router.post(
    '/',
    [
        check('email', 'El Email debe ser Correcto').isEmail(),
        check('password', 'La Password debe tener minimo 6 caracteres').isLength({min: 6}),
        fieldValidator
    ],
    loginUser);


router.get('/renew', validateJWT, renewToken);


module.exports = router;