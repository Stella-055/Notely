export interface userdetails {
  id: string;

  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user: userdetails;
    }
  }
}
