import React, { Component } from "react";
import axios from 'axios';
import CategoryCard from "../../components/ServiceCreation/MyCategoryCard";
import Loader from '../../components/ServiceCreation/Loader';
import MyCartToPayament from "./MyCartToPayament";





class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            total: ""
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
                // console.log(tot, "tot")

            }

            );
    }


    render() {

        return (

            <div className="min-h-screen flex flex-col ">

                <div className="">
                    <p className="text-3xl"></p>
                    {
                        this.state.categories?.length > 0
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
                                    <MyCartToPayament />

                                </div>

                            ) : (
                                <div>
                                    <Loader />
                                </div>
                            )
                    }
                </div>

            </div>



        )
    }
}
export default Categories;