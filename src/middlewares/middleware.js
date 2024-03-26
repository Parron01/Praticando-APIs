export function GlobalMiddleware(req,res,next){
    console.log("Passei pelo middleware.")
    next();
}


export function loginRequired(req,res,next) {
    if(!req.session.user){
        res.json("Operação Não permitida, Necessita Login.");
        return;
    }

    next();
}