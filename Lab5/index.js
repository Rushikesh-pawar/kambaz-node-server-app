import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import Assignment from "./Assignment.js";
import Module from "./Module.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
      res.send("Welcome to Lab 5");
    });
    PathParameters(app);
    QueryParameters(app);
    WorkingWithObjects(app);
    Assignment(app);
    Module(app);
    WorkingWithArrays(app);
  };
  