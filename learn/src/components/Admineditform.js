import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
// import React from 'react';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import toast from 'react-hot-toast';


const Admineditform = () => {

    const navigate = useNavigate()

    const [pname, setPName] = useState("")
    const [pdesc, setDesc] = useState("")
    const [pamount, setPAmount] = useState("")
    const [pqty, setPQty] = useState("")
    const [pstatus, setPStatus] = useState("")
    const [pimg, setPImg] = useState("")
    const [message, setMessage] = useState("")
     const [editImage , setEditImage] = useState(false);

     const {id }= useParams()


     useEffect(()=>{
        fetch(`/api/singleproductupdate/${id}`).then((res)=>{return res.json()}).then((data)=>{
            console.log(data)
    
            if(data.status==200){
                setPName(data.apiData.PName)
                setDesc(data.apiData.PDesc)
                setPAmount(data.apiData.PPrice)
                setPQty(data.apiData.PQty)
                setPImg(data.apiData.PImg )
                setPStatus(data.apiData.PStatus)
              
            }else{
                setMessage(data.message)
    
             
            }
            
        })
    },[])


    //-------------------------------------------------------------------------
    function handleupdateform(e){
        e.preventDefault()
    
        let Data1 = new FormData()
    
            if(editImage){
                Data1.append("pname", pname)
                Data1.append("pdesc", pdesc)
                Data1.append("pamount", pamount)
                Data1.append("pqty", pqty)
                Data1.append("pstatus", pstatus)
                  Data1.append("pimg", pimg);
                  fetch(`/api/adminupdateImage/${id}`,{
                    method : "PUT",
                    body : Data1
                }).then((res)=>{return res.json()}).then((data)=>{
                    console.log(data)
                    if(data.status===200){
                      setMessage(data.message)
                       navigate("/Dashboard")
                   }else{
                      setMessage(data.message)
                   }
                })
            }else{
              const data = {
                     pname: pname,
                     pdesc: pdesc,
                     pamount: pamount,
                     pqty: pqty,
                     pstatus: pstatus
                 }
                

 //------------------------------------------------------------------
             
     
             fetch(`/api/adminupdate/${id}`, {
                 method: "PUT",
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(data)
             })
         .then((res)=>{return res.json()}).then((data)=>{
             console.log(data)
          if(data.status===200){
             setMessage(data.message)
              navigate("/Dashboard")
          }else{
             setMessage(data.message)
          }
         })
         }
       }

 //--------------------------------------------------------------------


  return (
    <div className='container-fluid' style={{height:'69vh' , paddingTop:'10px'}}>
    <div className='row'>
      <div className='col-md-2' id="sidebar"> 
        <Link to="/Dashboard"><h6 id="adminbutton">Dashboard</h6></Link>
      </div>
      <div className='col-md-10'  id="adminbutton">
      <h3 id="admininsertForm"> Admin Update Form</h3>

      <form className='col-md-8 mx-auto' id="admininsertformcolor"  onSubmit={(e)=>{handleupdateform(e)}}>

      <MDBInput label="Product Name" id="form1" type="text" className="form-control mt-2" value={pname} onChange={(e)=>{setPName(e.target.value)}} required />
      <MDBInput label="Product Description" id="form1" type="text" className="form-control mt-2" value={pdesc} onChange={(e)=>{setDesc(e.target.value)}} required />
      <MDBInput label="Product Quantity" id="form1" type="number" className="form-control mt-2"  value={pqty} onChange={(e)=>{setPQty(e.target.value)}} required />
      <MDBInput label="Product Price" id="form1" type="number" className="form-control mt-2" value={pamount} onChange={(e)=>{setPAmount(e.target.value)}}  required/>
     

      {/* <MDBInput id="form1" type="file" className="form-control mt-2"  onChange={(e) => { setPImg(e.target.files[0]) }}  /> */}
      <select className='form-select mt-2' aria-placeholder = "Product Status" value={pstatus} onChange={(e)=>{setPStatus(e.target.value)}} required id="stock" >
    
        <option value='OUT-STOCK'>Out-stock</option>
        <option value= 'IN-STOCK'>In-stock</option>
       
        </select>

        {editImage ? <div>
              <input type="file" className='form-control' onChange={(e) => { setPImg(e.target.files[0]) }} required />
            </div> : (
              <div>
                <img src={`http://localhost:5000/upload/${pimg}`} id="editImage" className='me-4 mt-2'  />
                <i  onClick={()=>{setEditImage(true)}}> Edit Image</i>
              </div>
            )}

      <MDBBtn className=' form-control mt-2' color='success' > Edit Product</MDBBtn>
      
      </form>
      </div>
    </div>
  </div>
  )
}

export default Admineditform