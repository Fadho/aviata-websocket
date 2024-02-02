/** @format */

import app from "./server"
import { configs } from "./modules/common/utils/config"

// Start the server
app.listen(configs.PORT, () => {
    console.log(`Environment is ${configs.NODE_ENV}`)
    console.log(`Server started on port: ${configs.PORT}`)
})
