import express, { NextFunction, Request, Response } from 'express';
import { ConnectionResponse } from './interfaces/database';

import { publicPath } from './utils/path';
import DatabaseConnection from './configs/database';
import { CustomError } from './interfaces/errors';
import BudgetController from './controllers/BudgetController';

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.static(publicPath()));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  next();
});

app.use('/', new BudgetController().router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: `Hello There! Running at: ${process.env.APP_BASE_URL}` });
});

app.use((err: CustomError, req: Request, res: Response) => {
  const { status_code, message, data } = err;
  const code = status_code || 500;

  res.status(code).json({ status: 'error', message, data });
});

app.listen(port);

(async () => {
    
  let response: ConnectionResponse = await new DatabaseConnection().connect();
  
  if (response.status === 'success') {
    console.log(response.message);
  } else {
    console.log(response.message);
  }

})();
