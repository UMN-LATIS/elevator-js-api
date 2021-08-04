import Queue from 'async-await-queue';
import sha1 from 'js-sha1';

interface elevatorOptions {
  user?: string;
  key: string;
  secret: string,
  baseURL: string
}

export default class elevator {
    asyncQueue;
    options: elevatorOptions;

    constructor(options: elevatorOptions) {
        this.asyncQueue = new Queue(3, 100);
        this.options = options ;
    }
    
    async getAssetsFromCollection(collectionId: number, pageNumber?: number) {
        const requestURL = "/collections/getContentsOfCollection/" + collectionId + "/" + (pageNumber?pageNumber:"");
        return this._performRequest(requestURL);
    }

// In Elevator, a single asset may contain many files.  This will get all of the files from the asset.  It's also
   // an easy way to get the files from any asset, even if it only has one.
    async getAssetChildren(objectId: string) {
      const requestURL = "/asset/getAssetChildren/" + objectId;
      return this._performRequest(requestURL);
   }

   // get the URL that should be placed in an <iframe> tag
    async getEmbedContent(objectId: string) {
      const requestURL = "/asset/getEmbedLink/" + objectId;
      return this._performRequest(requestURL);
   }
   
   // get the full metadata for an asset
    async assetLookup(objectId: string) {
      const requestURL = "/asset/assetLookup/" + objectId;
      return this._performRequest(requestURL);
   }
   
   // get information about a file asset - the URLs for all the various derivatives
    async fileLookup(objectId: string) {
      const requestURL = "/asset/fileLookup/" + objectId;
      return this._performRequest(requestURL);
   }

   // list all the collections in an instance.  
    async getCollections() {
      const requestURL = "/collections/listCollections";
      return this._performRequest(requestURL);
   }

   async search(searchTerm: string, pageNumber: number = 0) {
      let postItem = new FormData();
      postItem.append("searchTerm", searchTerm);
      postItem.append("pageNumber", pageNumber.toString());

      const requestURL = "/search/performSearch/";
      return this._performRequest(requestURL, postItem);
   }

    async _performRequest(targetURL: string, postData?: FormData) {
        const me = Symbol();
        await this.asyncQueue.wait(me, -1);
        const d : Date = new Date();
        const now : string = Math.round(d.getTime() / 1000).toString();
        const hash : string = sha1(now + this.options.secret);
        let headers = new Headers({
            'Authorization-Key': this.options.key,
            'Authorization-Timestamp':  now,
            'Authorization-Hash': hash
        });
        if(this.options.user) {
            headers.set("Authorization-User", this.options.user);
        }
        

        let fetchOptions:any = {
            method: 'GET',
            mode: 'cors',
            headers: headers
        }
        if(postData) {
            fetchOptions.method = 'POST';
            fetchOptions.body = postData;
        }

        const response = await fetch(this.options.baseURL + targetURL, fetchOptions);
        this.asyncQueue.end(me);
        return response.json();
    }
}
