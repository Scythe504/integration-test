import express, { request } from 'express';
import { prismaClient } from './db';


export const app = express();

app.use(express.json());

app.post('/sum', async (req, res)=> {
    const { a, b }: {
        a : number;
        b : number;
    } = req.body;

    if (a > 100000000 || b > 100000000) {
        return res.status(422).json({
            message : "Sum is too large",
        })
    }
    const result: number = a + b;
    const request = await prismaClient.request.create({
        data : {
            a : a,
            b : b,
            answer : result,
            type : "ADD"
        }
    })

    return res.json({
        answer : result,
        id : request.id
    })
})