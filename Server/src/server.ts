import express, { NextFunction } from 'express';
import { Request,Response } from 'express';
import router from './routes/index';
import cors from 'cors';
const app=express();

app.use(cors());
app.use(express.json());    
app.use(express.urlencoded({extended:true}));

app.use("/api/v1",router)


app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(404).json({message:"Route not found"})

  
});

const port:number=3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
} 
)