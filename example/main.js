import elevator from "./src/index.ts";

const onReady = (fn) =>
  document.readyState !== "loading"
    ? fn()
    : document.addEventListener("DOMContentLoaded", fn);

onReady(() => {

    const elevatorInstance = new elevator({
        key: "",
        secret: "",
        baseURL: "https://demo.elevator.umn.edu/defaultinstance/api/v1"
    });
    const result = elevatorInstance.getCollections();
    result.then((res) => {
        document.getElementById("logOutput").insertAdjacentHTML('beforeend', "<ul>");
        for (const collection in res) {
            document.getElementById("logOutput").insertAdjacentHTML('beforeend',"<li>" + res[collection] + "</li>"); 
        }
        document.getElementById("logOutput").insertAdjacentHTML('beforeend',"</li>");
        return elevatorInstance.getAssetsFromCollection(Object.keys(res)[0]);
    })
    .then((res) => {
        document.getElementById("logOutput").insertAdjacentHTML('beforeend', "<ul>");
        for (const asset in res.searchResults) {
            document.getElementById("logOutput").insertAdjacentHTML('beforeend',"<li>" + res.searchResults[asset] + "</li>"); 
        }
        document.getElementById("logOutput").insertAdjacentHTML('beforeend',"</li>");
        return elevatorInstance.assetLookup(res.searchResults[0]);
    })
    .then((res) => {
        document.getElementById("logOutput").insertAdjacentHTML('beforeend', "<ul>");
        for (const entry in res) {
            document.getElementById("logOutput").insertAdjacentHTML('beforeend',"<li>" + entry + ": "+ res[entry] + "</li>"); 
        }
        document.getElementById("logOutput").insertAdjacentHTML('beforeend',"</li>");
    });

    const result2 = elevatorInstance.search("terrorism").then((res) => {
        document.getElementById("logOutput").insertAdjacentHTML('beforeend', "<ul>");
        for (const entry in res) {
            document.getElementById("logOutput").insertAdjacentHTML('beforeend',"<li>" + entry + ": "+ res[entry] + "</li>"); 
        }
        document.getElementById("logOutput").insertAdjacentHTML('beforeend',"</li>");
    });

});