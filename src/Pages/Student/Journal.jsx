import React from "react";
import useJournalEditor from "../../services/student/useJournalEditor";
import { EditorContent } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import Header from "../PageComponents/header";
import Footer from "../PageComponents/footer";
import Sidebar from "../PageComponents/sidebar";

function Journal() {
  const {
    editor,
    fontSize,
    setFontSize,
    isSidebarExpanded,
    setIsSidebarExpanded,
    handleSubmit,
    confirmSubmit,
    confirmModalOpen,
    setConfirmModalOpen,
    notificationModal,
    setNotificationModal,
    draftStatus,
    clearDraft,
    userEmail,
    getDraftInfo,
  } = useJournalEditor();

  return (
    <div>
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        } bg-[#F5F6FA] min-h-screen`}
      >
        <Header isExpanded={isSidebarExpanded} />
        <div className="p-6 mt-10 mx-20 mt-[100px] ">
          {/* Editor */}
          {editor && (
            <div className="border border-gray-300 rounded-md bg-[#f9f9fc] shadow-sm">
              <div className="flex flex-wrap items-center gap-2 px-4 py-4 border-b text-gray-600">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive('bold') ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Bold"
                >
                  <Bold size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive('italic') ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Italic"
                >
                  <Italic size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive('underline') ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Underline"
                >
                  <UnderlineIcon size={25} />
                </button>
                {/* Font Size Controls */}
                <div className="flex items-center space-x-2 ml-2">
                  <button
                    onClick={() => {
                      const newSize = Math.max(10, fontSize - 1);
                      setFontSize(newSize);
                      editor
                        .chain()
                        .focus()
                        .setMark("textStyle", { fontSize: newSize })
                        .run();
                    }}
                    className="w-8 h-8 flex items-center justify-center text-xl rounded hover:bg-gray-200 transition-colors"
                    title="Decrease Font Size"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={fontSize}
                    readOnly
                    className="w-12 h-8 text-center rounded bg-gray-100 border text-sm"
                    title="Font Size"
                  />
                  <button
                    onClick={() => {
                      const newSize = Math.min(72, fontSize + 1);
                      setFontSize(newSize);
                      editor
                        .chain()
                        .focus()
                        .setMark("textStyle", { fontSize: newSize })
                        .run();
                    }}
                    className="w-8 h-8 flex items-center justify-center text-xl rounded hover:bg-gray-200 transition-colors"
                    title="Increase Font Size"
                  >
                    +
                  </button>
                </div>
                <span className="mx-2">|</span>
                <button
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Align Left"
                >
                  <AlignLeft size={25} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Align Center"
                >
                  <AlignCenter size={25} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Align Right"
                >
                  <AlignRight size={25} />
                </button>
                <span className="mx-2">|</span>
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive('bulletList') ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Bullet List"
                >
                  <List size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    editor.isActive('orderedList') ? 'bg-gray-300 text-gray-800' : ''
                  }`}
                  title="Numbered List"
                >
                  <ListOrdered size={25} />
                </button>
                <span className="mx-2">|</span>
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  className={`p-2 rounded transition-colors ${
                    !editor.can().undo()
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Undo"
                >
                  <Undo size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  className={`p-2 rounded transition-colors ${
                    !editor.can().redo()
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Redo"
                >
                  <Redo size={25} />
                </button>


              </div>

              {/* Draft Status Indicator */}
              {draftStatus && (
                <div className="px-4 py-2 border-b bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {draftStatus === 'saving' && (
                      <>
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-blue-600">Saving draft...</span>
                      </>
                    )}
                    {draftStatus === 'saved' && (
                      <>
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-green-600">Draft saved</span>
                      </>
                    )}
                    {draftStatus === 'restored' && (
                      <>
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-blue-600">Draft restored</span>
                      </>
                    )}
                    {draftStatus === 'error' && (
                      <>
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-red-600">Failed to save draft</span>
                      </>
                    )}
                  </div>

                  {(draftStatus === 'saved' || draftStatus === 'restored') && (
                    <button
                      onClick={clearDraft}
                      className="text-xs text-gray-500 hover:text-gray-700 underline"
                      title="Clear saved draft"
                    >
                      Clear Draft
                    </button>
                  )}
                </div>
              )}

              <EditorContent editor={editor} />
            </div>
          )}



          {/* Draft Info and Submit button */}
          <div className="mt-6 space-y-4">
            {/* Draft information */}
            {editor?.getText().trim() && (
              <div className="text-sm text-gray-500 space-y-1">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Your work is automatically saved as you type</span>
                </div>
                {userEmail && (
                  <div className="flex items-center space-x-2 text-xs">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Draft saved for: {userEmail}</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit button */}
            <button
              className="text-[28px] px-6 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded disabled:opacity-50 transition-colors"
              onClick={handleSubmit}
              disabled={!editor?.getText().trim()}
            >
              Submit
            </button>
          </div>
        </div>

        {/* ---------------- Confirmation Modal ---------------- */}
        {confirmModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-[650px] text-center">
              <div className="flex justify-center mb-4">
                <FiAlertTriangle size={48} className="text-blue-500" />
              </div>
              <p className="mb-4 text-[24px] text-[#374151] font-medium">
                Submit Journal Entry
              </p>
              <p className="mb-6 text-[18px] text-[#6B7280]">
                Are you sure you want to submit this journal entry?
              </p>
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-[16px] text-blue-800">
                  <span className="font-semibold">⚠️ Important:</span> Once submitted, this entry{" "}
                  <span className="font-bold">cannot be edited or deleted</span>. Please review your content carefully before confirming.
                </p>
              </div>
              <div className="flex justify-center text-[18px] gap-4">
                <button
                  onClick={confirmSubmit}
                  className="px-5 py-2 bg-[#64AD70] text-white rounded-lg w-[140px] hover:brightness-90 transition"
                >
                  YES
                </button>
                <button
                  onClick={() => setConfirmModalOpen(false)}
                  className="px-5 py-2 bg-[#D84040] text-white rounded-lg w-[140px] hover:brightness-90 transition"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Modal */}
        {notificationModal.isOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-[650px] text-center">
              <div className="flex justify-center mb-4">
                {notificationModal.type === "success" ? (
                  <FiCheckCircle size={48} className="text-green-500" />
                ) : (
                  <FiAlertTriangle size={48} className="text-red-500" />
                )}
              </div>
              <p className="mb-4 text-[24px] text-[#374151] font-medium">
                {notificationModal.type === "success" ? "Success" : "Error"}
              </p>
              <p className="mb-6 text-[18px] text-[#6B7280]">
                {notificationModal.message}
              </p>
              <div className="flex justify-center text-[18px]">
                <button
                  onClick={() => setNotificationModal({ isOpen: false, message: "", type: "" })}
                  className="px-5 py-2 bg-[#64AD70] text-white rounded-lg w-[140px] hover:brightness-90 transition"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Journal;
