import axios from './config';

export const reportByWeekSaleAPI = async () => {
  const response = await axios.get('/sales/reportByWeek');
  return response.data;
};

export const reportByTopClientAPI = async () => {
  const response = await axios.get('/sales/topSales?top=7');
  return response.data;
}

export const reportByTopCategoriesAPI = async () => {
  const response = await axios.get('/sales/topCategories?top=5');
  return response.data;
}

export const reportTotalSalesAPI= async () => {
  const response = await axios.get('/sales/totalSales');
  return response.data;
}

export const reportTotalProductsWeekAPI= async () => {
  const response = await axios.get('/sales/totalProducts');
  return response.data;
}

export const reportTotalRevenueAPI= async () => {
  const response = await axios.get('/sales/totalRevenue');
  return response.data;
}

export const reportMostClientAPI= async () => {
  const response = await axios.get('/sales/totalClients');
  return response.data;
}

export const reportTopCategoriesByWeekAPI= async () => {
  const response = await axios.get('/sales/topCategoriesByWeek');
  return response.data;
}

