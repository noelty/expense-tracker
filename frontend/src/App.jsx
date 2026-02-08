import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [expenseName, setExpenseName] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      closeCamera();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      name: expenseName,
      type: expenseType,
      amount: expenseAmount,
      image: capturedImage,
      timestamp: new Date().toISOString()
    };
    console.log('Expense submitted:', expense);
    // Add your submission logic here
    alert('Expense captured successfully!');
  };

  const resetForm = () => {
    setExpenseName('');
    setExpenseType('');
    setExpenseAmount('');
    setCapturedImage(null);
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
            {!isCameraOpen && !capturedImage && (
              <button 
                type="button" 
                onClick={openCamera} 
                className="camera-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Capture Receipt</span>
              </button>
            )}

            {isCameraOpen && (
              <div className="camera-container">
                <video ref={videoRef} autoPlay playsInline className="video-preview"></video>
                <div className="camera-controls">
                  <button type="button" onClick={capturePhoto} className="capture-btn">
                    <div className="capture-ring"></div>
                  </button>
                  <button type="button" onClick={closeCamera} className="close-btn">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {capturedImage && !isCameraOpen && (
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

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
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