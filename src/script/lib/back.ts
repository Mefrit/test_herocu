function flattenObj(x, path: Array<string> = []) {
    const result: Array<any> = [];
    Object.keys(x).forEach((key) => {
        if (!x.hasOwnProperty(key)) {
            return;
        }
        const newPath = path.slice();
        newPath.push(key);
        let vals: Array<any> = [];
        if (typeof x[key] === "object" && x[key] != null) {
            vals = flattenObj(x[key], newPath);
        } else {
            vals.push({ path: newPath, val: x[key] });
        }
        vals.forEach((obj) => {
            return result.push(obj);
        });
    });

    return result;
} // flattenObj
function getPath(path) {
    if (path.length === 1) {
        return path[0];
    } else {
        const first = path[0];
        const rest = path.slice(1);
        return first + "[" + rest.join("][") + "]";
    }
} // p
function toQueryString(obj, urlEncode) {
    // start with  flattening `obj`
    const parts = flattenObj(obj); // [ { path: [ ...parts ], val: ... }, ... ]

    // join the parts to a query-string url-component
    const queryString = parts
        .map((varInfo) => {
            return getPath(varInfo.path) + "=" + encodeURIComponent(varInfo.val);
        })
        .join("&");

    return queryString;
}
function fetchUrl(url, args = {}, method = "GET") {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        url = url || "";

        const params = toQueryString(args, true);
        const content = method === "POST" ? params : null;
        const _url = method === "GET" ? params : "";
        http.withCredentials = true;
        http.open(method, url + (url.indexOf("?") >= 0 ? "&" : "?") + _url, true);

        http.withCredentials = true;
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        const json = JSON.parse(this.responseText);
                        if (json.result == "fail") {
                            console.log("fail");
                        }
                    } catch (e) {
                        // FIXME: Вывести сообщение об ошибке в notify
                        // Возможно запрашивали текст поэтому НЕ делаем reject
                        // reject(e);
                    }

                    resolve.call(this, this.responseText);
                } else {
                    reject(this.statusText);
                }
            }
        };

        http.send(content);
    });
}
fetchUrl(
    "https://cors-anywhere.herokuapp.com/https://api-sandbox.direct.yandex.com/json/v5/campaigns",
    { mode: "no-cors" },
    "POST"
).then((data: any) => {
    console.log(data);
    console.log(JSON.parse(data));
});
