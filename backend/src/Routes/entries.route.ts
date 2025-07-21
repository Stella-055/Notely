import { Router } from "express";
import { validateEntryDetails, validateUser } from "../Middlewares/entries.middleware";
import { createEntry, getDeletedEntries, getEntries } from "../Controllers/entries.controller";
const route = Router();

route.post("/",validateUser,validateEntryDetails,createEntry)
route.get("/",validateUser,getEntries)
route.get("/trash",validateUser,getDeletedEntries)

export default route