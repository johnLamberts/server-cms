require('dotenv').config(); // This must be at the very top
require('module-alias/register');

import app from "@/app";
import { envConfig } from "@/config";


export const startServer = () => {
  try {
    const PORT: number = parseInt(`${envConfig.PORT}`, 10);

    // console.log(`PORT value: ${envConfig.PORT}`)
    app.listen(PORT, () => {
      console.log(
        `Server is running at http://localhost:${PORT}`.bg_green.green
      );
    });

  } catch (err) {
    console.error(`[startUpServer]: ${err}`)
    process.exit(1)
  }
}

startServer();

export default app;
