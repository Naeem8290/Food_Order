// import React from 'react'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import toast from 'react-hot-toast';

const Admininsertform = () => {

    
  const [pname, setPName] = useState("")
  const [pdesc, setDesc] = useState("")
  const [pamount, setPAmount] = useState("")
  const [pqty, setPQty] = useState("")
  const [pstatus, setPStatus] = useState('OUT-STOCK')
  const [pimg, setPImg] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  function handleinsertform(e){
    e.preventDefault()
    //     console.log(pname , pdesc , pamount , pstatus  ,pqty)
    //   console.log(pimg)

    let Data = new FormData()
    console.log(Data)

    Data.append("pname", pname)
    Data.append("pdesc", pdesc)
    Data.append("pamount", pamount)
    Data.append("pqty", pqty)
    Data.append("pstatus", pstatus)
    Data.append("pimg", pimg)

    fetch("/api/adminproductinsertform", {
      method: "POST",
      body: Data
    }).then((res) => { return res.json() }).then((data) => {
      if (data.status === 201) {
        setMessage(data.message)
        toast.success(data.message)
        navigate("/dashboard")


      } else {
        setMessage(data.message)
        toast.error(data.message)
      }


    })
  }


  return (
    <div className='container-fluid' style={{height:'64vh'}}>
    <div className='row'>
      <diSTOCKv className='col-md-2' id="sidebar">
        <Link to="/Dashboard"><h6 id="adminbutton">Dashboard</h6></Link>
      </diSTOCKv>
      <div className='col-md-10' id="adminbutton">
        <h3 id="admininsertForm"> Admin Insert Form</h3>

        <form className='col-md-8 mx-auto' id="admininsertformcolor" onSubmit={(e) => { handleinsertform(e) }}>

          <MDBInput label="Product Name" id="form1" type="text" className="form-control mt-2" value={pname} onChange={(e) => { setPName(e.target.value) }} required />
          <MDBInput label="Product Description" id="form1" type="text" className="form-control mt-2" value={pdesc} onChange={(e) => { setDesc(e.target.value) }} required maxLength={200} />
          <MDBInput label="Product Quantity" id="form1" type="number" className="form-control mt-2" value={pqty} onChange={(e) => { setPQty(e.target.value) }} required />
          <MDBInput label="Product Price" id="form1" type="number" className="form-control mt-2" value={pamount} onChange={(e) => { setPAmount(e.target.value) }} required />


          <MDBInput id="form1" type="file" className="form-control mt-2" onChange={(e) => { setPImg(e.target.files[0]) }} />
          <select className='form-select mt-2' aria-placeholder = "Product Status" value={pstatus} onChange={(e)=>{setPStatus(e.target.value)}} required id="stock" >
    
        <option value='OUT-STOCK'>Out-stock</option>
        <option value= 'IN-STOCK'>In-stock</option>
       
        </select>


        

          <MDBBtn className=' form-control mt-2' color='success' > Add Product</MDBBtn>

        </form>
      </div>
    </div>
  </div>
  )
}

export default Admininsertform