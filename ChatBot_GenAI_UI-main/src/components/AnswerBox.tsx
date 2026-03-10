// components/AnswerBox.tsx
'use client';

interface AnswerBoxProps {
  answer: string;
}

export function AnswerBox({ answer }: AnswerBoxProps) {
  if (!answer) return null;

  return (
    <div className="w-full mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ask a Question</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
          {answer}
        </p>  
      </div>
    </div>    
  );
}
