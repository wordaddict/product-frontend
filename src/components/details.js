import React, { Component } from 'react';
import '../components/details.css';

class Details extends Component {
    render(){
        return(
            <div class="product_image_area">
                <h2 className="tip">Product Details</h2>
                <div className="cont">
                {/* <div className="sub-cont"> */}
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>New here?</h2>
                            <p>Add new products and discover new possibilities</p>
                        </div>
                        <div className="img__btn">
                            <span className="m--up">Check it</span>
                            <span className="m--in">Check it</span>
                        </div>
                    </div>
                    <div className="details">
                        <div className="name">
                            <h2>name</h2>
                        </div>
                        <div className="description">
                            <h2>description</h2>
                        </div>
                        <div className="category">
                            <h2>category</h2>
                        </div>
                        <div className="color">
                            <h2>color</h2>
                        </div>
                    </div>
                    
                {/* </div> */}
                </div>
            </div>
        )
    }
};

export default Details;