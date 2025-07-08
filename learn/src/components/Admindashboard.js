import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Admindashboard = () => {

  const navigate = useNavigate()

  const [product, setProduct] = useState([])
  const [message, setMessage] = useState("")

  const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://food-order-hgga.onrender.com'
    : '';

  useEffect(() => {
    fetch(`${BASE_URL}/api/adminshowdetails`).then((res) => { return res.json() }).then((data) => {
      console.log(data)
      if (data.status === 200) {
        setProduct(data.apiData)
      } else {

      }
    })
  }, [])


  function handleremove(e, id) {
    fetch(`${BASE_URL}/api/admindeleteproduct/${id}`, {
      method: "DELETE"
    }).then((res) => { return res.json() }).then((data) => {
      console.log(data)
      if (data.status === 200) {
        toast.success(data.message)
        setMessage(data.message)
        navigate('/Dashboard')
      } else {
        toast.error(data.message)
        setMessage(data.message)
      }
    })
  }

  return (
    <div className='container-fluid' style={{ minHeight: '80vh' }} >
      <div className='row' style={{ marginTop: '20px' }}>
        <div className='col-md-2' id="sidebar">
          <Link to="/AdminInsertForm"><h6 id="adminbutton">Admin Add Form</h6></Link>
        </div>
        <div className='col-md-10' id="adminbutton">
          <table className='table table-hover'>
            <thead>
              <tr>
                <th> Product Food Image</th>
                <th>Food Name</th>
                <th>Food Description</th>
                <th>Food Quantity</th>
                <th>Food Amount</th>
                <th>Food Status</th>
                <th>Update Food</th>
                <th>Delete Food</th>

              </tr>
            </thead>



            <tbody>
              {
                product.map((item, key) => (

                  <tr className='foodlist'>
                    <td><img src={item.PImg} alt={item.PName} id="myimg" /></td>
                    <td>{item.PName}</td>
                    <td id="Pdesc">{item.PDesc}</td>
                    <td>{item.PQty}</td>
                    <td>{item.PPrice}</td>
                    <td>{item.PStatus}</td>
                    <td><Link to={`/adminproductupdate/${item._id}`}><button className='btn btn-primary' ><i class="bi bi-pencil-fill"></i></button></Link></td>
                    <td><Link to={`/adminproductremove/${item._id}`}><button className='btn btn-danger' onClick={(e) => { handleremove(e, item._id) }}><i class="bi bi-trash3-fill"></i></button></Link></td>

                  </tr>
                ))
              }



            </tbody>



          </table>
        </div>
      </div>
    </div>
  )
}

export default Admindashboard