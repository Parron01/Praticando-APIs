import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    email : {type: String, required:true},
    password : {type: String, required:true},
    createdAt: {type: Date, default:Date.now} 
});
const userModel = mongoose.model("User",userSchema);

class User {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login(){
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await userModel.findOne({email:this.body.email});

        if(!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha Inválida.');
            this.user = null;
            return;
        }
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await userModel.create(this.body);
        
    }

    async userExists(){
        this.user = await userModel.findOne({email:this.body.email});
        
        if(this.user) this.errors.push('Usuário já existe.')
    }

    valida(){
        this.cleanUp();
        //validação de email e senha
        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido.');
        }

        if(this.body.password.length < 3 || this.body.password.length >= 50){
            this.errors.push("A senha precisa ter entre 3 e 50 caracteres.")
        }

    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            email:this.body.email,
            password:this.body.password
        };
    }

    async edit(id){
        if(typeof id !== 'string') return;
        

        if(this.errors.length > 0) return;

        this.user = await userModel.findByIdAndUpdate(id, this.body, {new: true});
    }

    //Métodos Estáticos
    static async delete(email){
        if(typeof email !== 'string') return;
        const user = await userModel.findOneAndDelete({email: email});
        return user;
    }
    static async findUsers(){
        const users = await userModel.find()
        .sort({createdAt: -1});
        return users;
    }
}


export default User;