import mongoose from "mongoose";
import color from "colors";
const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb database ${conn.connection.host}`.bgMagenta.red);

    } catch(error){
        console.log(`Error in Mongodb ${error}`)
    }
}
export default connectDB;