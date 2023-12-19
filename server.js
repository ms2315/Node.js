const http = require('http')
const fs = require('fs')
const url = require('url')

const myServer = http.createServer((req , res) => {

    if(req.url === '/favicon.ico'){return res.end();} // fevicon request hata dega ye line 

    const log = `${Date.now()} : ${req.url} : ${req.method}  : A new request recived\n`; // log me date and url store kiya h 

    const myUrl = url.parse(req.url , true)  //parse krdia url and true means alah alag krdega search , query , pathname etc
    console.log(myUrl)

    // fs async append lagaya hai
    fs.appendFile("./log.txt" , log , ()=> {

        switch(myUrl.pathname)  // req.url kki jagha myUrl.pathname laga k sirf url me s pathname uthayga 
        {
            case "/" : 
            res.end("Hello This is HOME page");
             break;

            case "/about" : 
            const UserName = myUrl.query.myName;
            res.end("Hello This is page about " +`${UserName}`); //http://localhost:8000/about?myName=Mohit
            break;

            case "/search" : 
            const search = myUrl.query.search_q;
            res.end("This is Search result of " +`${search}`);  //http://localhost:8000/search?search_q=tic_tac_toe
            break;


            default : res.end("Error 404"); 
            
        }

    })

})

myServer.listen(8000 , () => {
    console.log("Server start at 8000");
})


