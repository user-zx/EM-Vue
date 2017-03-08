export default{
	state:{
		expenseModel:{
			status:"",
		}
	},
	mutations:{
		setExpenseModelStatus(state,param){
			state.expenseModel.status = param
		},
	}
}

//