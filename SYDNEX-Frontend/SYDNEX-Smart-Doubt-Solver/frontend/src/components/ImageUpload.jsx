import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Eye } from 'lucide-react';
import Tesseract from 'tesseract.js';

export const ImageUpload = ({ onTextExtracted, onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [ocrProgress, setOcrProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      onImageSelected(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Extract text using OCR
      setOcrLoading(true);
      setOcrProgress(0);
      
      try {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setOcrProgress(Math.round(m.progress * 100));
            }
          }
        });
        
        const extractedText = result.data.text.trim();
        setExtractedText(extractedText);
        onTextExtracted(extractedText);
        
      } catch (error) {
        console.error('OCR Error:', error);
        alert('Failed to extract text from image. Please try again.');
      } finally {
        setOcrLoading(false);
        setOcrProgress(0);
      }
    }
  };
  
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedText('');
    setOcrProgress(0);
    onImageSelected(null);
    onTextExtracted('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Question Image (OCR Enabled)
      </label>
      
      {!selectedImage ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Click to upload an image</p>
          <p className="text-sm text-gray-500">Supports JPG, PNG, GIF (Max 10MB)</p>
          <p className="text-xs text-blue-600 mt-2">✨ Text will be automatically extracted using OCR</p>
        </div>
      ) : (
        <div className="glass-card p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-700">Uploaded Image</h4>
            <button
              type="button"
              onClick={removeImage}
              className="p-1 text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {imagePreview && (
            <div className="mb-4">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-full h-48 object-contain rounded-lg border mx-auto"
              />
            </div>
          )}
          
          {ocrLoading && (
            <div className="text-center py-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${ocrProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-600">
                Extracting text from image... {ocrProgress}%
              </p>
            </div>
          )}
          
          {extractedText && !ocrLoading && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Extracted Text:</h5>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-700 max-h-32 overflow-y-auto">
                {extractedText}
              </div>
            </div>
          )}
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};