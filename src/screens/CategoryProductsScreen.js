import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Pagination, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Drawer, Skeleton } from 'antd'
import { getCategoryDetails } from '../actions/categoryActions'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const CategoryProductsScreen = ({ match }) => {
    const categoryId = match.params.id
    const dispatch = useDispatch()
    const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range [minPrice, maxPrice]
    const [brandings,setBrandings] = useState([])
    const [products,setProducts] = useState([])
    const [selectedBrandings, setSelectedBrandings] = useState([]);
    const [sortingOption, setSortingOption] = useState('default'); // State to store the selected sorting option
    const [sortedProducts, setSortedProducts] = useState([]); // State to store the sorted products
    const categoryDetails = useSelector((state) => state.categoryDetails) 
    const {category,loading, error}  =  categoryDetails
    
      // Handler function for clicking on branding checkboxes
  const handleBrandingClick = (branding) => {
    console.log(branding)
    // Toggle the selected branding's state
    setSelectedBrandings((prevSelected) =>
      prevSelected.includes(branding)
        ? prevSelected.filter((b) => b !== branding)
        : [...prevSelected, branding]
    );
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };
    
    useEffect(() => {
      dispatch(getCategoryDetails(categoryId));
    }, [dispatch, categoryId]);


      useEffect(() => {
        if (category) {
          // Set the brandings state when the category is available
          setBrandings(category?.category?.brandings);
          setProducts(category?.products)
        }
      }, [category]);

      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState('left');
      const [page,setPage] = useState(1)
      const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };


      const getProductCountForBranding = (branding) => {
        return products.filter((product) => product.branding === branding).length;
      };

      useEffect(() => {
        // Update the product list whenever the sorting option changes
        sortProducts();
        console.log(products)
      }, [sortingOption, products,selectedBrandings,priceRange]); // Call sortProducts whenever sortingOption or products change

      const sortProducts = () => {
        if (!products) return; 
        // Implement the sorting logic based on the selected sorting option
        // For example, you can use lodash to sort the products array using the sortingOption
        // Here, we assume that products is an array of objects and you want to sort by the 'title' field.
    
        let sortedProducts = [...products]; // Create a copy of the products array to avoid modifying the original array
    

            // Filter products based on selected brandings
    let filteredProducts = selectedBrandings.length
    ? products.filter((product) =>
        selectedBrandings.includes(product.branding)
      )
    : [...products]; // If no brandings are selected, show all products


        switch (sortingOption) {
          case 'title_asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'title_desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'date_desc':
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'price_asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          default:
            // For the 'default' option, do nothing (keep the original order)
            break;
        }

        // console.log(sortedProducts)
    
        // Update the sorted products in the state
        setSortedProducts(sortedProducts);
        if(filteredProducts){
          setSortedProducts(filteredProducts);
        }
        
      };
    

let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
      

    return(

    <Container className='category-container'>
       {loading ?  <Skeleton active /> : (
        <>
    <Row className='category-row'>
        <Col md={2}>
        <Form className="facetwp-sort my-2">
  <Form.Control 
  value={sortingOption}
  onChange={(e) => {
    console.log(e.target.value)
    setSortingOption(e.target.value)}}
  as="select" 
  className="facetwp-sort-select">
    <option value="default">Sort by</option>
    <option value="title_asc">Title (A-Z)</option>
    <option value="title_desc">Title (Z-A)</option>
    <option value="date_desc">Date (Newest)</option>
    <option value="price_asc">Price: Low to High</option>
    <option value="price_desc">Price: High to Low</option>
  </Form.Control>
</Form>


<div id="text-25" className="facet-wrap widget widget_text my-2">
<h6 className="gamma widget-title">Categories</h6>
  <div className="textwidget">
    <div className="facetwp-facet facetwp-facet-categories facetwp-type-checkboxes" data-name="categories" data-type="checkboxes">
        {brandings &&
          brandings.map((branding) => (
            <div
              className="facetwp-checkbox"            >
              <input 
               data-value={branding}
               key={branding}
               onClick={() => handleBrandingClick(branding)}
              type="checkbox" />
              <label>
                {branding}{" "}
                <span className="facetwp-counter">
                  ({getProductCountForBranding(branding)})
                </span>
              </label>
            </div>
          ))}
    
    </div>
  </div>
</div>

<div className='price-range-slider my-2'>
<div id="text-25" className="facet-wrap widget widget_text">
                <h6>Price Range</h6>
                <Slider
                  min={0}
                  max={1000}
                  range
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                />
                <div className='slider-values'>
                  <span>Min: {priceRange[0]}</span>
                  <span>Max: {priceRange[1]}</span>
                </div>
              </div>
              </div>

        </Col>

        <Col md={10} xs={12} sm={12}>
     
        <Row  >

       
        

        <Col md={0} xs={12}>
          <h6>Discover the Finest {category?.category?.name} in Kenya</h6>
          <Button className="w-100 btn-filter" onClick={showDrawer}>SHOW FILTERS</Button>
          <Pagination className="mx-auto">{items}</Pagination>
        </Col>


       <>{sortedProducts?.map((product)=> <Col md={3} xs={6} > <Product product={product} /> </Col>)}</>

          </Row>

        </Col>
    </Row>

    <Drawer
        className='filter-category'
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
       <Row>
       <Col md={8} xs={8}>
      
       <Form className="facetwp-sort my-2">
  <Form.Control 
  value={sortingOption}
  onChange={(e) => {
    console.log(e.target.value)
    setSortingOption(e.target.value)}}
  as="select" 
  className="facetwp-sort-select">
    <option value="default">Sort by</option>
    <option value="title_asc">Title (A-Z)</option>
    <option value="title_desc">Title (Z-A)</option>
    <option value="date_desc">Date (Newest)</option>
    <option value="price_asc">Price: Low to High</option>
    <option value="price_desc">Price: High to Low</option>
  </Form.Control>
</Form>


<div id="text-25" className="facet-wrap widget widget_text my-2">
<h6 className="gamma widget-title">Categories</h6>
  <div className="textwidget">
    <div className="facetwp-facet facetwp-facet-categories facetwp-type-checkboxes" data-name="categories" data-type="checkboxes">
        {brandings &&
          brandings.map((branding) => (
            <div
              className="facetwp-checkbox"            >
              <input 
               data-value={branding}
               key={branding}
               onClick={() => handleBrandingClick(branding)}
              type="checkbox" />
              <label>
                {branding}{" "}
                <span className="facetwp-counter">
                  ({getProductCountForBranding(branding)})
                </span>
              </label>
            </div>
          ))}
    
    </div>
  </div>
</div>

<div className='price-range-slider my-2'>
<div id="text-25" className="facet-wrap widget widget_text">
                <h6>Price Range</h6>
                <Slider
                  min={0}
                  max={1000}
                  range
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                />
                <div className='slider-values row'>
                  <Col xs={6}>
                  <span>Min: {priceRange[0]}</span>
                  </Col>
                  <Col xs={6}>
                    <span>Max: {priceRange[1]}</span>
                  </Col>
                </div>
              </div>
              </div>

        </Col>
       </Row>
      </Drawer>
      </>
    )}

    
    </Container>
)
}

export default CategoryProductsScreen