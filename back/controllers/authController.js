const User = require('../models/auth');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Registrar un nuevo ususuario /api/usuario/registro

exports.registroUsuario = catchAsyncErrors(async (req, res, next) => {
    const { nombre, email, password } = req.body;
    const user = await User.create({
        nombre,
        email,
        password,
        avatar: {
            public_id: 'iojaisjdiahfioasiodasidhaisd129082190734n1nkj1b239',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaFCUrOw9meo5s6wpulFh9upMGorhmP4t7XA&usqp=CAU'
        }
    })

    res.status(200).json({
        success: true,
        user
    })

})