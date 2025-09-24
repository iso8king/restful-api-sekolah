import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

web.listen(3980 , ()=>{
    logger.info("App starting at port 3980")
})