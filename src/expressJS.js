"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(`Servers are running at ${port}`);
});
app.post("/api/data", (req, res) => {
    console.log(req.body);
    return res.sendStatus(200);
})
    .get("/api/data", (req, res) => {
    console.log(req.body);
    return res.json(req.body);
});
app.get("/success", (req, res) => {
    return res.json({
        id: 1,
        status: true
    });
});
app.all("/all", (req, res) => {
    res.send("you made an ALL request");
});
app.get("/redirect", (req, res) => {
    return res.redirect("http://example.com");
});
app.get("/books/:bookId/:authorName", (req, res) => {
    console.log(req.params);
    return res.send(req.params);
});
function handleGetBookId(req, res, next) {
    console.log(req.params.bookId);
    next();
}
function handleGetBookAuthor(req, res, next) {
    console.log(req.params.authorName, req.name);
    return res.send(req.params);
}
app.get("/booksfunc/:bookId/:authorName", [handleGetBookId, handleGetBookAuthor]);
const curryingF = ({ name }) => (req, res, next) => {
    req.name = name;
    next();
};
app.get('/curryingF', curryingF);
app.use(curryingF({ name: "Curry" }));
app.get("/booksCurry/:bookId/:authorName", [handleGetBookId, handleGetBookAuthor]);
app.get("/booksReqParams", (req, res) => {
    req.params.bookId = "112";
    req.params.authorName = "Jan";
    req.body.name = "Leon";
    console.log(req.params, req.body);
    return res.send(req.params);
});
app.listen(port, () => {
    console.log(`Servers is running at https://localhost:${port}`);
});
