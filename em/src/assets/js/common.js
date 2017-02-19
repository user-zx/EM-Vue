export default {

    post(_http, url,params, successFun, errorFun) {
        _http.post(url,params).then((res) => {
            successFun(res)
        },(err) => {
            errorFun(err)
        });
    }, 
    autoHeight(name){
    	let height =  $(name).height();
    	//console.log(height);
    	let clientHeight = $(window).height();
    	//console.log(clientHeight);
        
    }
}



