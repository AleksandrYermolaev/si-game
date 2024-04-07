import express from 'express';
import cors from 'cors';
import router from './router';

const server = express();
const port = 8008;

server.use(express.json());
// server.use(
//   cors({
//     origin: 'client',
//   })
// );
server.use(router);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
