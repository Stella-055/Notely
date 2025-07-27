import { Router } from "express";
import {
  validateEntryDetails,
  validateUser,
} from "../Middlewares/entries.middleware";
import {
  bookmarkEntry,
  createEntry,
  getBookmarkedEntries,
  getDeletedEntries,
  getEntries,
  getPublishednotes,
  unbookmarkEntry,
} from "../Controllers/entries.controller";
const route = Router();

route.post("/", validateUser, validateEntryDetails, createEntry);
route.get("/", validateUser, getEntries);
route.get("/bookmark", validateUser, getBookmarkedEntries);
route.get("/trash", validateUser, getDeletedEntries);
route.get("/bookmark", validateUser, getBookmarkedEntries);
route.post("/bookmark/:id", validateUser, bookmarkEntry);
route.patch("/bookmark/:id", validateUser, unbookmarkEntry);
route.get("/published", getPublishednotes);
export default route;
