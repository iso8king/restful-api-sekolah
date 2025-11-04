import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

web.listen(3980 , ()=>{
    logger.info("App starting at port 3980")
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sekolah',
      version: '1.0.0',
      description: 'Dokumentasi otomatis dari route Express',
    },
  },
  apis: ['./route/*.js'],
};

const specs = swaggerJSDoc(options);
web.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));