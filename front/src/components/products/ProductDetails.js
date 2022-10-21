import React from 'react'
import MetaData from '../layout/MetaData'

export const ProductDetails = () => {
  return (
      <>
          <MetaData title='Agility alimento para perro'></MetaData>
          <div className='row d-flex justify-content-around'>
              <div className='col-12 col-lg-5 img-fluid' id='imagen_producto'>
                  <img src='../../images/productos/agility.jpg' alt='imagen agility' height='450' width='450'/>
              </div>

              <div className='col-12 col-lg-5 mt-5'>
                  <h3>Alimento Agility para perros</h3>
                  <p id='product_id'>Product #3343242345</p>
              </div>
          </div>
      </>
  )
}
