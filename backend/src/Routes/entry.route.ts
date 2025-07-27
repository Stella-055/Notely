import router from "express";
import {
  deleteEntry,
  generateContent,
  getEntry,
  restoreEntry,
  summarizeContent,
  updateEntry,
} from "../Controllers/entry.controller";
import {
  validateEntryDetails,
  validateUser,
} from "../Middlewares/entries.middleware";

const route = router();
route.get("/:id", validateUser, getEntry);
route.patch("/:id", validateUser, validateEntryDetails, updateEntry);
route.delete("/:id", validateUser, deleteEntry);
route.patch("/restore/:id", validateUser, restoreEntry);
route.post("/generate", validateUser, generateContent);
route.post("/summarize", validateUser, summarizeContent);
export default route;
