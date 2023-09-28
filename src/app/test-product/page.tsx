"use client";
import React, { useState, useEffect, useContext } from "react";
import Images from "./Images";
import { Catalog } from "../../components/Catalog";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsAPI } from "@/api/Products";
import { ProductContext } from "@/context/ProductContext";
import { Product } from "@/interfaces/Product";

function Test() {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      // const res = await fetch("https://jsonplaceholder.typicode.com/photos");
      const res = await fetch('https://jsonplaceholder.typicode.com/album/1/photos')
      const data = await res.json();
      setImage(data);
    };
    fetchImage();
  }, []);

  return (
    <div>
      <Images items={image} />
    </div>
  );
}

export default Test;
