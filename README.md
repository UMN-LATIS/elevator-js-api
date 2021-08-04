# Elevator JS API

> Simple abstraction for interfacing with the Elevator JS API


## Usage

```js

const elevatorInstance = new elevator({
    key: "YOUR-KEY",
    secret: "YOUR-SECRET",
    baseURL: "https://YOUR-ELEVATOR-INSTANCE/api/v1"
});

const result = elevatorInstance.getCollections();
result.then((res) => {
    for (const collection in res) {
        console.log("Collection: ", res[collection]); 
    }
});

```

## Installation

### Using NPM or Yarn

```console
npm install @umn-latis/elevator-js-api
```

```console
yarn add @umn-latis/elevator-js-api
```

### With a `<script>` tag

Added this **before** your main script:

```html
<!-- index.html -->
<script
  src="https://unpkg.com/@umn-latis/elevator-js-api/dist/index.umd.min.js"
  async
></script>
```

## API

### `getCollections`

Get an array of all of the collections in the target instance as id:name object pairs. 

Returns a `Promise` which will resolve to an array

### `getAssetsFromCollection`

Get an array of all of the assets in the target collection. 

Parameters:

- `collectionId` - the integer identifier for a collection
- `pageNumber` - an optional page number (zero indexed)

Returns a `Promise` which will resolve to an object:

```js
{
    "searchResults": [],
    "totalResults": 59,
    "matches": [
        {
            // truncated - asset data
        }
    ],
    "success": true,
    "searchEntry": {
        "searchText": "",
        "collection": [COLLECTION_ID],
        "fuzzySearch": false
    },
    "assetsPerPage": 30
}
```

### `assetLookup`

Get detailed information about an asset

Parameters:

- `objectId` - the string identifier for an object

Returns a `Promise` which will resolve to an object describing the object.

### `getAssetChildren`

Get all of the files attached to an asset, including via related assets

Parameters:

- `objectId` - the string identifier for an object

Returns a `Promise` which will resolve to a string which can be used as an iframe src.

```js
{
    "matches": [{
        "title": "FILE TITLE",
        "primaryHandlerId": "FILE OBJECT ID",
        "primaryHandlerTiny": "URL",
        "primaryHandlerTiny2x": "URL",
        "primaryHandlerThumbnail": "URL",
        "primaryHandlerThumbnail2x": "URL"
    }]
}
```

### `getEmbedContent`

Get the embed code necessary to host a file object in an iframe.

Parameters:

- `objectId` - the string identifier for a file object

Returns a `Promise` which will resolve to a string which can be used in an iframe link.

### `fileLookup`

Get detailed information about a file.

Parameters:

- `objectId` - the string identifier for a file object

Returns a `Promise` which will resolve to an object with detailed file information.

### `search`

Search for records

Parameters:

- `searchTerm` - the string identifier for a file object
- `pageNumber` - an optional page number (zero indexed)

Returns a `Promise` which will resolve to an object with detailed file information.

```js
{
    "searchResults": [],
    "totalResults": 59,
    "matches": [
        {
            // truncated - asset data
        }
    ],
    "success": true,
    "searchEntry": {
        "searchText": "YOUR TEXT",
        "fuzzySearch": false
    },
    "assetsPerPage": 30
}
```



## License

MIT