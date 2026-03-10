// components/QueryForm.tsx
'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { getAnswer } from '../services/service'; 

interface QueryFormProps {
  onAnswer: (text: string) => void;
}

export function QueryForm({ onAnswer }: QueryFormProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const submitQuery = async () => {
    if (!query.trim()) {
      toast.error('Please enter a query.');
      return;
    }

    try {
      setLoading(true);
      const answer = await getAnswer(query.trim());
      onAnswer(answer);
    } catch {
      toast.error('Failed to get answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ask a Question</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={submitQuery}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
}
