import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const PORT = parseInt(process.env.PORT ?? '3000');
const BASE_URL = '/api/users';

interface User{
  id?: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

const users: Array<User> = [];

const listener = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = req.url;
  if (!(url === BASE_URL || url === BASE_URL + '/' || url?.replace(BASE_URL + '/', '').indexOf('/') === -1)) {
    res.statusCode = 404;
    res.end('Non-existent resource');
    return;
  }
  switch (req.method) {
    case 'GET':
      if (url === BASE_URL || url === BASE_URL + '/') {
        res.statusCode = 200;
        res.end(JSON.stringify(users));
        return;
      }
      break;
    default:
      res.statusCode = 500;
      res.end('Invalid method or error');
      return;
  }
  res.statusCode = 404;
  res.end('Method not implemented');
};

http.createServer(listener).listen(PORT);
