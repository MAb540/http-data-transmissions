import {server} from './main.js';


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});