import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("UserModel", schema);
export default model;

// Takes the schema(blueprint) and gives you tools to:

// Build new users (create)
// Find existing users (read)
// Modify users (update)
// Remove users (delete)