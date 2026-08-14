const asynchandler = (requesthandler)=>{
   return (req,res,next)=>{
    Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err)) }}

    export { asynchandler }



/*
const asynchandler = (fn) => async(req,res,next) =>{
    try{
    await fn(req,res,next)}
    catch(err){
    res.status(err.code|| 505).json({
    success: false,
    mesaage = err.message})}}
    */