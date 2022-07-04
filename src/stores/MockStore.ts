import { Car } from "../model/Car";
import {observable} from 'mobx';

export class CarStore {
    @observable public Cars: Car[];

    

    
}