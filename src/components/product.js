import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../components/product.css';


 class Product extends Component {
    constructor(props) {
      super(props);
      this.state = {
          fields: {},
          errors: {},
          file: null,
          id: '',
          file_added: false
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleImage = this.handleImage.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
    }
    handleClick(e){
        // this.props.history.push('/hello');
        const formData = new FormData();
        formData.append("photo", this.state.file, this.state.file.name);
        formData.append("name", this.state.fields.name)
        formData.append("description", this.state.fields.description)
        formData.append("price", this.state.fields.price)
        formData.append("category", this.state.fields.category)
        formData.append("color", this.state.fields.color)
        e.preventDefault();
      if (this.handleValidation()) {
          let fields = {};
          fields["name"] = "";
          fields["description"] = "";
          fields["price"] = 0;
          fields["category"] = "";
          fields["color"] = "";
          this.setState({fields:fields});
          console.log(this.state.fields)
          fetch('https://products-ugo.herokuapp.com/products', {
            method: 'POST',
            body: formData,
            },{mode: 'cors'})
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                this.setState({id: data.data.Id})
                console.log('went well', data.data);
                console.log('id well', data.data.Id);
                alert("Product Added");
            })
            .catch((err) => {
                console.log('that was terrible', err)
            })
      }
    }

    handleChange(e){
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    handleImage(e){
        this.setState({file:e.target.files[0]});
        this.setState({file_added: true})
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter product name.";
          }
    
          if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["name"] = "*Please enter alphabet characters only.";
            }
          }
          
          //Name
        if (!fields["category"]) {
            formIsValid = false;
            errors["category"] = "*Please enter product category.";
          }
    
          if (typeof fields["category"] !== "undefined") {
            if (!fields["category"].match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["category"] = "*Please enter alphabet characters only.";
            }
          }

          //Name
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "*Please enter product description.";
          }
    
          if (typeof fields["description"] !== "undefined") {
            if (!fields["description"].match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["description"] = "*Please enter alphabet characters only.";
            }
          }

          //Name
        if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = "*Please enter product price.";
          }

          //Name
        if (!fields["color"]) {
            formIsValid = false;
            errors["color"] = "*Please enter product color.";
          }
    
          if (typeof fields["color"] !== "undefined") {
            if (!fields["color"].match(/^[a-zA-Z ]*$/)) {
              formIsValid = false;
              errors["color"] = "*Please enter alphabet characters only.";
            }
          }

       this.setState({errors: errors});
       return formIsValid;
   }

    render(){
        const { id } = this.state;
        console.log('last bit', id)
        return(
                <div>
                    <h2 className="tip">Add new Product</h2>
                    <div className="cont-check">
                        <div className="form sign-in">
                            <label>
                                <span>Name</span>
                                <input type="text" ref="name" name="name" onChange={this.handleChange}/>
                                <div className="errorMsg">{this.state.errors.name}</div>
                            </label>
                            <label>
                                <span>Description</span>
                                <input type="text" ref="description" name="description" onChange={this.handleChange}/>
                                <div className="errorMsg">{this.state.errors.description}</div>
                            </label>
                            <label>
                                <span>Price</span>
                                <input type="number" ref="price" name="price" onChange={this.handleChange}/>
                                <div className="errorMsg">{this.state.errors.price}</div>
                            </label>
                            <label>
                                <span>Category</span>
                                <input type="text" ref="category" name="category" onChange={this.handleChange}/>
                                <div className="errorMsg">{this.state.errors.category}</div>
                            </label>
                            <label>
                                <span>Color</span>
                                <input type="text" ref="color" name="color" onChange={this.handleChange}/>
                                <div className="errorMsg">{this.state.errors.color}</div>
                            </label>
                            {/* <div> */}
                            <label htmlFor="file">
                                <span>Photo</span>
                                <input type="file" id="file" name="file" onChange= {this.handleImage}/>
                                
                                <div className="errorMsg">{this.state.errors.file}</div>
                            </label>
                            <button type="button" className="submit" onClick={this.handleClick}>Add new Product</button>
                            
                            <Link
                                to={{
                                    pathname: '/details',
                                    state: { id: id },
                                    
                                }}
                                
                                >
                                <button type="button" className="submit">Next page</button>
                            </Link>
                        </div>
                    <div className="sub-cont">
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
                    </div>
                    </div>
                </div>
        )
    }
}

export default Product;