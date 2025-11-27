// Store assignment OUTSIDE the function so it persists across requests
let assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };
  
  export default function Assignment(app) {
    // GET /lab5/assignment - retrieve the full assignment object
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
  
    // PUT /lab5/assignment/title/:newTitle - update the title
    app.put("/lab5/assignment/title/:newTitle", (req, res) => {
      const { newTitle } = req.params;
      const decodedTitle = decodeURIComponent(newTitle);
      console.log("Before update - assignment.title:", assignment.title);
      console.log("New title from params:", decodedTitle);
      assignment.title = decodedTitle;
      console.log("After update - assignment.title:", assignment.title);
      console.log("Full assignment object:", JSON.stringify(assignment));
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(assignment);
    });
    
    // GET /lab5/assignment/title/:title - update the title (for backward compatibility with GET requests)
    app.get("/lab5/assignment/title/:title", (req, res) => {
      const newTitle = decodeURIComponent(req.params.title);
      console.log("Before update - assignment.title:", assignment.title);
      console.log("New title from params:", newTitle);
      assignment.title = newTitle;
      console.log("After update - assignment.title:", assignment.title);
      console.log("Full assignment object:", JSON.stringify(assignment));
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(assignment);
    });
  
    // GET /lab5/assignment/title - retrieve just the title
    app.get("/lab5/assignment/title", (req, res) => {
      console.log("GET /lab5/assignment/title called");
      console.log("Current assignment.title:", assignment.title);
      console.log("Full assignment object:", JSON.stringify(assignment));
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(assignment.title);
    });

    // GET /lab5/assignment/score/:newScore - update the score
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
      const newScore = parseFloat(req.params.newScore);
      if (isNaN(newScore)) {
        res.status(400).json({ error: "Score must be a number" });
        return;
      }
      assignment.score = newScore;
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(assignment);
    });

    // PUT /lab5/assignment/score/:newScore - update the score (RESTful)
    app.put("/lab5/assignment/score/:newScore", (req, res) => {
      const newScore = parseFloat(req.params.newScore);
      if (isNaN(newScore)) {
        res.status(400).json({ error: "Score must be a number" });
        return;
      }
      assignment.score = newScore;
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(assignment);
    });

    // GET /lab5/assignment/completed/:completed - update the completed status
    app.get("/lab5/assignment/completed/:completed", (req, res) => {
      const completedStr = req.params.completed.toLowerCase();
      const completed = completedStr === 'true' || completedStr === '1';
      assignment.completed = completed;
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(assignment);
    });

    // PUT /lab5/assignment/completed/:completed - update the completed status (RESTful)
    app.put("/lab5/assignment/completed/:completed", (req, res) => {
      const completedStr = req.params.completed.toLowerCase();
      const completed = completedStr === 'true' || completedStr === '1';
      assignment.completed = completed;
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(assignment);
    });
  }