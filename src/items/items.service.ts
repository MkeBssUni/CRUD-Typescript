//Data Model Interfaces -- Importar las interfaces creadas anteriormente

import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";

//In-Memory Store -Acá es donde iría la instancia de la base de datos (?

//Pero vamos a usar la memoria interna

let items: Items={
    1:{
        id: 1,
        name: "Hamburgesa con tocino",
        price: 120,
        description: "La clásica hamburgesa ahora con mermelada de tocino",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2:{
        id: 2,
        name: "Aros de cebolla",
        price: 50,
        description: "Los mejores aros de cebolla que vas a probar en tu vida",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carlsjr.es%2Fproducto%2Faros-de-cebolla%2F&psig=AOvVaw34yIP7dvJYXm9kHfygmPTq&ust=1684248787274000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOD-kLO89_4CFQAAAAAdAAAAABAD"
    },
    3:{
        id: 3,
        name: "Malteada de vainilla",
        price: 75,
        description: "Ps la malteada de toda la vida, hecha con heladito",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
}

//Service Methods

export const findAll = async (): Promise<Item[]> => Object.values(items);
export const findOne = async(id: number): Promise<Item> => items[id];

export const create = async (newItem: BaseItem): Promise<Item>=>{
    const id = new Date().valueOf();
    items[id]={
        id,
        ...newItem,
    };

    return items[id];
}

export const update = async (
    id: number,
    itemUpdate: BaseItem
): Promise<Item | null>=>{
    const item= await findOne(id);

    if(!item){
        console.log("Item no encontrado")
        return null;
    }

    items[id]={
        id,
        ...itemUpdate
    }

    return items[id]
}

export const remove = async (id: number): Promise<String | null | void>=>{
    const item = await findOne(id);

    if(!item){
        console.log("El item no existe")
        return null;
    }

    delete items[id];
}
