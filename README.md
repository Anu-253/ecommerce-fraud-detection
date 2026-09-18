# E-Commerce Fraud Detection

An e-commerce website with a fraud detection and risk assessment system.

## About the Project

This project is a full-stack e-commerce website with an additional fraud detection module.

The system allows users to browse products, add them to a cart, place orders and make payments. Along with the normal e-commerce flow, the backend checks orders for certain fraud indicators and assigns a risk level to the transaction.

The project also includes features such as an AI shopping assistant, price and review transparency, and a "Make an Offer" feature.

## Features

- User registration and login
- Browse and search products
- Product details
- Shopping cart
- Checkout and order placement
- Order history
- Fraud detection and risk assessment
- AI shopping assistant
- Price and review comparison
- Make an Offer feature

## Fraud Detection

The fraud detection module checks an order for different risk factors, such as:

- Multiple accounts using the same address
- Multiple failed payment attempts
- High-value orders
- Other information related to the order and user

Based on the detected factors, the system calculates a risk score and classifies the order as:

- LOW
- MEDIUM
- HIGH

The fraud check is connected to the order creation flow so that an order can be assessed when it is placed.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- React Router
- Lucide React

**Backend**
- Node.js
- Express.js
- REST API
- Mongoose

**Database**
- MongoDB

**Tools**
- Postman
- MongoDB Atlas
- Git & GitHub
- VS Code

## Project Structure

```text
ecommerce-fraud-detection/
│
├── backend/
│
├── frontend/
│
├── README.md
└── package-lock.json
