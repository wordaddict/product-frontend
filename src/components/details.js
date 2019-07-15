import React, { Component } from 'react';
import '../components/details.css';

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
  
    bytes.forEach((b) => binary += String.fromCharCode(b));
  
    return window.btoa(binary);
  };

class Details extends Component {
    constructor(props){
        super(props);
        this.state = {
            img: {},
            isLoading: true,
            name: '',
            category: '',
            price: 0,
            description: '',
            color: '',
            id: ''
        }
    }

    
    componentDidMount () {
        const id = this.props.location.state.id;
                fetch(`https://products-ugo.herokuapp.com/products?id=${id}`)
                .then((data) => {
                    return data.json();
                })
                .then((data) => {
                    console.log('from api call', data)
                    this.setState({img: data.data.img.data.data, isLoading: false, name: data.data.name, price: data.data.price, category: data.data.category, description: data.data.description, color: data.data.color})
                    let base64Flag = 'data:image/jpeg;base64,';
                    let imageStr = arrayBufferToBase64(data.data.img.data.data);
    
                    document.querySelector('img').src = base64Flag + imageStr;
                })
                .catch((err) => {
                    console.log('that was terribleyo', err)
                })
            
      }
     
    render(){
        const { img, isLoading, name, color, price, description, category } = this.state;
        console.log('gang', name, color, price, description, category )
        console.log('isLoading', isLoading)
        console.log('enter o', this.props.location.state)
        return(
            <div className="product_image_area">
                <h2 className="tip">Product Details</h2>
                <div className="cont">
                    {
                        isLoading ? (<p>Making API call...</p>) :
                        (
                        <div>
                            <div className="img">
                                <img src={`data:image/jpeg;base64,${img}`}/>
                            </div>
                            <div className="details">
                                <div className="name">
                                    <h3>name:</h3>
                                    <h4>{this.state.name}</h4>
                                </div>
                                <div className="description">
                                    <h3>description:</h3>
                                    <h4>{this.state.description}</h4>
                                </div>
                                <div className="category">
                                    <h3>category:</h3>
                                    <h4>{this.state.category}</h4>
                                </div>
                                <div className="color">
                                    <h3>color:</h3>
                                    <h4>{this.state.color}</h4>
                                </div>
                                <div className="price">
                                    <h3>price:</h3>
                                    <h4>{this.state.price}</h4>
                                </div>
                            </div>
                        </div>
                    
                        )
                    }
                </div>
            </div>
        )
    }
};

export default Details;