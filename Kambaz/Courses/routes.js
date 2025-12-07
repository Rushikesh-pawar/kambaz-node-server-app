// Kambaz/Courses/routes.js
import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  const createCourse = async(req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const findAllCourses = async(req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  // Delete a course and all associated enrollments
  const deleteCourse = async(req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };

  const findCoursesForEnrolledUsers = async(req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const user = req.session["currentUser"];
      if (!user) {
        res.sendStatus(401);
        return;
      }
      userId = user._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(userId);  // FIXED: Changed from findCoursesForEnrolledUsers
    res.json(courses);
  };

  const updateCourse = async(req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  

  // Routes
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);  // FIXED: Changed from :userId to :uid
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);  // FIXED: Changed from :userId to :uid
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUsers);
  app.get("/api/courses/:cid/users", findUsersForCourse);

}