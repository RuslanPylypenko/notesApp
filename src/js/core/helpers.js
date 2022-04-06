import { v4 as uuidv4 } from 'uuid';

export const Id = function (){
    return uuidv4().substr(0, 8)
}