import homeModel from "../models/homeModel";

class HomeController{
    async index(req,res){
        res.json({"TudoCerto":"true", "HomeController":"Funcionando"});
    };

}

export default new HomeController();