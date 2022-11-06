import React, { Component } from "react";
import axios from 'axios';
import CategoryCard from "../../components/ServiceCreation/MyCategoryCard";
import Loader from '../../components/ServiceCreation/Loader';
import MyCartToPayament from "./MyCartToPayament";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";





class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            total: "",
            loading: true
        };

    }
    componentDidMount() {

        axios.get("http://localhost:8080/api/cart")
            .then(response => response.data)
            .then((data) => {
                this.setState({ categories: data });
                var tot = ""
                data.map((item) => {
                    tot = Number(tot) + Number(item.price ? item.price : 0)
                })
                this.setState({ total: tot });
                this.setState({ loading: false });
            }
            ).catch((err) => {
                this.setState({ loading: false });

            })
    }

    clearAll = () => {
        console.log("clear")
        this.state.categories.map((category) => (
            axios.delete(`http://localhost:8080/api/cart?id=${category.id}`)
                .then((res) => alert("This cart sccessfully deleted!"))
                .catch((err) => alert("something went wrong!"))
        ))
        window.location.href="/mycart"
    }
    render() {

        return (

            <div style={{ width: "100%" }} className="w-100" >
                <div className="row">
                    <div className="col-6"></div>
                    <br />
                    <br />
                    <Button color="failure" onClick={this.clearAll} style={{ width: "300px", margin: "0px 0px 0px auto" }} >
                        CLEAR ALL
                    </Button>                </div>
                <div className=" flex flex-col mb-4 ">

                    <div className="">
                        <p className="text-3xl"></p>
                        {
                            !this.state.loading ?
                                (this.state.categories?.length > 0
                                    ? (
                                        <div>
                                            <div className=" flex justify-center items-center flex-wrap">

                                                {this.state.categories.map((category) => (
                                                    <CategoryCard category={category} mycard={true} />
                                                ))}

                                            </div>
                                            <div className=" flex justify-center items-center flex-wrap">
                                                Total Amount : {this.state.total || ""}
                                            </div>

                                        </div>

                                    ) : (
                                        <div style={{ marginTop: "120px" }} >
                                            <h3>No cards in My card</h3>
                                            <br />
                                            <Link to="/categories" >
                                                <i>

                                                    Add servise to my cart
                                                </i>
                                            </Link>
                                        </div>
                                    )) : <div>
                                    <Loader />
                                </div>
                        }

                    </div>
                </div>
                <MyCartToPayament />


            </div>



        )
    }
}
export default Categories;