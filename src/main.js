import "dotenv/config";

import {app} from "./app.js";
import {populate} from "./populate.js";

const port = process.env.PORT || 8080;

await populate();

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
