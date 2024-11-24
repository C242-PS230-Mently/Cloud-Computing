import Joi from 'joi';
// Joi for validate user input
export const joiRegister = Joi.object({
    full_name: Joi.string().min(5).required()
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
        'string.pattern.base': 'Nama lengkap harus berupa huruf dan spasi yang valid', 
        'string.empty': 'Nama lengkap wajib diisi',
        'string.min': 'Nama lengkap harus memiliki setidaknya 5 karakter'
    }),
    email: Joi.string().email().required()
    .messages({
        'string.empty': 'Email wajib diisi',
        'string.email': 'Masukkan alamat email yang valid'
    }),
    username: Joi.string().min(6).max(50).required().messages({
        'string.empty': 'Username wajib diisi',
        'string.min': 'Username harus memiliki setidaknya 6 karakter',
        'string.max': 'Username tidak boleh lebih dari 50 karakter'
    }),
    age: Joi.number().integer().required()
    .messages({
        'number.base': 'Umur harus berupa angka yang valid',
        'any.required': 'Umur wajib diisi'
    }),
    gender: Joi.string().valid('Laki Laki', 'Perempuan').required()
    .messages({
        'any.required': 'Jenis kelamin wajib diisi'
    }),
    password: Joi.string().min(8).required()
    .messages({
        'string.empty': 'Kata sandi wajib diisi',
        'string.min': 'Kata sandi harus memiliki setidaknya 8 karakter'
    }),
});

export const joiLogin = Joi.object({
    identifier: Joi.string().required().messages({
        'string.empty': 'Email atau username wajib diisi',
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Kata sandi wajib diisi',
        'string.min': 'Kata sandi harus memiliki setidaknya 8 karakter',
    }),
});

export const editPass = Joi.object({
    password: Joi.string().min(8).required()
    .messages({
        'string.empty': 'Kata sandi wajib diisi',
        'string.min': 'Kata sandi harus memiliki setidaknya 8 karakter'
    }),
});

export const joiEdit = Joi.object({
    full_name: Joi.string().min(5).required()
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
        'string.pattern.base': 'Nama lengkap harus berupa huruf dan spasi yang valid', 
        'string.empty': 'Nama lengkap wajib diisi',
        'string.min': 'Nama lengkap harus memiliki setidaknya 5 karakter'
    }),
    email: Joi.string().email().required()
    .messages({
        'string.empty': 'Email wajib diisi',
        'string.email': 'Masukkan alamat email yang valid'
    }),
    username: Joi.string().min(6).max(50).required().messages({
        'string.empty': 'Username wajib diisi',
        'string.min': 'Username harus memiliki setidaknya 6 karakter',
        'string.max': 'Username tidak boleh lebih dari 50 karakter'
    }),
    age: Joi.number().integer().required()
    .messages({
        'number.base': 'Umur harus berupa angka yang valid',
        'any.required': 'Umur wajib diisi'
    }),
    gender: Joi.string().valid('Laki Laki', 'Perempuan').required()
    .messages({
        'any.required': 'Jenis kelamin wajib diisi'
    }),
});

