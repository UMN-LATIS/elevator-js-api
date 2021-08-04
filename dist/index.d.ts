interface elevatorOptions {
    user?: string;
    key: string;
    secret: string;
    baseURL: string;
}
export default class elevator {
    asyncQueue: any;
    options: elevatorOptions;
    constructor(options: elevatorOptions);
    getAssetsFromCollection(collectionId: number, pageNumber?: number): Promise<any>;
    getAssetChildren(objectId: string): Promise<any>;
    getEmbedContent(objectId: string): Promise<any>;
    assetLookup(objectId: string): Promise<any>;
    fileLookup(objectId: string): Promise<any>;
    getCollections(): Promise<any>;
    search(searchTerm: string, pageNumber?: number): Promise<any>;
    _performRequest(targetURL: string, postData?: FormData): Promise<any>;
}
export {};
