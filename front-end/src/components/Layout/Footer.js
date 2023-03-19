import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.container}>
      <div className={classes.footer}>
        <div className={classes.items}>
          <div className={classes.brand}>
            <h2> SHOPPY-Games </h2>
            <p>
              SHOPPY-Games est la premiere marketplace au Maroc pour les gamers
              products - Achetez et vendez ou échanger vos jeux vidéo favoris .
            </p>
            <div className={classes.carS}>
              <div className={classes.cartItem}>
                <i class="fas fa-map-marker-alt"></i>
                SALE , RABAT - 1000 - Morocco
              </div>
              <div className={classes.cartItem}>
                <i class="fas fa-solid fa-at"></i>
                shoppygames88@gmail.com
              </div>
              <div className={classes.cartItem}>
                <i class="fas fa-phone"></i> +212691752429
              </div>
            </div>
            <div>
              <p> All Copyright &copy; 2022</p>
            </div>
          </div>
          <div className={classes.social}>
            <h5> Social Media : </h5>
            <span className={classes.fontAwesome}>
              <span>
                <a href="https://www.facebook.com/Shoppy-games-107072555408340">
                  <i class="fab fa-facebook fa-2x"></i>
                </a>
              </span>
              <span>
                <a href="https://www.instagram.com/shooopygames/">
                  <i class="fab fa-instagram fa-2x"></i>
                </a>
              </span>
              <span></span>
            </span>
          </div>
          <div className={classes.payment}>
            <h4> Strip Payment </h4>
            <h4> Cash On Delivery </h4>
            <ul className={classes.category}>
              <li className={classes.images}>
                <img src="/images/master.png" alt="" />
              </li>
              <li className={classes.images}>
                <img src="/images/visa.png" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
