import homeModel from "../models/homeModel";

class HomeController{
    async index(req,res){
        res.json({"TudoCerto":"true", "HomeController":"Funcionando"});
       /* const insert = new homeModel({
        "titulo":"Testando Inserção de dados.",
         "nome":"Mongodb no praticando API." })
        const infos = await insert.inserindoDados();
        res.send(infos);
        */
    };

}

export default new HomeController();