const axios = require('axios');

function generateRUT() {
    const body = generateRUTBody();
    const verif = generateVerifDigit(body);
    return `${body}-${verif}`;
}

function generateRUTBody() {
    // Generar un número entre 1,000,000 y 20,000,000
    const min = 1000000;
    const max = 20000000;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString();
}

function generateVerifDigit(rut) {
    let suma = 0;
    let multiplo = 2;

    for (let i = rut.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(rut[i], 10);
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = suma % 11;
    const verif = 11 - resto;

    if (verif === 11) return '0';
    if (verif === 10) return 'K';
    return verif.toString();
}

async function generateNombreChileno() {
    try {
        const response = await axios.get('https://nombreyrut.com/api/generarNombreChileno');
        return response.data.nombre;
    } catch (error) {
        console.error('Error fetching nombre chileno:', error.message);
        throw new Error('Failed to fetch nombre chileno');
    }
}

async function generateApellidoChileno() {
    try {
        const response = await axios.get('https://nombreyrut.com/api/generarApellidoChileno');
        return response.data.apellido;
    } catch (error) {
        console.error('Error fetching apellido chileno:', error.message);
        throw new Error('Failed to fetch apellido chileno');
    }
}

module.exports.templateTags = [{
    name: 'rutChileno',
    displayName: 'RUT Chileno',
    description: 'Generates a valid Chilean RUT',
    async run() {
        return generateRUT();
    }
}, {
    name: 'nombreChileno',
    displayName: 'Nombre Chileno',
    description: 'Generates a Chilean name',
    async run() {
        return generateNombreChileno();
    }
}, {
    name: 'apellidoChileno',
    displayName: 'Apellido Chileno',
    description: 'Generates a Chilean surname',
    async run() {
        return generateApellidoChileno();
    }
}];
