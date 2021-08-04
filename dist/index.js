import Queue from 'async-await-queue';
import sha1 from 'js-sha1';
export default class elevator {
    constructor(options) {
        this.asyncQueue = new Queue(3, 100);
        this.options = options;
    }
    async getAssetsFromCollection(collectionId, pageNumber) {
        const requestURL = "/collections/getContentsOfCollection/" + collectionId + "/" + (pageNumber ? pageNumber : "");
        return this._performRequest(requestURL);
    }
    async getAssetChildren(objectId) {
        const requestURL = "/asset/getAssetChildren/" + objectId;
        return this._performRequest(requestURL);
    }
    async getEmbedContent(objectId) {
        const requestURL = "/asset/getEmbedLink/" + objectId;
        return this._performRequest(requestURL);
    }
    async assetLookup(objectId) {
        const requestURL = "/asset/assetLookup/" + objectId;
        return this._performRequest(requestURL);
    }
    async fileLookup(objectId) {
        const requestURL = "/asset/fileLookup/" + objectId;
        return this._performRequest(requestURL);
    }
    async getCollections() {
        const requestURL = "/collections/listCollections";
        return this._performRequest(requestURL);
    }
    async search(searchTerm, pageNumber = 0) {
        let postItem = new FormData();
        postItem.append("searchTerm", searchTerm);
        postItem.append("pageNumber", pageNumber.toString());
        const requestURL = "/search/performSearch/";
        return this._performRequest(requestURL, postItem);
    }
    async _performRequest(targetURL, postData) {
        const me = Symbol();
        await this.asyncQueue.wait(me, -1);
        const d = new Date();
        const now = Math.round(d.getTime() / 1000).toString();
        const hash = sha1(now + this.options.secret);
        let headers = new Headers({
            'Authorization-Key': this.options.key,
            'Authorization-Timestamp': now,
            'Authorization-Hash': hash
        });
        if (this.options.user) {
            headers.set("Authorization-User", this.options.user);
        }
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            headers: headers
        };
        if (postData) {
            fetchOptions.method = 'POST';
            fetchOptions.body = postData;
        }
        const response = await fetch(this.options.baseURL + targetURL, fetchOptions);
        this.asyncQueue.end(me);
        return response.json();
    }
}
//# sourceMappingURL=index.js.map