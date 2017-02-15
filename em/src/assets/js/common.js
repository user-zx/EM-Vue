export default {

    post(_http, url,params, successFun, errorFun) {
        _http.post(url,params).then((res) => {
            successFun(res)
        }).then((err) => {
            errorFun(err)
        })
    },
}



