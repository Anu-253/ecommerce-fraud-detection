# 🛡️ E-Commerce Fraud Detection System

A full-stack e-commerce website with an integrated fraud detection and risk assessment system.

## 📌 About the Project

This project is an e-commerce platform developed with a fraud detection system integrated into the order and payment flow.

The website provides the basic features of an online shopping platform such as browsing products, adding items to a cart, checkout, payments and order management. Along with this, the backend checks transactions for different fraud-related indicators and calculates a risk score for each order.

The main idea is to detect potentially suspicious orders at the time of purchase instead of treating fraud detection as a completely separate process.

The project also includes additional features such as an AI shopping assistant, price and review transparency, and a "Make an Offer" feature.

---

## ✨ Features

### 🛒 E-Commerce

- User registration and login
- Product listing
- Product search and categories
- Product details
- Add/remove products from cart
- Update cart quantities
- Checkout
- Order placement
- Payment attempt tracking
- Order history

### 🛡️ Fraud Detection

The system checks an order for different factors that may indicate suspicious activity.

Some of the checks include:

- Multiple accounts associated with the same address
- Multiple failed payment attempts
- High-value orders
- User and order-related information
- Combination of multiple suspicious indicators

After checking these factors, the system generates a risk score and assigns a risk level:

| Risk Level | Meaning |
|------------|---------|
| LOW | No major suspicious indicators detected |
| MEDIUM | Some risk indicators are present |
| HIGH | Multiple or significant risk indicators are detected |

The risk assessment is connected directly to the order flow so that orders can be checked when they are created.

### 🤖 AI Shopping Assistant

An AI-based shopping assistant is included to help users while browsing the platform.

It is intended to make it easier for users to find products and get product-related assistance without having to manually search through everything.

### 💰 Price & Review Transparency

The project also focuses on making product information more transparent.

The feature is intended to help users compare prices and understand product reviews before making a purchase.

### 🤝 Make an Offer

Selected products can support a "Make an Offer" feature where users can suggest a price instead of only purchasing at the listed price.

This adds a bargaining/negotiation aspect to the e-commerce experience.

---

## 🔐 Fraud Detection Workflow

The fraud detection process is connected to the order creation process.

```text
User places an order
        ↓
Order is created
        ↓
Fraud information is collected
        ↓
Fraud rules are checked
        ↓
Risk score is calculated
        ↓
Risk level is assigned
        ↓
LOW / MEDIUM / HIGH

## 📁 Project Structure

```text
ecommerce-fraud-detection/
│
├── backend/
│   ├── Middleware/
│   │   └── authmiddleware.js
│   │
│   ├── Routes/
│   │   ├── adminRoute.js
│   │   ├── adminorderRoute.js
│   │   ├── cartRoutes.js
│   │   ├── checkoutroutes.js
│   │   ├── fraudCaseRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productadminRoute.js
│   │   ├── productroutes.js
│   │   ├── subscribeRoute.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── fraud/
│   │   ├── applyFraudCheck.js
│   │   ├── config.js
│   │   ├── contextBuilder.js
│   │   ├── decisionEngine.js
│   │   ├── fraudDetection.js
│   │   ├── riskScoring.js
│   │   │
│   │   └── rules/
│   │       ├── failedPayment.js
│   │       ├── highValue.js
│   │       ├── index.js
│   │       ├── multipleAccount.js
│   │       ├── newAccount.js
│   │       ├── sharedAddress.js
│   │       ├── sharedDevice.js
│   │       ├── sharedPhone.js
│   │       ├── suspiciousIp.js
│   │       └── velocity.js
│   │
│   ├── models/
│   │   ├── FraudAssessment.js
│   │   ├── FraudCase.js
│   │   ├── PaymentAttempt.js
│   │   ├── Subriber.js
│   │   ├── User.js
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── order.js
│   │   └── product.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── Redux/
│   │   ├── slice/
│   │   │   ├── adminProductSlice.js
│   │   │   ├── adminSlice.js
│   │   │   ├── adminorderSlice.js
│   │   │   ├── authslice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── checkoutSlice.js
│   │   │   ├── orderSlice.js
│   │   │   └── productsSlice.js
│   │   │
│   │   └── store.js
│   │
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Admin/
│   │   │   ├── Common/
│   │   │   ├── Layout/
│   │   │   ├── cart/
│   │   │   └── products/
│   │   │
│   │   ├── Pages/
│   │   │   ├── AdminHomepage.jsx
│   │   │   ├── CollectionPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyOrderPage.jsx
│   │   │   ├── OrderDetailsPage.jsx
│   │   │   ├── Profil.jsx
│   │   │   ├── Register.jsx
│   │   │   └── orderConformationPage.jsx
│   │   │
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── index.html
│
├── README.md
└── package-lock.json
