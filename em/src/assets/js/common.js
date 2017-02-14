export default {

    post(_http, url, successFun, errorFun) {
        _http.post(url).then((res) => {
            successFun(res)
        }).then((err) => {
            errorFun(err)
        })
    },
}



