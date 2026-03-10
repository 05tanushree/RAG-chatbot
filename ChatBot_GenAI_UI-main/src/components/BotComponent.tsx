import React from 'react';
import Image from 'next/image';
import { UploadDoc } from './UploadDoc';
import { ListDocs } from './ListDocs';
import { SignOutButton } from './SignOutButton';
import { QueryForm } from './QueryForm';
import { AnswerBox } from './AnswerBox';
import { LoginModal } from './LoginModal';

const BotComponent: React.FC = () => {
    const [answer, setAnswer] = React.useState<string>('');
    const [showModal, setShowModal] = React.useState(true);
    const [session, setSession] = React.useState<any>(null);
    const [refreshList, setRefreshList] = React.useState(false);

    const handleUploadSuccess = () => {
        setRefreshList((prev) => !prev); // toggles value to trigger effect
    };

    const handleLogin = (formData: any) => {
        setShowModal(false);
        setSession({
            user: {
                name: formData.username,
                role: formData.role
            }
        });
    };
    const getAnswer = (text: string) => {
        setAnswer(text);
    }
    const handleSignOut = () => {
        setSession(null);
        setShowModal(true);
        setAnswer('');
    };

  return (
    <>
    {showModal && <LoginModal onSubmit={handleLogin} />}
    <main className={showModal ? "blur-sm pointer-events-none" : "min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-10"}>
        <div className="max-w-5xl mx-auto space-y-10">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">📄 Document Search Bot</h1>
                {session?.user && (
                    <div className="text-sm text-gray-600">
                        Logged in as <strong>{session.user.name} | {session.user.role}</strong>
                    </div>
                )}
                {session?.user && <SignOutButton onSignOut={handleSignOut}/>}                
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {/* Left Section - Query and Answer */}
                <div className="md:col-span-2 flex flex-col items-stretch w-full">   
                    <QueryForm onAnswer={getAnswer}/>
                    <AnswerBox answer={answer}/>
                </div>
                {/* Right Section - Admin Panel */}
                {session?.user && session?.user.role === 'Admin' && (
                    <div className="md:col-span-1 w-full">
                        <UploadDoc onUploadSuccess={handleUploadSuccess}/>
                        <ListDocs refreshTrigger={refreshList}/>                                     
                    </div>
                )}                                
            </div>
        </div>      
    </main>
    </>
  );
};

export default BotComponent;