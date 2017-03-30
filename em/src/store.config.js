export default{
	state:{
		expenseModel:{
			status:"",
		},
		selectDate:{
			startDate:"",
			endDate:"",
		},
		usernumber:{
			data:"",
		},
		applyData:{
			data:"",
		}
	},
	mutations:{
		setExpenseModelStatus(state,param){
			state.expenseModel.status = param
		},
		changeStartDate(state,date){
			state.selectDate.startDate = date;
		},
		changeEndDate(state,date){
			state.selectDate.endDate = date;
		},
		saveNum(state,num){
			state.usernumber.data = num;
		},
		applyPlay(state,data){
			state.applyData.data = data;
		}
	}
}

//