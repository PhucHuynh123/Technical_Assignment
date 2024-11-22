import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import { fetchProducts, searchProducts } from "../services/ProductServices";
import { Product } from "../types/Product";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "./SearchBar";
import "../styles/ProductList.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);

  const loadProducts = async (pageNumber: number) => {
    if (debouncedQuery) {
      const { products: searchedProducts, total } = await searchProducts(
        debouncedQuery,
        pageNumber
      );
      if (pageNumber === 1) {
        setProducts(searchedProducts);
      } else {
        setProducts(searchedProducts);
      }
      setTotalPages(Math.ceil(total / 20));
    } else {
      const { products: newProducts, total } = await fetchProducts(pageNumber);
      if (pageNumber === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
      setTotalPages(Math.ceil(total / 20));
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page, debouncedQuery, loadProducts]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setProducts([]);
    loadProducts(1);
  };

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
