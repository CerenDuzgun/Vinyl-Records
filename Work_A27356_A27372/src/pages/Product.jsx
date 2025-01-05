import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import axios from "axios";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams(); // URL'den ürün id'sini alır
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product)); // Ürünü Redux sepetine ekler
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);

      try {
        // Tüm ürünleri çek
        const response = await axios.get(
          "https://api.sheety.co/ee97b061e0498a0e6f8e81ff923cfdc4/musicRecords/sayfa1"
        );
        const allProducts = response.data.sayfa1;

        // ID'ye göre belirli ürünü bul
        const productData = allProducts.find((item) => item.id === parseInt(id));
        setProduct(productData);
        setLoading(false);

        // Aynı kategorideki benzer ürünleri bul
        const similar = allProducts.filter(
          (item) => item.category === productData.category && item.id !== productData.id
        );
        setSimilarProducts(similar);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
        setLoading2(false);
      }
    };

    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.image}
              alt={product.title}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <h3 className="display-6 my-4">${product.price}</h3>

            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div className="my-4 py-4">
        <div className="d-flex">
          {[...Array(4)].map((_, index) => (
            <div className="mx-4" key={index}>
              <Skeleton height={400} width={250} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => {
            return (
              <div key={item.id} className="card mx-4 text-center">
                <img
                  className="card-img-top p-3"
                  src={item.image}
                  alt={item.title}
                  height={300}
                  width={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {item.title.substring(0, 15)}...
                  </h5>
                </div>
                <div className="card-body">
                 <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
