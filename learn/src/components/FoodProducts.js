
import React, { useContext, useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { contextapi } from '../Contextapi';

const FoodProducts = () => {
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState("")
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [inputtext, setInputtext] = useState("");  // State for login prompt

  const { cart, setCart, loginname, setUser } = useContext(contextapi);
  //   console.log(setUser)

  const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://food-order-hgga.onrender.com'
    : '';

  useEffect(() => {
    fetch(`${BASE_URL}/api/usershowlist`).then((res) => { return res.json() }).then((data) => {
      // console.log(data)
      if (data.status === 200) {
        setProduct(data.apiData);
      } else {
        setMessage(data.message);
      }
    })
  }, [])

  //-----------------------------------------------------------------


  function handlecart(e, productid) {

    // Check if the user is logged in before adding the product to the cart
    if (!loginname) {
      // If the user is not logged in, show the login alert
      setShowLoginAlert(true);
      return;
    }

    let _cart = { ...cart };
    console.log(_cart)

    if (!_cart.items) {
      _cart.items = {};
      // console.log(_cart.items)
    }

    if (!_cart.items[productid]) {
      _cart.items[productid] = 1;
    } else {
      _cart.items[productid] += 1;
    }

    if (!_cart.totalitems) {
      _cart.totalitems = 1;
    } else {
      _cart.totalitems += 1;
    }

    setCart(_cart); // Update the cart context
    console.log(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
  }


  const inputhandler = (e) => {
    setInputtext(e.target.value.toLowerCase());
  };



  //----------------------------------------------------------------


  return (
    <div style={{ minHeight: '64vh' }}>
      <MDBContainer>
        <input id="search"
          type="search"
          className="form-control rounded mt-4 mb-4"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={inputhandler}
          value={inputtext}
        />
      </MDBContainer>
      <MDBContainer>
        <MDBRow >
          {product
            .filter((el) => el.PName.toLowerCase().includes(inputtext))
            .map((product, key) => (
              <MDBCol size='md-4' >
                <MDBCard className='mb-4' id='product'>
                  <MDBCardImage src={product.PImg} style={{ height: "20rem" }} position='top' alt='...' />
                  <MDBCardBody>
                    <MDBCardTitle>{product.PName}</MDBCardTitle>
                    <MDBCardText>{product.PDesc}
                      <MDBCardTitle>Rs {product.PPrice}</MDBCardTitle>
                    </MDBCardText>
                    <MDBBtn id='add' href='#' onClick={(e) => handlecart(e, product._id)}>Add To Cart</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}

        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default FoodProducts