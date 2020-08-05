const ApiUrl = {
  develop: 'http://localhost:8099/',
  onLine: 'https://luoch.cn/'
}

let baseUrl = ApiUrl.develop
export const login = baseUrl + "bills/user/login"//登录接口
//export const getUser = baseUrl + "lampApp/v1/getUser"//获取登录用户的个人信息

export const getUserBillsTypeList = baseUrl + "bills/user/getUserBillsTypeList"//获取用户账单类型
export const addUserBillsType = baseUrl + "bills/user/addUserBillsType"//添加用户账单类型
export const delBillsType = baseUrl + "bills/user/delBillsType"//删除用户账单类型


