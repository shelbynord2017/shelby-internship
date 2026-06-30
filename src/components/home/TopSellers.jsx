import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useParams } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = ({ loading, topSellers = [] }) => {
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <>
              {new Array(12).fill(0).map((_, i) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                  key={i}
                >
                  <div className="">
                    <div className="lazy pp-author-skeleton">
                      <Skeleton width="30px" height="30px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info-skeleton">
                      <Skeleton width="75px" height="10px" />
                      <br />
                      <Skeleton width="30px" height="10px" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {topSellers.map((seller, index) => (
                  <li>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{seller.authorName}</Link>
                      <span>{seller.price || 1.2} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;