# Expense to Figma Plugin

![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=for-the-badge&logo=typescript) ![Figma API](https://img.shields.io/badge/Figma_API-1.0-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Node](https://img.shields.io/badge/Node.js-16%2B-green?style=for-the-badge&logo=node.js) ![License](https://img.shields.io/badge/License-MIT-grey?style=for-the-badge)

> **A TypeScript-based workflow automation tool designed to accelerate high-fidelity fintech prototyping by programmatically injecting dynamic transaction data into the Figma canvas.**

---

## 📋 Executive Summary

**Expense to Figma** addresses a critical bottleneck in the UI/UX design process: the manual population of mock data. By leveraging the Figma Plugin API and TypeScript, this tool enables designers to generate context-aware financial data entities (merchants, amounts, formatting) instantly. 

This project demonstrates a mastery of **asynchronous JavaScript**, **strict type safety**, and **plugin architecture best practices**.

---

## ⚡ Key Features

* **Algorithmic Data Generation:** specific logic to randomize merchants and currency values within realistic bounds.
* **Context-Aware Positioning:** Automatically detects the user's viewport center coordinates to instantiate layers exactly where the designer is focused.
* **Asynchronous Resource Management:** Handles the Figma font-loading promise chain to ensure zero render-blocking or race conditions.
* **Strict Typing:** Built entirely in TypeScript to ensure code reliability and maintainability.

---

## 🏗 Technical Architecture

The application is architected around Figma's security sandbox model, utilizing a dual-thread system to ensure performance and isolation.

### 1. Dual-Thread Communication (IPC)
The plugin operates on two distinct threads:
* **The UI Thread (Iframe):** Renders the frontend interface (HTML/CSS) and captures user intent.
* **The Main Thread (Sandbox):** Executes the business logic and directly manipulates the Figma document object model (DOM).

Communication between these threads is handled via a secure **Inter-Process Communication (IPC)** bridge using the `postMessage` API, ensuring strictly typed payloads are passed efficiently.

### 2. Asynchronous Logic & Event Loop
Figma's engine requires fonts to be loaded into the buffer before text manipulation can occur. This project implements an `async/await` pattern to lock execution until resources are resolved.

```typescript
// Example of Asynchronous Font Locking implementation
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-expense') {
    // Await promise resolution for font resources
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    
    // DOM manipulation occurs only after resource availability is guaranteed
    const textNode = figma.createText();
    textNode.characters = generatedData;
  }
};
```
🚀 Installation & Local Development
This project uses standard Node.js tooling.

### 1.Clone the repository
``` bash
git clone [https://github.com/YOUR_USERNAME/expense-to-figma.git](https://github.com/YOUR_USERNAME/expense-to-figma.git)
cd expense-to-figma
```

### 2. Install Dependencies
``` bash
npm install
```
### 3. Build the Bundle Uses Webpack to transpile TypeScript into ES6 JavaScript.
``` bash
npm run build
```

### 4.Load into Figma

* Open Figma Desktop App.
* Navigate to Plugins > Development > Import plugin from manifest...
* Select the manifest.json file located in the root directory.

## 🔮 Roadmap & Optimization
* API Integration: Refactor data generation to fetch live exchange rates via an external REST API.
* UI State Management: Implement state retention for user preferences (e.g., currency selection).
* Unit Testing: Implement Jest for testing utility functions.
