import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Search from "@material-ui/icons/Search";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import { mobile } from "../responsive";
import Axios from "axios";
import { useAuth } from "../contexts/AuthContext";
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 500px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "30px" })}
`;
const availDesigns = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
const ProductList = (props) => {
  console.log("parrammmssss", props.match.params.category);
  const menFilter = ["Tops", "Trousers", "Shoes"];
  const womenFilter = ["Tops", "Dresses", "Shoes"];
  const [selectedFilter, setSelectedFilter] = useState();

  useEffect(() => {
    if (props.match.params.category === "Men") {
      setSelectedFilter([...menFilter]);
    } else if (props.match.params.category === "Women") {
      setSelectedFilter([...womenFilter]);
    }
  }, []);

  const { productsList, setProductsList } = useAuth();
  // const [prouctsList, setProductsList] = useState();
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/getallproducts").then((response) => {
  //     setProductsList(response.data);
  //     //console.log(response.data);
  //   });
  // }, []);

  function sortProducts(e) {
    if (e.target.value === "Newest") {
      Axios.get("http://localhost:3001/filter/newest").then((response) => {
        setProductsList([...response.data]);
      });
    } else if (e.target.value === "Price (asc)") {
      Axios.get("http://localhost:3001/filter/incprice").then((response) => {
        setProductsList([...response.data]);
      });
    } else if (e.target.value === "Price (desc)") {
      Axios.get("http://localhost:3001/filter/decprice").then((response) => {
        setProductsList([...response.data]);
      });
    }
  }
  function garmentOptions() {}
  return (
    <Container>
      <NavBar />
      <SearchContainer>
        {/* <Input placeholder="Search" /> */}

        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          fullWidth
          options={availDesigns.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Garment"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          onInputChange={(e, v) => {
            console.log("search comp", v);
          }}
        />
        <Search style={{ color: "gray", fontSize: 30 }} />
      </SearchContainer>
      <Title>{props.match.params.category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Select
            </Option>
            {selectedFilter?.map((item) => (
              <Option>{item}</Option>
            ))}
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={sortProducts}>
            <Option selected disabled>
              Select
            </Option>
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products p={productsList} gender={props.match.params.category} />
      <Footer />
    </Container>
  );
};

export default ProductList;
