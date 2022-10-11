const mongoose = require('mongoose');

const productosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
        trim: true,
        maxLength: [120, "El nombre del producto no puede superar los 120 caracteres"]
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'],
        maxLength: [8, "El precio del producto debe ser inferior a 99'999.999"],
        default: 0.0
    },
    descripcion: {
        type: String,
        required: [true, "La descripción del producto es obligatoria"]
    },
    calificacion: {
        type: Number,
        default: 0
    },
    imagen: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    categoria: {
        type: String,
        required: [true, 'La categría del producto es obligatoria'],
        enum: {
            values: [
                'Alimento seco',
                'Alimento humedo',
                'Accesorios',
                'Cuidado e Higiene',
                'Medicamentos',
                'Snacks',
                'Juguetes'
            ]
        }
    },
    vendedor: {
        type: String,
        required: [true, 'El vendedor es obligatorio']
    },
    inventario: {
        type: Number,
        required: [true, 'Por favor registre el stock del producto'],
        maxLength: [5, 'Cantidad máxima del producto no debe sobrepasar 99999'],
        default: 0
    },
    numCalificaciones: {
        type: Number,
        default: 0
    },
    opiniones: [
        {
            nombreCliente: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comentario: {
                type: String
            }
        }
    ],
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('productos', productosSchema);