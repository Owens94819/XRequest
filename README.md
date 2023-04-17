# XRequest

```javascript
 XRequest(<url>,<callback>,<boolean>);
```
```javascript
 XRequest("/data", function(data, error){
   if(error) return console.error("could not load source");
   console.log(data, this.status, this)
 }, true /**block rendering**/);
```
