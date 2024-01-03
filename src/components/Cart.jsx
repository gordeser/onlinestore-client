import React from "react";

const Cart = () => {
    return (
        <div className="container py-4 align-content-center">
            <h1 className="mb-5 text-center fw-normal">Cart</h1>

            <div className="justify-content-center mb-5 row align-items-center my-3">
                <div className="col-1">
                    <img src="" className="img-fluid" alt="Item" style={{"max-width": "100px;"}} />
                </div>
                <div className="col-2"><strong>Item name</strong></div>

                <div className="col-auto">1x</div>
                <div className="col-auto">*</div>
                <div className="col-auto">5</div>
                <div className="col-auto">=</div>
                <div className="col-auto">100 CZK</div>
            </div>

            <div className="d-flex justify-content-center">
                <button className="btn btn-primary">Make an order</button>
            </div>

        </div>
    )
}

export default Cart;
