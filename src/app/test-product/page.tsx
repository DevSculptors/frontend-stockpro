'use client'
import React, {useState,useEffect,useContext} from 'react'
import Images from './Images'
import {Catalog} from "../../components/Catalog";
import { useQuery } from "@tanstack/react-query";
import {getAllProductsAPI} from "@/api/Products";
import { ProductContext } from "@/context/ProductContext";
import { Product } from "@/interfaces/Product";


function Test() {

  /**const [image,setImage] = useState([])
  
  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/photos')
      //const res = await fetch('https://jsonplaceholder.typicode.com/album/1/photos')
      const data = await res.json()
      setImage(data)
    }
    fetchImage()
  }, [])*/

  const { setSelectedProduct, setProducts, products } = useContext(ProductContext);

    const { data, isLoading } = useQuery(["products"], getAllProductsAPI, {
      onSuccess: (data) => {
          setProducts(data);
      },
  });
    const handleClick = (id: string) => {
        const product = data?.find((product) => product.id === id);
        if (product) {
            setSelectedProduct(product);
        }
        /**if (setId) {
            setOpen(true);
            setId("editBrand");
        }*/
    };

  
  return (
      /**<div>
        <Images items={image} pagination={4}/>
      </div>*/
      <Catalog name="Lista Productos">
          {data?.map((product: Product) => (
              <Catalog.Card
                  key={product.id}
                  name={product.name_product}
                  description={product.description}
                  units={product.stock + product.measure_unit}
                  price={product.sale_price}
                  category={product.category.name}
                  brand={product.brand.name}
                  handleRow={() => handleClick(product.id)}
              />
          ))}
      </Catalog>
  )
}

export default Test