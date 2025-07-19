export interface userdetails {
  id: string;

  username: string;
}

declare global {
  namespace Express {
    interface Request {
      owner: userdetails;
    }
  }
}
