import { BaseStore } from "./BaseStore";
import { observable, makeObservable } from 'mobx';
import { DocumentBlob } from "../model/DocumentBlob";

export class DocumentStore extends BaseStore {
    @observable public documents: DocumentBlob[] = [];
    @observable public isNotLoaded: boolean = true;

    public constructor() {
        super();
        makeObservable(this);
    }
}