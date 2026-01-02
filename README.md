The application is designed to help students understand **classic encryption algorithms** and **basic cryptanalysis techniques** through real-time visualization, step-by-step mathematical breakdowns, and interactive user interfaces. It emphasizes *learning-by-visualization*, making cryptographic concepts such as modular arithmetic, matrix inversion, and substitution rules intuitive and accessible.

---

## 🚀 Live Demo

🔗 **Access the live application:** [https://crypto-visual-git-main-shazids-projects.vercel.app/](https://crypto-visual-git-main-shazids-projects.vercel.app/) 

---

## ✨ Features

### 🔹 Part 1: Classic Cryptographic Systems

* **Caesar Cipher**
* Real-time alphabet mapping with dynamic shift visualization.




* **Affine Cipher**
* Comprehensive breakdown of the Extended Euclidean Algorithm for GCD and Modular Inverse calculation.




* **Playfair Cipher**
* Interactive  matrix interface with highlighting for Row, Column, and Rectangle substitution rules.




* **Hill Cipher (2x2)**
* Step-by-step vector-matrix multiplication logging for both encryption and decryption.





### 🔹 Part 2: Crypto Cracker

* **Hill Cracker**
* A specialized module for Known Plaintext Attacks.


* Recovers a  key matrix by calculating the inverse of a plaintext matrix and multiplying it by the ciphertext matrix (mod 26).





---

## 🛠 Technical Stack

* **Framework:** React 19 


* **Build Tool:** Vite 


* **Styling:** Tailwind CSS 4.0 for a modern, responsive UI/UX 


* **Icons:** Lucide React 


* **Logic:** Custom React Hooks for cipher engines and modular math utilities 



---

## ⚙️ Installation & Setup

To run this tool locally, you must have **Node.js (v18.0 or higher)** installed.

### 1. Clone the Repository

```bash
git clone https://github.com/ShazidMahbub/crypto-visual.git
cd crypto-visual

```



### 2. Install Dependencies

```bash
npm install

```



### 3. Run the Application

```bash
npm run dev

```

The app will be available at **http://localhost:5173**.

---

## 💻 OS Specific Instructions

### Windows

1. Install Node.js from nodejs.org.


2. Open PowerShell or Command Prompt as an **Administrator**.


3. Navigate to the project folder.


4. If you face a script execution error, run: `Set-ExecutionPolicy ExecutionPolicy RemoteSigned -Scope CurrentUser`.


5. Execute `npm install` and `npm run dev`.



### macOS/Linux

1. Install Node.js using Homebrew (`brew install node`) or your distribution's package manager.


2. Open the Terminal.


3. Navigate to the project folder.


4. Ensure you have proper permissions for the `node_modules` directory.


5. Execute `npm install` and `npm run dev`.



---

## 🎓 Academic Credits

* **Course:** CSE721 - Introduction to Cryptography 


* **Developer:** Md. Shazid Bin Mahbub (16301077) 


* **Design Acknowledgement:** Gemini (LLM) was utilized specifically for assisting with the Tailwind CSS UI design and responsive layout implementation.