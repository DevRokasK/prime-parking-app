import { Permit } from '../model/Permit';
import {observable} from 'mobx';

export class Permitstore {
    @observable public Permits: Permit[];
}