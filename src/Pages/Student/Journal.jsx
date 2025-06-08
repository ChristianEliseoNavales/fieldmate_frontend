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
import Header from "../PageComponents/header";
import Footer from "../PageComponents/footer";
import Sidebar from "../PageComponents/sidebar";

function Journal() {
  const {
    editor,
    fontSize,
    setFontSize,
    isChecked,
    setIsChecked,
    isSidebarExpanded,
    setIsSidebarExpanded,
    handleSubmit,
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
                <button onClick={() => editor.chain().focus().toggleBold().run()}>
                  <Bold size={25} />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                  <Italic size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
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
                    className="text-xl"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={fontSize}
                    readOnly
                    className="w-10 h-7 text-center rounded bg-gray-100 border text-sm"
                  />
                  <button
                    onClick={() => {
                      const newSize = fontSize + 1;
                      setFontSize(newSize);
                      editor
                        .chain()
                        .focus()
                        .setMark("textStyle", { fontSize: newSize })
                        .run();
                    }}
                    className="text-xl"
                  >
                    +
                  </button>
                </div>
                <span className="mx-2">|</span>
                <button
                  onClick={() => editor.chain().focus().setTextAlign("left").run()}
                >
                  <AlignLeft size={25} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                >
                  <AlignCenter size={25} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                >
                  <AlignRight size={25} />
                </button>
                <span className="mx-2">|</span>
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List size={25} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered size={25} />
                </button>
                <span className="mx-2">|</span>
                <button onClick={() => editor.chain().focus().undo().run()}>
                  <Undo size={25} />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                  <Redo size={25} />
                </button>

                
              </div>

              <EditorContent editor={editor} />
            </div>
          )}

          {/* Checkbox */}
          <div className="flex items-center mt-6 space-x-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="h-4 w-4"
            />
            <label className="text-gray-600 text-[25px]">
              You agree to submit this entry. Once submitted, the entry cannot be edited.
            </label>
          </div>

          {/* Submit button */}
          <button
            className="text-[28px] mt-6 px-6 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!isChecked || !editor?.getText().trim()}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Journal;
