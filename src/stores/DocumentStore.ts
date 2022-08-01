import { BaseStore } from "./BaseStore";
import { observable, makeObservable, action } from 'mobx';
import { DocumentBlob } from "../model/DocumentBlob";

export class DocumentStore extends BaseStore {
    @observable public documents: DocumentBlob[] = [];
    @observable public isNotLoaded: boolean = true;
    @observable public selectedFiles: DocumentBlob[] = [];

    public constructor() {
        super();
        makeObservable(this);
    }

    @action
    public SetSelectedFiles(data: DocumentBlob[]) {
        this.selectedFiles = data;
    }
}