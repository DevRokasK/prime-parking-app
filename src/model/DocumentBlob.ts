import { makeObservable, observable, action, computed } from 'mobx';

export interface IDocumentItem {
    fileName: string;
}

export class DocumentBlob implements IDocumentItem {
    @observable public fileName: string;
    @observable public icon: string = "";

    public constructor(data: string) {
        makeObservable(this);
        this.initFromData(data);
    }

    @computed get Icon() {
        let parts: string[] = this.fileName.split('.');
        this.icon = parts[1];
        return this.icon;
    }

    @action
    public initFromData(data: string) {
        this.fileName = data;
        //this.document = data.document;
    }
}
