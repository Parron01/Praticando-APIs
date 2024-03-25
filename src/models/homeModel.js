import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    titulo:String,
    nome: {type: String, required: true},
    CriadoEm: {type: Date, default:Date.now} 
});
const homeModel = mongoose.model("Home",homeSchema);

class Home {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async inserindoDados(){
        this.user = await homeModel.create(this.body);
        return this.user;
    }
}


export default Home;