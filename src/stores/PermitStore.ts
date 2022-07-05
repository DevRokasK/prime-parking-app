import { Permit } from '../model/Permit';
import { observable, action, makeObservable } from 'mobx';

export class Permitstore {
    @observable public Permits: Permit[] = [];

    public constructor() {
        makeObservable(this);
    }

    @action
    public Init() {
       
    }
}