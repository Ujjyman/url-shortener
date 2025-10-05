# URL Shortener (Node.js + Express + MongoDB)

A production-ready URL Shortener web application built with **Node.js**, **Express.js**, and **MongoDB**, complete with custom slug support, analytics, security best-practices, and a clean stats UI.

---

## Features

**Shorten any long URL** into a clean, shareable short link  
**Custom slug support** — choose your own short link ID  
**Auto-generated slugs** using [`nanoid`](https://github.com/ai/nanoid)  
**Real-time analytics:** total clicks, creation date, last access time  
**Content-Negotiation:**  
- Returns **JSON** when accessed via API  
- Returns a **clean HTML stats page** when visited in the browser  
**Rate limiting, Helmet, CORS** — for security and protection  
**Responsive UI** for shortening links and viewing stats

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Validation:** Zod  
- **Slug Generation:** NanoID  
- **Security:** Helmet, CORS, express-rate-limit  
- **Logging:** Morgan  
- **Frontend:** Vanilla JS + HTML + CSS (served via Express static files)

---

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ujjyman/url-shortener.git
cd url-shortener
