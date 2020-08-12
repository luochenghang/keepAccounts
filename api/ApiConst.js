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


export const getWeekOrDays = baseUrl + "bills/bills/getWeekOrDays"//根据周月年 或者对应下面的日期数
export const getChartsData = baseUrl + "bills/bills/getChartsData"//根据周月年 获得图表数据
export const getChartsDataDetail = baseUrl + "bills/bills/getChartsDataDetail"//根据周月年 获得收入排行榜数据
export const getBillsByRemakeAndTypeId = baseUrl + "bills/bills/getBillsByRemakeAndTypeId"//根据周月年以及排行榜中某一列的remake和类型id获得数据


export const exportData = baseUrl + "bills/user/exportData"//导出数据
export const getUserFilesList = baseUrl + "bills/user/getUserFilesList"//查询导出数据

export const getUseHelp = baseUrl + "bills/help/getUseHelp"//查询使用帮助






