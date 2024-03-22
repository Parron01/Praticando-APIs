class HomeController{
    index(req,res){
        res.json({
            TudoFuncionando : true,
        })
    };



}

export default new HomeController();