// Store module OUTSIDE the function so it persists across requests
let module = {
  id: "M101",
  name: "Web Development",
  description: "Learn to build modern web applications",
  course: "CS5610",
};

export default function Module(app) {
  // GET /lab5/module - retrieve the full module object
  app.get("/lab5/module", (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(module);
  });

  // GET /lab5/module/name - retrieve just the name
  app.get("/lab5/module/name", (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(module.name);
  });

  // GET /lab5/module/name/:newName - update the module name
  app.get("/lab5/module/name/:newName", (req, res) => {
    const newName = decodeURIComponent(req.params.newName);
    module.name = newName;
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(module);
  });

  // PUT /lab5/module/name/:newName - update the module name (RESTful)
  app.put("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    const decodedName = decodeURIComponent(newName);
    module.name = decodedName;
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(module);
  });

  // GET /lab5/module/description/:newDescription - update the module description
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const newDescription = decodeURIComponent(req.params.newDescription);
    module.description = newDescription;
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(module);
  });

  // PUT /lab5/module/description/:newDescription - update the module description (RESTful)
  app.put("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    const decodedDescription = decodeURIComponent(newDescription);
    module.description = decodedDescription;
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json(module);
  });
}

