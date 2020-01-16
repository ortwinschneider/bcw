const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'BCW API', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'BCW Simple File API', // Description (optional)
    },
    host: 'localhost:8080', // Host (optional)
    basePath: '/', // Base path (optional)
};

const options = {
    swaggerDefinition,
    apis: ['./routes/index.js'], // <-- not in the definition, but in the options
};

module.exports = swaggerJSDoc(options);