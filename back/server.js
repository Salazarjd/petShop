const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

//Setear el archivo de configuración
const dotenv = require('dotenv');
dotenv.config({ path: 'back/config/config.env' });

//Configurar base de datos
connectDatabase();

//Configurar cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//llamando al servidor
const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciando en el puerto: ${process.env.PORT}, en modo: ${process.env.NODE_ENV}`);
});