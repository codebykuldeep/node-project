export function logger(req,res,next){
    const date = new Date().toLocaleTimeString();
    console.log(req.method +" "+req.url + "  " + date);
    next();
}