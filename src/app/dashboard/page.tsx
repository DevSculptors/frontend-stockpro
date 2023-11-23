"use client";
import BarChartBox from "../components/Charts/BarChartBox/BarChartBox";
import BigChartBox from "../components/Charts/BigChartBox/BigChartBox";
import ChartBox from "../components/Charts/ChartBox/ChartBox";
import PieChartBox from "../components/Charts/PieChartBox/PieChartBox";
import TopBox from "../components/Charts/TopBox/TopBox";
import ClientBox from "../components/Charts/ClientBox/ClientBox";

import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";

import { useState } from "react";
import {
  reportByTopClientAPI,
  reportByTopCategoriesAPI,
  reportTotalSalesAPI,
  reportTotalProductsWeekAPI,
  reportTotalRevenueAPI,
  reportMostClientAPI,
} from "@/api/Reports";

import { chartBoxUser, bigChart } from "@/api/dataTest";

import { formatPrice } from "@/helpers/Utils";

import styles from "./style.module.scss";

function Dashboard() {
  const [reportSales, setReportSales] = useState<any>({
    title: "Ventas por Día ",
    color: "#FF8042",
    dataKey: "ventas",
    chartData: [],
  });

  const [reportTopClient, setReportTopClient] = useState<any>({
    title: "Top 7 Clientes con mas Compras",
    dataKey: "sales",
    chartData: [],
  });

  const [reportTopCategories, setReportTopCategories] = useState<any>({
    tittle: "Top 5 Categorias mas Vendidas",
    chartData: [],
  });

  const [totalSales, setTotalSales] = useState<any>({
    color: "gold",
    title: "Ventas totales de la semana",
    dataKey: "ventas",
    chartData: [],
  });

  const [totalProducts, setTotalProducts] = useState<any>({
    color: "skyblue",
    title: "Productos Vendidos en la semana",
    dataKey: "productos",
    chartData: [],
  });

  const [totalRevenue, setTotalRevenue] = useState<any>({
    color: "teal",
    title: "Ingresos Totales de la semana",
    dataKey: "ingreso",
    chartData: [],
  });

  const [revenueForDay, setRevenueForDay] = useState<any>({
    title: "Ingresos por Día",
    color: "#8884d8",
    dataKey: "ingresos",
    chartData: [],
  });

  const [chartBoxClientes, setChartBoxClients] = useState<any>({
    title: "Clientes Registrados",
    color: "#0088FE",
    dataKey: "clientes",
  });

  const { isLoading: isMostClient } = useQuery(
    ["reportMostClient"],
    reportMostClientAPI,
    {
      onSuccess: (data) => {
        setChartBoxClients({
          ...chartBoxClientes,
          number: data.totalRegisteredClients,
          text: data.client.name + " " + data.client.last_name,
        });
      },
    }
  );

  console.log(chartBoxClientes);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  function transformCategories(originalData: any[]) {
    return originalData.map((item: any, index: number) => ({
      name: item.category,
      value: item.amount,
      color: colors[index],
    }));
  }

  const { isLoading: isCategories } = useQuery(
    ["reportTopCategories"],
    reportByTopCategoriesAPI,
    {
      onSuccess: (data) => {
        setReportTopCategories({
          ...reportTopCategories,
          chartData: transformCategories(data),
        });
      },
    }
  );

  interface DayMappings {
    [key: string]: string;
  }

  interface DaySales {
    name: string;
    [key: string]: string | number | undefined;
  }

  function transformData(
    originalData: any[],
    mappings: DayMappings,
    keyName: string
  ): DaySales[] {
    return originalData.map((item: any) => ({
      name: mappings[item.day],
      [keyName]: item.value,
    }));
  }

  const dayMappings: DayMappings = {
    Sunday: "Dom",
    Monday: "Lun",
    Tuesday: "Mar",
    Wednesday: "Mie",
    Thursday: "Jue",
    Friday: "Vie",
    Saturday: "Sab",
  };

  const dayAcronimos: DayMappings = {
    Sunday: "D",
    Monday: "L",
    Tuesday: "M",
    Wednesday: "M",
    Thursday: "J",
    Friday: "V",
    Saturday: "S",
  };

  const { isLoading: isTotalRevenue } = useQuery(
    ["reportTotalRevenue"],
    reportTotalRevenueAPI,
    {
      onSuccess: (data) => {
        setTotalRevenue({
          ...totalRevenue,
          number: formatPrice(data.total),
          chartData: transformData(data.chartData, dayAcronimos, "ingreso"),
        });
      },
    }
  );

  const { isLoading: totalProducst } = useQuery(
    ["reportTotalProducts"],
    reportTotalProductsWeekAPI,
    {
      onSuccess: (data) => {
        setTotalProducts({
          ...totalProducts,
          number: data.total.total,
          chartData: transformData(
            data.total.chartData,
            dayAcronimos,
            "productos"
          ),
        });
      },
    }
  );

  const { isLoading: isTotalSales } = useQuery(
    ["reportTotalSales"],
    reportTotalSalesAPI,
    {
      onSuccess: (data) => {
        setTotalSales({
          ...totalSales,
          number: data.total,
          chartData: transformData(data.chartData, dayAcronimos, "ventas"),
        });
      },
    }
  );

  const { isLoading: isWeekSale } = useQuery(
    ["reportSale"],
    reportTotalSalesAPI,
    {
      onSuccess: (data) => {
        setReportSales({
          ...reportSales,
          chartData: transformData(data.chartData, dayMappings, "ventas"),
        });
      },
    }
  );

  const { isLoading: isRevenueForDay } = useQuery(
    ["RevenueForDay"],
    reportTotalRevenueAPI,
    {
      onSuccess: (data) => {
        setRevenueForDay({
          ...revenueForDay,
          chartData: transformData(data.chartData, dayMappings, "ingresos"),
        });
      },
    }
  );

  function transformDataTopClients(originalData: any[]) {
    const transformedData = originalData.map((item: any, index: number) => ({
      id: index,
      name: item.person.name + " " + item.person.last_name,
      phone: item.person.phone,
      amount: item.price_sale,
    }));
    const sortedData = transformedData.sort((a, b) => b.amount - a.amount);
    return sortedData.slice(0, 7);
  }

  const { isLoading: topClients } = useQuery(
    ["reportClient"],
    reportByTopClientAPI,
    {
      onSuccess: (data) => {
        setReportTopClient({
          ...reportTopClient,
          chartData: transformDataTopClients(data),
        });
      },
    }
  );

  console.log(reportTopCategories);


  return (
    <div>
      {topClients &&
      isWeekSale &&
      isCategories &&
      isTotalSales &&
      isTotalRevenue &&
      isRevenueForDay &&
      isMostClient &&
      totalProducst ? (
        <div className={styles.loading}>
          <GridLoader color="#1E9189" size={180} />
        </div>
      ) : (
        <div className={styles.home}>
          <div className={styles.box2}>
            <TopBox {...reportTopClient} />
          </div>
          <div className={styles.box}>
            <ClientBox {...chartBoxClientes} />
          </div>
          <div className={styles.box}>
            <ChartBox {...totalProducts} />
          </div>
          <div className={styles.box4}>
            <PieChartBox {...reportTopCategories} />
          </div>
          <div className={styles.box}>
            <ChartBox {...totalRevenue} />
          </div>
          <div className={styles.box}>
            <ChartBox {...totalSales} />
          </div>
          <div className={styles.box7}>
            <BigChartBox {...bigChart} />
          </div>
          <div className={styles.box}>
            <BarChartBox {...reportSales} />
          </div>
          <div className={styles.box}>
            <BarChartBox {...revenueForDay} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
