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
      </main>
    </div>
  );
}

export default page;