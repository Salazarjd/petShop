const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//Registrar un nuevo usuario /api/usuario/registro
exports.registroUsuario = catchAsyncErrors(async (req, res, next) => {
    const { nombre, email, password } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 240,
        crop: 'scale'
    })

    const user = await User.create({
        nombre,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
    tokenEnviado(user, 201, res)
})


//Iniciar Sesion - Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //revisar si los campos estan completos
    if (!email || !password) {
        return next(new ErrorHandler("Por favor ingrese email & Contraseña", 400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Email o contraseña invalidos", 401))
    }

    //Comparar contraseñas, verificar si está bien
    const contrasenaOK = await user.compararPass(password);

    if (!contrasenaOK) {
        return next(new ErrorHandler("Contraseña invalida", 401))
    }

    tokenEnviado(user, 200, res)

})

//cerrar sesion (logout)
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Cerró sesión'
    })
})

// olvidó contraseña, recuperar
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('Usuario no se encuentra registrado', 400))
    }

    const resetToken = user.genResetPasswordToken();

    await user.save({ validationBeforeSave: false });

    //Crear un url para hacer el reset de la contraseña
    const resetUrl = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`

    const mensaje = `Tu link para ajustar una nueva contraseña es el 
        siguiente: \n\n${resetUrl}\n\n
        si no solicitaste este link, por favor comunicate con soporte./n/n Att:/nPet Shop Store`

    try {
        await sendEmail({
            email: user.email,
            subject: "VetyShop Recuperación de la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message: `Correo enviado a: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})

//resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash el token al que le vamos a resetear la contraseña
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    //Buscamos al usuario al que le vamos a resetear la contraseña
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    //verificar existencia de usuario
    if (!user) {
        return next(new ErrorHandler('El token es invalido o ya expiró', 400))
    }

    //confirmar coincidencia de password
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Contraseñas no coinciden', 400))
    }

    //Setear la nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenEnviado(user, 200, res);
})

//Ver perfil de usuario (usuario logueado)
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//Update contraseña (usuario logueado)
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Revisamos si la contraseña vieja es igual
    const sonIguales = await user.compararPass(req.body.oldPassword);

    if (!sonIguales) {
        return next(new ErrorHandler('La contraseña actual no es corecta', 401))
    }

    user.password = req.body.newPassword;
    await user.save();

    tokenEnviado(user, 200, res);
})

//update perfil del usuario(logueado)
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const nuevaData = {
        nombre: req.body.nombre,
        email: req.body.email
    }

    //Update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id);
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 240,
            crop: 'scale'
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })

})

//Servicios controladores sobre usuarios por parte de los admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//Ver el detalle de 1 usuario
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next( new ErrorHandler(`No se ha encontrado el usuario con id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Actualizar perfil de usuario (desde administrador)
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    
    const nuevaData = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }

    const user = await User.findByIdAndUpdate(req.params.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        success: true,
        user
    })
})

//eliminar usuario
exports.deleteUser = catchAsyncErrors(async (req, res, net) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en la base de datos`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'Usuario eliminado correctamente'
    })
})