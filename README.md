clout-parse
==================
## Install
In the directory of your clout-js application, do the following;

1) Install this package
```bash
npm install clout-parse
```

2) Add this module to ```package.json```
```JSON
{
    ...
    "modules": ["clout-parse"]
    ...
}
```

## Configure
Create a new file ```parse.default.js``` or ```parse.<YOUR_ENV>.js``` in ```/conf``` directory with the following JavaScript.
```JavaScript
module.exports = {
    parse: {
        uri: '<mongodb://localhost/myapp>',
        endpoint: '/parse',
        path: '/cloud/main.js',
        appId: '<app-id>',
        masterKey: '<master-key>',
        liveQuery: {
            className: '<array>'
        }
    }
};
```
