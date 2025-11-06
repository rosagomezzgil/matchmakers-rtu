// import the model in order to create the user
import { Request, Response } from 'express';

// create a new user (register)
export const createUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // aggregate the logic for create an user in the db

  res.status(201).json({ message: 'User created successfully', user: { name, email, password } });
};

// login 
export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // aggregate the logic in order to verificate an email and password

  res.status(200).json({ message: 'User logged in successfully', user: { email } });
};
