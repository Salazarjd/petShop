import React, { useEffect } from 'react'
import MetaData from './layout/MetaData';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';

export const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

  return (
      <>
          <MetaData title='Lo mejor para tu compañero'></MetaData>
          <h1 id="encabezado_productos">Ultimos productos</h1>

          <section id="productos" className='container mt-5'>
              <div className='row'>
                  {/* producto 1 */}
                  <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                      <div className='card p-3 rounded'>
                          <img className='card-img-top mx-auto' src='./images/rojo.jpg' alt='imagen roja' />
                          <div className='card-body d-flex flex-column'>
                              <h5 id='titulo_producto'><a href='http://localhost:3000/'>Nutra red</a></h5>
                              <div className='rating mt-auto'>
                                  <div className='rating-outer'>
                                      <div className='rating-inner'></div>
                                  </div>
                                  <span id='no_de_opiniones'>5 reviews</span>
                              </div>
                              <p className='card-text'>$72.000</p><a href='http://localhost:3000/'id='view_btn' className='btn btn-block'>Ver detalle</a>
                          </div>
                      </div>
                  </div>

                  {/* producto 2 */}
                  <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                      <div className='card p-3 rounded'>
                          <img className='card-img-top mx-auto' src='./images/verde.jpg' alt='imagen verde' />
                          <div className='card-body d-flex flex-column'>
                              <h5 id='titulo_producto'><a href='http://localhost:3000/'>Nutra Verde</a></h5>
                              <div className='rating mt-auto'>
                                  <div className='rating-outer'>
                                      <div className='rating-inner'></div>
                                  </div>
                                  <span id='no_de_opiniones'>5 reviews</span>
                              </div>
                              <p className='card-text'>$82.000</p><a href='http://localhost:3000/'id='view_btn' className='btn btn-block'>Ver detalle</a>
                          </div>
                      </div>
                  </div>

                  {/* producto 3 */}
                  <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                      <div className='card p-3 rounded'>
                          <img className='card-img-top mx-auto' src='./images/azul.jpg' alt='imagen azul' />
                          <div className='card-body d-flex flex-column'>
                              <h5 id='titulo_producto'><a href='http://localhost:3000/'>Nutra Azul</a></h5>
                              <div className='rating mt-auto'>
                                  <div className='rating-outer'>
                                      <div className='rating-inner'></div>
                                  </div>
                                  <span id='no_de_opiniones'>5 reviews</span>
                              </div>
                              <p className='card-text'>$66.000</p><a href='http://localhost:3000/'id='view_btn' className='btn btn-block'>Ver detalle</a>
                          </div>
                      </div>
                  </div>

                  {/* producto 4 */}
                  <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
                      <div className='card p-3 rounded'>
                          <img className='card-img-top mx-auto' src='./images/gris.jpg' alt='imagen gris' />
                          <div className='card-body d-flex flex-column'>
                              <h5 id='titulo_producto'><a href='http://localhost:3000/'>Nutra gris</a></h5>
                              <div className='rating mt-auto'>
                                  <div className='rating-outer'>
                                      <div className='rating-inner'></div>
                                  </div>
                                  <span id='no_de_opiniones'>5 reviews</span>
                              </div>
                              <p className='card-text'>$90.000</p><a href='http://localhost:3000/' id='view_btn' className='btn btn-block'>Ver detalle</a>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </>
  )
}
