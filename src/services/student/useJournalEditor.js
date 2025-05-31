import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";
import secureAxios from "../../services/secureAxios"; // secureAxios with Firebase auth token

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
            parseHTML: element => ({
              fontSize: element.style.fontSize?.replace("px", ""),
            }),
          },
        },
      },
    ];
  },
});

const useJournalEditor = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[50vh] p-4 bg-white rounded-b-md outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-200",
        placeholder: "Type here...",
      },
    },
  });

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      alert("You must be logged in to submit a journal.");
      return;
    }

    const content = editor?.getHTML();
    if (isChecked && content?.trim()) {
      try {
        const response = await secureAxios.post(`${BASE_URL}/journal`, {
          content,
          email: user.email,
        });
        console.log(response.data);
        navigate("/ViewJournal");
      } catch (err) {
        console.error(err);
        alert("Failed to submit journal.");
      }
    } else {
      alert("Please agree to the terms and write something.");
    }
  };

  return {
    editor,
    fontSize,
    setFontSize,
    isChecked,
    setIsChecked,
    isSidebarExpanded,
    setIsSidebarExpanded,
    handleSubmit,
  };
};

export default useJournalEditor;
