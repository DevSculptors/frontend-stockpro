import React from "react";
import Image from "next/image";

import styles from "./style.module.scss";

function page() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Manual de Cajero</h1>
        <p className={styles.description}>
          Manual de un Cajero de la Aplicación StockPro 1.0
        </p>
      </header>
      <main id="page-content" className={styles.section_wrap}>
        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>
              Funcionalidades Principales de un Cajero
            </h1>
            <h4>
              En este apartado se explicarán las funcionalidades principales de
              la aplicación, las cuales son
            </h4>
            <ul>
              <li>Generar Ventas</li>
              <li>Abrir y cerrar caja</li>
              <li>Revisar Productos</li>
              <li>Generar retiros de caja</li>
            </ul>
          </div>
          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/h_p2BEWJBiY"
              title="General Cajero"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>

        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Generar Venta</h1>
            <p>
              En este apartado se explica como se genera la Venta de uno o
              varios productos, en donde se busca por el nombre del producto o
              codigo de barras, se selecciona la cantidad y se agrega al carrito
              de compras, luego se procede a generar la venta, Si el cliente
              pide factura se le puede generar si no la venta se guarda en el
              sistema.
            </p>
          </div>

          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/aGzm1ywKIzg"
              title="Cajero Ventas"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>
        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Revisar Productos </h1>
            <p>
              En esta parte el cajeor puede revisar los porductos que se
              encuentran actualmente en el inventario, para ello debe ir a la
              sección de productos y seleccionar la opción de revisar productos,
              en donde se le mostrará una lista de los productos que se
              encuentran en el inventario, en donde se puede buscar por nombre o
              código de barras, además se puede filtrar por categoría, marca o
              proveedor, y por último se puede ordenar por nombre, precio o
              cantidad.
            </p>
          </div>

          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/QCIr81PWDNw"
              title="Cajero Productos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>
        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Realizar Retiro y Cerrar Caja </h1>
            <p>
              En esta parte el cajero puede realizar retiros de caja, para ello debe ir a la opcion de retiro, y proporciona el valor que desea sacar, pero esta no debe exceder lo que hay en la caja, por ulitmo para cerrar sesion se ingresa el valor que hay en la caja y se le pide al administrador que ingrese sus credenciales para hacer el cierre de caja efectivo.
            </p>
          </div>

          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/VKrh60GGSC0"
              title="Retiro y Cierre de Caja"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>
      </main>
    </div>
  );
}

export default page;
