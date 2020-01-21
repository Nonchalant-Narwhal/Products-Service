# Products-Service
Products service for Project-Greenfield API

## Overview
The Products service is a RESTful API that handles requests for product information from the [Kartify](https://github.com/Kartify-Team/Kartify) frontent.

## Description
The Products service API handles request for product information from the [Kartify](https://github.com/Kartify-Team/Kartify) frontent, a redesign of a retail product page. It handles `GET` requests to the following endpoints:

### Product Information
The `/products/:id` endpoint returns the product information/metadata of the product associated with the input ID.

#### Parameters:
* **id**: the ID of the product requested

### List products

The `/products/list` endpoint returns a paginated list of products. It accepts `count` and `page` query parameters, where `count` refers to the number of products to return and `page` refers to the page of products to select.

#### Parameters:
* **count**: number of products to return per-page
* **page**: selected page of products to return

### Get styles

The `/products/:product_id/styles` endpoint retrieves the list of styles for a given product.

#### Parameters
* **product_id**: The ID of the product associated with the requested styles

### Get related products
The `/products/:product_id/related` endpoint returns a list of related product IDs.

#### Parameters
* **product_id**: The ID of the product associated with the requested related products

