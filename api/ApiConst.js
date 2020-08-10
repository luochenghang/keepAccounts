const ApiUrl = {
  develop: 'http://localhost:8099/',
  onLine: 'https://luoch.cn/'
}

let baseUrl = ApiUrl.develop
export const login = baseUrl + "bills/user/login"//登录接口
export const CountStatistics = baseUrl + "bills/user/CountStatistics"//获取登录用户的个人信息

export const getUserBillsTypeList = baseUrl + "bills/type/getUserBillsTypeList"//获取用户账单类型
export const addUserBillsType = baseUrl + "bills/type/addUserBillsType"//添加用户账单类型
export const delBillsType = baseUrl + "bills/type/delBillsType"//删除用户账单类型

export const getSystemBillsTypeList = baseUrl + "bills/type/getSystemBillsTypeList"//获取系统账单类型




export const editBills = baseUrl + "bills/bills/editBills"//编辑账单
export const getBills = baseUrl + "bills/bills/getBills"//获取账单
export const addBills = baseUrl + "bills/bills/addBills"//添加账单
export const delBills = baseUrl + "bills/bills/delBills"//删除账单
export const getBillsList = baseUrl + "bills/bills/getBillsList"//根据时间获取账单


