const express = require("express");
var path = require("path");
var app = express();

// Cấu hình views và view engine
app.set("views", path.join(__dirname, "/apps/views"));
app.set("view engine", "ejs");

// Cấu hình static files
app.use("/static", express.static(path.join(__dirname, "public")));

// Định nghĩa routes
var indexRouter = require(path.join(__dirname, "/apps/controllers/index"));
var aboutRouter = require(path.join(__dirname, "/apps/controllers/aboutcontroller"));
var contactRouter = require(path.join(__dirname, "/apps/controllers/contactcontroller"));
var serviceRouter = require(path.join(__dirname, "/apps/controllers/servicecontroller"));
var appointmentRouter = require(path.join(__dirname, "/apps/controllers/appointmentcontroller"));
var confirmationRouter = require(path.join(__dirname, "/apps/controllers/confirmationcontroller"));
var departmentRouter = require(path.join(__dirname, "/apps/controllers/departmentcontroller"));
var departmentsingleRouter = require(path.join(__dirname, "/apps/controllers/department-singlecontroller"));
var doctorRouter = require(path.join(__dirname, "/apps/controllers/doctorcontroller"));
var doctorsingleRouter = require(path.join(__dirname, "/apps/controllers/doctor-singlecontroller"));
var blogsidebarRouter = require(path.join(__dirname, "/apps/controllers/blog-sidebarcontroller"));
var blogsingleRouter = require(path.join(__dirname, "/apps/controllers/blog-singlecontroller"));

app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/service", serviceRouter);
app.use("/appoinment", appointmentRouter);
app.use("/confirmation", confirmationRouter);
app.use("/department", departmentRouter);
app.use("/department-single", departmentsingleRouter);
app.use("/doctor", doctorRouter);
app.use("/doctor-single", doctorsingleRouter);
app.use("/blog-sidebar", blogsidebarRouter);
app.use("/blog-single", blogsingleRouter);

var server = app.listen(3000, function () {
    console.log("server is running");
});
