// components/ListDocs.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteFile, getUploadedFiles } from '../services/service';

interface ListDocsProps {
  refreshTrigger: boolean;
}

export function ListDocs({refreshTrigger}: ListDocsProps) {
  const [docs, setDocs] = useState<string []>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      const filenames: string [] = await getUploadedFiles();
      if(filenames) {
        setDocs(filenames);
      } 
      
    } catch (error) {
      toast.error('Failed to load documents.');
    } finally {
      setLoading(false);
    }
  };

  const deleteDoc = async (id: string) => {
    try {
      await deleteFile(id);
      toast.success('Document deleted.');
      setDocs(docs.filter(doc => doc !== id)); 
    } catch {
      toast.error('Failed to delete document.');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [refreshTrigger]);

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Documents</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : docs.length === 0 ? (
        <p className="text-gray-600">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => (
            <li key={doc} className="flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700 truncate max-w-[70%]">{doc}</span>
              <button
                onClick={() => deleteDoc(doc)}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
