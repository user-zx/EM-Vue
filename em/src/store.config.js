export default{
	state:{
		expenseModel:{
			status:"",
		},
		selectDate:{
			startDate:"",
			endDate:"",
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
	}
}

//