const {Router} = require('express'),
    router = Router(),
    { login,register } = require('./../controllers/auth'),
    { validationHandler } = require('./../middlewares/validationHandler'),
    { CreateUserSchema }  =require('./../utils/schemas/User.schema')

router.post('/register',[validationHandler(CreateUserSchema)],register)
router.post('/login',login)

module.exports = router
