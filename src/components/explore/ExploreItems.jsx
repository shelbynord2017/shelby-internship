import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = ({ setFilterValue, filterValue, loading, exploreItems = [] }) => {

  const [visibleItems, setVisibleItems] = useState(8);

  return (
    <>
      <div>
        <select 
          id="filter-items" 
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value)}}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
          <>
            {new Array(8).fill(0).map((_, i) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
              <div className="nft_item">
                <div className="author_list_pp">
                  <div className="lazy">
                    <Skeleton 
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                      color="gray"
                    />
                  </div>
                  <i className="fa fa-check"></i>
                </div>
                <div className="lazy nft__item_preview">
                  <Skeleton width="200px" height="300px" borderRadius="10px" />
                </div>
              </div>
            </div>
            ))}
          </>
          ) : (
          exploreItems.slice(0, visibleItems).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && (
                  <div className="de_countdown">
                    <Countdown expiryDate={item.expiryDate} />
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img src={item.nftImage || nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      <div className="col-md-12 text-center">
        {visibleItems < exploreItems.length && (
          <Link 
            to="" 
            id="loadmore" 
            className="btn-main lead"
            onClick={()=> setVisibleItems(visibleItems + 4)}>
            Load More
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
