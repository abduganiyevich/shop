import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Products.css";

export default function Products() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("a-z");

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setCount(json.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


 
    
  const filteredProducts = data
    .filter((product) =>
      product.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .sort((a, b) => {
      if (sortOrder === "a-z") {
        return a.attributes.title.localeCompare(b.attributes.title);
      } else if (sortOrder === "high") {
        return b.attributes.price - a.attributes.price;
      } else if (sortOrder === "low") {
        return a.attributes.price - b.attributes.price;
      }
      return 0;
    });
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="product-wrapper">
          <div className="input-wrapper">
            <label>
              <span>Search Product</span>
              <input
                type="text"
                placeholder="Search product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            <label>
              <span>Search Category</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="table">Tables</option>
                <option value="chair">Chairs</option>
                <option value="kids">Kids</option>
              </select>
            </label>

            <label>
              <span>Search Company</span>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="modenza">Modenza</option>
                <option value="luxora">Luxora</option>
                <option value="homestead">Homestead</option>
                <option value="comfora">Comfora</option>
              </select>
            </label>

            <label>
              <span>Sort By</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="a-z">a-z</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </label>
          </div>
          <div className="btn-wrapper">
            <button className="blue-btn">Search</button>
            <button
              className="pink-btn"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setCompanyFilter("all");
                setSortOrder("a-z");
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="horizontal-line">
          <span>{filteredProducts.length} Products</span>
          <hr />
        </div>
        <div className="product-item">
          {filteredProducts.map((e) => (
            <div
              key={e.id}
              className="product-img"
              onClick={()=>handleClick(e.id)}
            >
              <img src={e.attributes.image} alt={e.attributes.title} />
              <h4>
                <span>Title:</span>
                {e.attributes.title}
              </h4>
              <p>
                <span>Company:</span>
                {e.attributes.company}
              </p>
              <p>
                <span>Category:</span>
                {e.attributes.category}
              </p>
              <p>
                <span>Price:</span>${e.attributes.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
