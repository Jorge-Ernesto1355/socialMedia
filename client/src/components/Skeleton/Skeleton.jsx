import React from "react";
import "./Skeleton.css";

export default function Skeleton({ type }) {
  const COUNTER = 8;
  const FeedSkeleton = () => (
    <div className="postSk">
      <div className="headSk">
        <div className="userSk">
          <div className="profile-photoSK">
            <div className="imgSk"></div>
          </div>
          <div className="infoSK">
            <div className="usernameSK"></div>
            <div className="smallSK"></div>
          </div>
        </div>
        <span className="editSK">
          <div className="EllipsiSK"></div>
        </span>
      </div>
      <div className="photoSK">
        <div className="imageSK"></div>
      </div>
      <div className="action-butonSK">
        <div className="interacions-buttonsSK">
          <span className="icon"></span>
          <span className="icon"></span>
          <span className="icon"></span>
        </div>
        <div className="icon bookMarkSK">
          <span></span>
        </div>
      </div>
      <div className="liked-bySK">
        <p className="LikesSK"></p>
      </div>
      <div className="captionSK">
        <p className="textSK"></p>
        <div className="div"></div>
      </div>
    </div>
  );

  const ProfileLeft = () => {
    <div>
      <div className="detalles">
        <h3>Detalles</h3>
        <div className="card">
          <div className="ubicacion">
            <div className="icons">
              <h5>Vive en Mochicahui, Sinaloa, Mexico</h5>
            </div>
            <div className="icons">
              <h5>De Mochicahui, Sinaloa, Mexico</h5>
            </div>
            <div className="icons">
              <h5>Soltero</h5>
            </div>
            <div className="buttons">
              <button className="edit">
                <h5>Editar detalles</h5>
              </button>
              <button className="edit">
                <h5>Agregar pasatiempos</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fotos">
        <div className="">
          <div className="head">
            <h3>Fotos</h3>
            <h5>Ver todas las fotos</h5>
          </div>
          <div className="body">
            <div className="fotoImg"></div>
          </div>
        </div>
      </div>
      <div className="amigos">
        <div className="head">
          <div className="info">
            <h4>Amigos</h4>
            <span className="text-muted">{} amigos</span>
          </div>
          <span>ver todos los amigos</span>
        </div>

        <div className="body">
          <div className="amigos-profile">
            <div className="foto">
              <img alt="" />
              <span></span>
            </div>{" "}
            <div className="foto">
              <img alt="" />
              <span></span>
            </div>{" "}
            <div className="foto">
              <img alt="" />
              <span></span>
            </div>{" "}
            <div className="foto">
              <img alt="" />
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>;
  };

  const TopSkeleton = () => (
    <div className="topSk">
      <div className="topSkIcon"></div>
      <div className="topSkIcon"></div>
      <div className="topSkIcon"></div>
      <div className="topSkImg"></div>
    </div>
  );

  const MenuSkeleton = () => (
    <div className="menuSk">
      <div className="menuSkItem"></div>
      <div className="menuSkItem"></div>
      <div className="menuSkItem"></div>
      <div className="menuSkItem"></div>
    </div>
  );

  const Circle = () => <div className="circle"></div>;

  const CustomLoading = () => (
    <div className="custom">
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      <span className="customText">Loading...</span>
    </div>
  );
  if (type === "left") return <ProfileLeft />;
  if (type === "feed") return Array(COUNTER).fill(<FeedSkeleton />);
  if (type === "top") return <TopSkeleton />;
  if (type === "menu") return <MenuSkeleton />;
  if (type === "circle") return <Circle />;
  if (type === "custom") return <CustomLoading />;
}
