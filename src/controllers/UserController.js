import userModel from "../models/userModel";

class UserController{
    index(req,res){
        res.json({"TudoCerto":"true", "UserController":"Funcionando"});
    };
    async create(req,res){
        try {
            const user = new userModel(req.body);
            await user.register();
         
            if(user.errors.length > 0) {
                res.json(user.errors);
                return;
            }
            res.json(`Usuário com email [ ${user.user.email} ] criado com Sucesso!  >>>  ${user.user.createdAt}`);
         
         }  catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro ao criar usuário." });
        }
    };
    async delete(req,res){
        try {
            if(!req.params.email) throw new Error("Email não enviado.");

            const user = await userModel.delete(req.params.email);
            if(!user) throw new Error("Usuário Não Existe.");
        
            res.json(`Usuário com email [ ${user.email} ] Apagado com Sucesso!`);
            return;
         
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            res.status(500).json({ error: `Erro ao deletar usuário.`, detalhes: `${error}` });
        }
            
    };
    async login(req,res){
        try {
            const user = new userModel(req.body);
            await user.login();
         
            if(user.errors.length > 0) {
                res.json(user.errors);
                return;
            }
            res.json(`Usuário logado com Sucesso no sistema!`);
         }  catch (error) {
            console.error("Erro ao fazer login do usuario:", error);
            res.status(500).json({ error: "Erro ao fazer login do usuario." });
        }
    };
    
    async show(req, res) {
        try {
            const users = await userModel.findUsers();
            const usersData = users.map(user => ({
                email: user.email,
                createdAt: user.createdAt
            }));
            res.json(usersData);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
    

    async update(req,res){
        try {
            if(!req.params.email) throw new Error;
            const user = new userModel(req.body);
            await user.edit(req.params.email);
        
            if(user.errors.length > 0) throw new Error("blabalba");
        
            res.json(`Usuário atualizado com Sucesso!`);
            return
          } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    };


}

export default new UserController();