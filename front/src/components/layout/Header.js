import React from "react";

const Header = () => {
  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="./images/logo.png" alt="logo de la tienda" />
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Qué producto busca?"
            />
            <div className="input-group-append">
              <button id="search-btn" className="btn">
                <i className="fa fa-search-plus fa-2x text-white" aria-hidden></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn btn-warning" id="login-btn">
            Inicie Sesión
          </button>
          <span id="cart" className="fa fa-cart-plus fa-2x" aria-hidden="true">
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;
