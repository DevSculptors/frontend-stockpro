import React from "react";
import Image from "next/image";

import styles from "./style.module.scss";

function page() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>User Guide</h1>
        <p className={styles.description}>
          This is a guide for the user of this website
        </p>
      </header>
      <main id="page-content" className={styles.section_wrap}>
        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>
              Mazy cupcakes are thought of simply as multimedia
            </h1>
            <p>
              In recent years, a medicine sees a clam as an untouched crab.
              Nowhere is it disputed that the discovery is a chair. What we know
              for sure is whether or not their front was, in this moment, a
              sideways record.
            </p>
          </div>

          <figure className={styles.image_wrap}>
            <img
              src="https://images.unsplash.com/photo-1570806516998-c4c167ee2f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyODM0MTk1Mg&ixlib=rb-1.2.1&q=80&w=800"
              alt="It's a cupcake and it looks delicious"
            />
          </figure>
        </article>

        <article className={styles.article}>
        <div className={styles.content}>
            <h1 className={styles.headline}>
              Cats could be said to resemble waxing wrinkles
            </h1>
            <p>
              an undeniable fact, really; the obese possibility reveals itself
              as an unpaced search to those who look. In recent years, the
              grimmer command reveals itself as a blurry clipper to those who
              look. This is not to discredit the idea that a journey is a
              stubborn meeting.
            </p>
          </div>

          <figure  className={styles.image_wrap}>
            <img
              src="https://images.unsplash.com/photo-1487300001871-12053913095d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyODM0MjIxNA&ixlib=rb-1.2.1&q=80&w=800"
              alt="Sleeping cat on a comfy looking blanket"
            />
          </figure>
        </article>

        <article className={styles.article}>
          <div className={styles.content}>
            <h1 className={styles.headline}>A pajama is the taurus of a sponge</h1>
            <p>
              We can assume that any instance of an appeal can be construed as a
              paler pink. This is not to discredit the idea that a mist is a
              chinese from the right perspective. However, a detail is a
              representative from the right perspective.
            </p>
          </div>

          <figure  className={styles.image_wrap}>
            <img
              src="https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyODM0MjI0OQ&ixlib=rb-1.2.1&q=80&w=800"
              alt="A dog sitting behind a banana wearing banana pajamas"
            />
          </figure>
        </article>
      </main>
    </div>
  );
}

export default page;
