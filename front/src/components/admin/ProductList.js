import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import {MDBDataTable} from 'mdbreact'

const ProductList = () => {

    const { loading, productos, error } = useSelector(state => state.products);
    const alert = useAlert();

    const dispatch = useDispatch();
    useEffect(() => {

        if(error){
            return alert.error(error);
        }

        dispatch(getProducts());
    }, [dispatch])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "Nombre",
                    field: "nombre",
                    sort: "asc"
                },
                {
                    label: "Precio",
                    field: "precio",
                    sort: "asc"
                },
                {
                    label: "Inventario",
                    field: "inventario",
                    sort: "asc"
                },
                {
                    label: "Vendedor",
                    field: "vendedor",
                    sort: "asc"
                }
            ],
            rows: []
        }

        productos.forEach(producto => {
            data.rows.push({
                nombre: producto.nombre,
                precio: `$${producto.precio}`,
                inventario: producto.inventario,
                vendedor: producto.vendedor
            })
        })
        return data;
    }

  return (
      <>
          <MetaData title={'Todos los productos'} />
          <div className='row'>
              <div className='col-12 col-md-2'>
                  <Sidebar/>
              </div>
              <div className='col-12 col-md-10'>
                  <>
                      <h1 className='my-5'>Productos registrados</h1>
                      {loading ? <h1>Cargando...</h1> : (
                          <MDBDataTable
                              data={setProducts()}
                              className='px-3'
                              bordered striped hover
                          />
                          
                      )}
                  </>
              </div>
          </div>
      </>
  )
}

export default ProductList