import React from "react";
import Image from "next/image";

import styles from "./style.module.scss";

function page() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Manual de Administrado</h1>
        <p className={styles.description}>
          Manual de Usuario de la Aplicación StockPro 1.0
        </p>
      </header>
      <main id="page-content" className={styles.section_wrap}>
        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>
              Funcionalidades Principales de la Aplicación
            </h1>
            <h4>
              En este apartado se explicarán las funcionalidades principales de
              la aplicación, las cuales son
            </h4>
            <ul>
              <li>Gestión de Ventas</li>
              <li>Gestión de Compras</li>
              <li>Gestión de Usuarios</li>
              <li>Gestión de Clientes</li>
              <li>Gestión de Inventarios</li>
            </ul>
          </div>
          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/7sJed-TBbh8"
              title="video General de StockPro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>

        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Administrar el Dashboard</h1>
            <p>
              En este apartado se explica como administrar el dashboard de la
              aplicacion y la explicacion de los principales reportes que se
              entregan en el dashboard
            </p>
          </div>

          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/44ldbxlj8JA"
              title="Dashboard y perfil"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>
        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Gestion de Usuarios</h1>
            <p>
              En esta parte se realiza la explicacion de como gestionar los
              usuarios de la aplicacion, como crearlos, modificarlos y ponerlos
              en estado inactivo, ademas se muestran los 2 tipos de usuarios que
              tenemos en la aplicacion (Administrador y Cajero)
            </p>
          </div>

          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/eisKXx28hY4"
              title="Usuarios"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>
        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>
              Gestion de Clientes, Categorias y Marcas
            </h1>
            <p>
              En esta parte se realiza la explicacion de como gestionar los
              clientes, categorias y marcas de la aplicacion, como crearlos,
              modificarlos y ponerlos en estado inactivo, ademas se muestran las
              principales funciones que se pueden realizar con estos elementos
              de la aplicacion.
            </p>
          </div>

          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/Sz9Loz9wNiA"
              title="Clientes,Marcas y Categorias"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>

        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Gestion de Inventario</h1>
            <p>
              Es este apartado veremos la gestion de Inventarios, en donde se
              encuentran todos los productos que estan registrados en la
              aplicacion ademas de eso se podra agregar, modificar y desactivar
              un producto ademas de eso se podra realizar una busqueda de un
              producto por su nombre o por su codigo de barras
            </p>
          </div>
          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/a5Dmnzygb2Q"
              title="Inventario"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>

        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Gestion de Compras</h1>
            <p>
              En este apartado se muestra como se realiza una compra, los
              detalles de esa compra, y el total de compras que se han hecho
              ademas de la fecha de la compra y el proveedor que realizo la
              compra.
            </p>
          </div>
          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/_qWQQt3-9fE"
              title="Gestion de Compras"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>

        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>
              Gestion de Ventas y Registradoras
            </h1>
            <p>
              En esta parte se realiza la explicacion de como gestionar las
              ventas y las registradoras de la aplicacion, como crearlas,
              modificarlas en la parte de registradoras y cuantas ventas se han
              realizado en la aplicacion, ademas se muestran las principales
              funciones que se pueden realizar con estos elementos de la
              aplicacion. Tambien se muestran los turnos que se registran en las
              cajas, y base la fecha de abrir la caja y cerrar la caja y la
              cantidad de ventas que se realizaron en ese turno.
            </p>
          </div>
          <figure className={styles.image_wrap}>
            <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/WbSquAu2gkc"
              title="Ventas y Registradoras"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </figure>
        </article>
      </main>
    </div>
  );
}

export default page;
