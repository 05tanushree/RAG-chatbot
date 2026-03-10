// components/UploadDoc.tsx
'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { uploadFiles } from '../services/service';

interface UploadDocumentProps {
  onUploadSuccess: () => void;
}

export function UploadDoc({onUploadSuccess}: UploadDocumentProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      toast.error('Please select a document to upload.');
      return;
    }

    const file = files[0];
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size exceeds 2MB limit.');
      return;
    }

    try {
      setUploading(true);
      await uploadFiles(file);      
      toast.success('Document uploaded successfully!');
      fileInputRef.current? fileInputRef.current.value = '': null;
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
      <div className="space-y-4" >
        <input
          type="file"
          ref={fileInputRef}
          disabled={uploading}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded file:cursor-pointer"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}
