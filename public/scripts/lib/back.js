function flattenObj(x, path) {
    if (path === void 0) { path = []; }
    var result = [];
    Object.keys(x).forEach(function (key) {
        if (!x.hasOwnProperty(key)) {
            return;
        }
        var newPath = path.slice();
        newPath.push(key);
        var vals = [];
        if (typeof x[key] === "object" && x[key] != null) {
            vals = flattenObj(x[key], newPath);
        }
        else {
            vals.push({ path: newPath, val: x[key] });
        }
        vals.forEach(function (obj) {
            return result.push(obj);
        });
    });
    return result;
}
function getPath(path) {
    if (path.length === 1) {
        return path[0];
    }
    else {
        var first = path[0];
        var rest = path.slice(1);
        return first + "[" + rest.join("][") + "]";
    }
}
function toQueryString(obj, urlEncode) {
    var parts = flattenObj(obj);
    var queryString = parts
        .map(function (varInfo) {
        return getPath(varInfo.path) + "=" + encodeURIComponent(varInfo.val);
    })
        .join("&");
    return queryString;
}
function fetchUrl(url, args, method) {
    if (args === void 0) { args = {}; }
    if (method === void 0) { method = "GET"; }
    return new Promise(function (resolve, reject) {
        var http = new XMLHttpRequest();
        url = url || "";
        var params = toQueryString(args, true);
        var content = method === "POST" ? params : null;
        var _url = method === "GET" ? params : "";
        http.withCredentials = true;
        http.open(method, url + (url.indexOf("?") >= 0 ? "&" : "?") + _url, true);
        http.withCredentials = true;
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var json = JSON.parse(this.responseText);
                        if (json.result == "fail") {
                            console.log("fail");
                        }
                    }
                    catch (e) {
                    }
                    resolve.call(this, this.responseText);
                }
                else {
                    reject(this.statusText);
                }
            }
        };
        http.send(content);
    });
}
fetchUrl("https://cors-anywhere.herokuapp.com/https://api-sandbox.direct.yandex.com/json/v5/campaigns", { mode: "no-cors" }, "POST").then(function (data) {
    console.log(data);
    console.log(JSON.parse(data));
});
