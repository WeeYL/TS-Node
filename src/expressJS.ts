import express from "express";
import { Express, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

const app: Express = express();
const port = process.env.PORT || 3000;

// CONFIG
dotenv.config();

// MIDDLEWARE
app.use(express.json())

// HANDLER
app.get("/", (req: Request, res: Response) => {
  res.send(`Servers are running at ${port}`);
});

app.post("/api/data", (req: Request, res: Response) => {
    console.log(req.body)
    return res.sendStatus(200)
  })
  .get("/api/data", (req: Request, res: Response) => {
    console.log(req.body)
    return res.json(req.body)
  })
app.get("/success", (req: Request, res: Response) => {
  return res.json({
    id:1,
    status:true
  })
});

// FOR ACCEPT ALL TYPE OF REQUEST
app.all("/all", (req: Request, res: Response) => {
  res.send("you made an ALL request") // do this in postman
});

app.get("/redirect", (req: Request, res: Response) => {
  return res.redirect("http://example.com")
});

// DYNAMIC API ROUTE 
app.get("/books/:bookId/:authorName", (req: Request, res: Response) => {
  console.log (req.params)
  return res.send(req.params) //localhost:3000/books/123/Por
})

// FUNCTION
// localhost:3000/booksfunc/123/Por
function handleGetBookId(req: Request, res: Response, next:NextFunction){
  console.log(req.params.bookId)
  next() 
}

function handleGetBookAuthor(req: Request, res: Response, next:NextFunction){
  //@ts-ignore
  console.log(req.params.authorName, req.name)
  return res.send(req.params) // to stop API call
}

app.get("/booksfunc/:bookId/:authorName",  
[handleGetBookId, handleGetBookAuthor])


// CURRYING. FUNCTION TO RETURN A FUNCTION eg const curryingF =()=> ()=> {}
// localhost:3000/booksCurry/123/Por
const curryingF =({name}:{name:String})=> (req: Request, res: Response, next:NextFunction)=> {
    // @ts-ignore
    req.name=name
    // @ts-ignore
    next()
}

app.get('/curryingF',curryingF)

// APPEND CURRY TO EVERY ROUTE
// localhost:3000/booksfunc/123/Por
app.use(curryingF({name:"Curry"})) 
app.get("/booksCurry/:bookId/:authorName",  
[handleGetBookId, handleGetBookAuthor])

// SPECIFY REQ PARAMS
//localhost:3000/booksReqParams

app.get("/booksReqParams", 
(req: Request<{bookId:String, authorName:String}, {}, {name:String}>, res: Response) => 
{
  // set params
  req.params.bookId="112"
  req.params.authorName="Jan"
  req.body.name="Leon"


  let result = Object.assign({}, req.params,req.body) // concate dictionary
  return res.send(result) 
})

// LAUNCH

app.listen(port, () => {
  console.log(`Servers is running at https://localhost:${port}`);
});

