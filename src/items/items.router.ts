// Required External Modules and Interfaces
import express, {Request, Response} from 'express'
import * as ItemService from './items.service'
import { BaseItem, Item } from './item.interface'

// Router Definition

export const itemsRouter = express.Router();

//Controller Definitions

//Get all
itemsRouter.get("/items/", async (req: Request, res: Response)=>{
    try{
        const items: Item[] = await ItemService.findAll();
        res.status(200).send(items);
    }catch (e){
        res.status(500).send(e.message);
    }
})

//Get one
itemsRouter.get("/items/:id", async (req:Request, res:Response)=>{
    try{
        const id: number= parseInt(req.params.id, 10);
        const item: Item = await ItemService.findOne(id);

        if(item){
            res.status(200).send(item)
        }else{
            res.status(400).send("Item not found :(")
        }
    }catch(e){
        res.status(500).send(e.message);
    }
})

//Post
itemsRouter.post("/items/", async (req: Request, res:Response)=>{
    try {
        const item: BaseItem = req.body;
        const newItem = await ItemService.create(item);
        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

//Put
itemsRouter.put("/items/update/:id", async (req: Request, res: Response)=>{
    try {
        const id: number = parseInt(req.params.id, 10)
        const actualItem: Item = await ItemService.findOne(id);
        const newItem: Item= req.body;

        if(actualItem){
            try {
                const updatedItem = await ItemService.update(id, newItem);
                res.status(200).json(updatedItem);
            } catch (e) {
                res.status(500).send(e.message);
            }

        }else{
            res.status(400).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})

//Delete
itemsRouter.delete("/items/:id", async (req: Request, res: Response)=>{
    try {
        const id: number = parseInt(req.params.id, 10)
        const item: Item = await ItemService.findOne(id);
        if(item){
            await ItemService.remove(id);
        }else{
            res.status(400).send("Item not found")
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})