import React from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';
import Skeleton from '../../components/Skeleton';
import useJournalData from '../../services/student/useJournalData';

function ViewJournal() {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    journalContent,
    firstName,
    lastName,
    journalContentRef,
    loading,
  } = useJournalData();

  const isDataLoaded = !loading && firstName && lastName && journalContent;

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-white`}
      >
        <Header isExpanded={isSidebarExpanded}/>

        <div className="flex flex-col flex-1 px-10 py-6 bg-[#F5F6FA]">
          <div className="bg-[#F9FAFD] mt-20 ml-10 mr-10 border border-[#B9B9B9] rounded-md shadow-lg px-10 h-[75vh] flex flex-col">
            <div className="h-[40px] mb-5 mt-10 flex items-center">
              {firstName && lastName ? (
                <h2 className="text-[25px] font-semibold">
                  {firstName} {lastName} -{' '}
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </h2>
              ) : (
                <Skeleton width="300px" height="35px" />
              )}
            </div>

            <p className="border-b border-[#959494] -ml-3 -mr-3 mb-7"></p>

            {loading ? (
              <div className="space-y-4 overflow-y-auto flex-1">
                <Skeleton width="30%" height="20px" />
              </div>
            ) : (
              <div
                ref={journalContentRef}
                className="overflow-y-auto flex-1 pr-2"
                dangerouslySetInnerHTML={{ __html: journalContent }}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ViewJournal;
