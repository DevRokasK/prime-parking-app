import { makeObservable, observable, action, computed } from 'mobx';

export interface IDocumentItem {
    document: string;
}

export class DocumentBlob implements IDocumentItem {
    @observable public document: string;
    @observable public icon: string = "";

    public constructor(data: IDocumentItem) {
        makeObservable(this);
        this.initFromData(data);
    }

    @computed get Icon() {
        let parts: string[] = this.document.split('.');
        this.icon = parts[1];
        return this.icon;
    }

    @action
    public initFromData(data: IDocumentItem) {
        this.document = data.document;
    }
}
