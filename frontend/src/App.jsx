import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [expenseName, setExpenseName] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);

  const fileInputRef = useRef(null);

  // Handle photo captured from native camera app
  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the actual File object for upload
    setCapturedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Reset file input so the same file can be re-selected
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseForm = new FormData();
    expenseForm.append('name', expenseName)
    expenseForm.append('type', expenseType)
    expenseForm.append('amount', expenseAmount)
    expenseForm.append('timestamp', new Date().toISOString())

    if (capturedFile) {
      expenseForm.append('image', capturedFile)
    }

    console.log('Expense submitted:', expenseForm);
    // Add your submission logic here
    alert('Expense captured successfully!');
    try {
      const response = await fetch("https://expense-tracker-jeki.onrender.com", {
        method: "POST",
        body: expenseForm
      })
      if (!response.ok) {
        throw new Error(`response status: ${response.status}`)
      }
      const result = await response.json();
      console.log(result);

    } catch (error) {
      console.error(error.message)
    }
  };

  const resetForm = () => {
    setExpenseName('');
    setExpenseType('');
    setExpenseAmount('');
    setCapturedImage(null);
    setCapturedFile(null);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="title">Expense Tracker</h1>
          <p className="subtitle">Capture and track your expenses seamlessly</p>
        </div>

        <form onSubmit={handleSubmit} className="expense-form">
          {/* Camera Section */}
          <div className="camera-section">
            {/* Hidden file input — opens native camera on mobile */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleCapture}
              style={{ display: 'none' }}
            />

            {!capturedImage && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="camera-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Capture Receipt</span>
              </button>
            )}

            {capturedImage && (
              <div className="image-preview">
                <img src={capturedImage} alt="Captured receipt" />
                <button
                  type="button"
                  onClick={() => setCapturedImage(null)}
                  className="retake-btn"
                >
                  Retake Photo
                </button>
              </div>
            )}

          </div>

          {/* Input Fields */}
          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="expenseName">Expense Name</label>
              <input
                type="text"
                id="expenseName"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                placeholder="e.g., Grocery Shopping"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="expenseType">Expense Type</label>
              <select
                id="expenseType"
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                required
              >
                <option value="">Select type...</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills & Utilities">Bills & Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="expenseAmount">Amount</label>
              <div className="amount-input">
                <span className="currency">₹</span>
                <input
                  type="number"
                  id="expenseAmount"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" onClick={resetForm} className="reset-btn">
              Reset
            </button>
            <button type="submit" className="submit-btn">
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;