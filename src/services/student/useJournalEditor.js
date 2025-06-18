import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import History from "@tiptap/extension-history";
import { Extension } from "@tiptap/core";
import secureAxios from "../../services/secureAxios"; 

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

// Draft management utilities
const DRAFT_STORAGE_PREFIX = 'journal_draft_';
const DRAFT_SAVE_DELAY = 2000; // 2 seconds debounce

// Helper function to create user-specific storage key
const getUserDraftKey = (userEmail) => {
  if (!userEmail) return null;
  // Sanitize email for use as localStorage key
  const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9@._-]/g, '_');
  return `${DRAFT_STORAGE_PREFIX}${sanitizedEmail}`;
};

const draftManager = {
  save: (content, userEmail) => {
    try {
      if (!userEmail) return false;
      const storageKey = getUserDraftKey(userEmail);
      if (!storageKey) return false;

      const draftData = {
        content,
        userEmail,
        timestamp: Date.now(),
        lastModified: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(draftData));
      return true;
    } catch (error) {
      console.warn('Failed to save draft:', error);
      return false;
    }
  },

  load: (userEmail) => {
    try {
      if (!userEmail) return null;
      const storageKey = getUserDraftKey(userEmail);
      if (!storageKey) return null;

      const stored = localStorage.getItem(storageKey);
      if (!stored) return null;

      const draftData = JSON.parse(stored);
      // Double-check that the stored email matches (extra security)
      if (draftData.userEmail === userEmail) {
        return draftData;
      }
      return null;
    } catch (error) {
      console.warn('Failed to load draft:', error);
      return null;
    }
  },

  clear: (userEmail) => {
    try {
      if (!userEmail) return false;
      const storageKey = getUserDraftKey(userEmail);
      if (!storageKey) return false;

      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.warn('Failed to clear draft:', error);
      return false;
    }
  },

  exists: (userEmail) => {
    const draft = draftManager.load(userEmail);
    return draft && draft.content && draft.content.trim() !== '' && draft.content !== '<p></p>';
  },

  // New method to clean up drafts from previous user sessions
  clearAllUserDrafts: () => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(DRAFT_STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.warn('Failed to clear all drafts:', error);
      return false;
    }
  }
};

const useJournalEditor = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [draftStatus, setDraftStatus] = useState(''); // '', 'saving', 'saved', 'restored'
  const [userEmail, setUserEmail] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [notificationModal, setNotificationModal] = useState({ isOpen: false, message: "", type: "" });
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Refs for debouncing and cleanup
  const saveTimeoutRef = useRef(null);
  const isRestoringRef = useRef(false);
  const previousUserEmailRef = useRef('');

  // Debounced save function
  const debouncedSave = useCallback((content, email) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setDraftStatus('saving');
    saveTimeoutRef.current = setTimeout(() => {
      const success = draftManager.save(content, email);
      if (success) {
        setDraftStatus('saved');
        setTimeout(() => setDraftStatus(''), 2000); // Clear status after 2 seconds
      } else {
        setDraftStatus('error');
        setTimeout(() => setDraftStatus(''), 3000);
      }
    }, DRAFT_SAVE_DELAY);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the default list extensions from StarterKit to avoid conflicts
        bulletList: false,
        orderedList: false,
        listItem: false,
        // Disable default history to use our custom configuration
        history: false,
      }),
      Underline,
      TextStyle,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      // Add list extensions explicitly with proper configuration
      BulletList.configure({
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
      ListItem,
      // Add History extension with proper configuration for undo/redo
      History.configure({
        depth: 100,
        newGroupDelay: 500,
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
    onUpdate: ({ editor }) => {
      // Auto-save draft when content changes
      if (!isRestoringRef.current && userEmail) {
        const content = editor.getHTML();
        debouncedSave(content, userEmail);
      }
    },
  });

  // Monitor authentication state and handle user switching
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const newUserEmail = user?.email || '';
      const previousEmail = previousUserEmailRef.current;

      // Check if user has changed (including logout scenarios)
      if (previousEmail !== newUserEmail) {
        // Clear the editor content when switching users
        if (editor && previousEmail) {
          isRestoringRef.current = true;
          editor.commands.clearContent();
          setDraftStatus('');
          // Reset restoration flag after a brief delay
          setTimeout(() => {
            isRestoringRef.current = false;
          }, 100);
        }

        // Update the user email
        setUserEmail(newUserEmail);
        previousUserEmailRef.current = newUserEmail;
      }
    });

    return () => unsubscribe();
  }, [editor]);

  // Restore draft when editor is ready and user is authenticated
  useEffect(() => {
    if (editor && userEmail && !isRestoringRef.current) {
      // Add a small delay to ensure user switching is complete
      const restoreTimeout = setTimeout(() => {
        const draft = draftManager.load(userEmail);
        if (draft && draft.content && draft.content.trim() !== '' && draft.content !== '<p></p>') {
          isRestoringRef.current = true;
          setDraftStatus('restored');

          // Set the content in the editor
          editor.commands.setContent(draft.content);

          // Show restoration message
          setTimeout(() => {
            setDraftStatus('');
            isRestoringRef.current = false;
          }, 3000);
        } else {
          // Ensure editor is empty if no draft exists for this user
          if (editor.getHTML() !== '<p></p>' && editor.getHTML().trim() !== '') {
            editor.commands.clearContent();
          }
        }
      }, 200);

      return () => clearTimeout(restoreTimeout);
    }
  }, [editor, userEmail]);

  // Cleanup timeout on unmount and handle component cleanup
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      // Reset restoration flag on unmount
      isRestoringRef.current = false;
    };
  }, []);

  // Additional safety: Clear editor content when no user is authenticated
  useEffect(() => {
    if (!userEmail && editor && !isRestoringRef.current) {
      const currentContent = editor.getHTML();
      if (currentContent !== '<p></p>' && currentContent.trim() !== '') {
        isRestoringRef.current = true;
        editor.commands.clearContent();
        setDraftStatus('');
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 100);
      }
    }
  }, [userEmail, editor]);

  // Clear draft function
  const clearDraft = useCallback(() => {
    if (userEmail) {
      draftManager.clear(userEmail);
      setDraftStatus('');
    }
  }, [userEmail]);

  const handleSubmit = () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      setNotificationModal({
        isOpen: true,
        message: "You must be logged in to submit a journal.",
        type: "error"
      });
      return;
    }

    const content = editor?.getHTML();
    if (!content?.trim()) {
      setNotificationModal({
        isOpen: true,
        message: "Please write something before submitting.",
        type: "error"
      });
      return;
    }

    // Open confirmation modal
    setConfirmModalOpen(true);
  };

  const confirmSubmit = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      setNotificationModal({
        isOpen: true,
        message: "You must be logged in to submit a journal.",
        type: "error"
      });
      return;
    }

    const content = editor?.getHTML();
    if (content?.trim()) {
      try {
        const response = await secureAxios.post(`${BASE_URL}/journal`, {
          content,
          email: user.email,
        });
        console.log(response.data);

        // Clear the draft on successful submission
        clearDraft();

        setConfirmModalOpen(false);
        navigate("/ViewJournal");
      } catch (err) {
        console.error(err);
        setNotificationModal({
          isOpen: true,
          message: "Failed to submit journal.",
          type: "error"
        });
        setConfirmModalOpen(false);
      }
    }
  };

  // Get draft info for current user
  const getDraftInfo = useCallback(() => {
    if (!userEmail) return null;
    return draftManager.load(userEmail);
  }, [userEmail]);

  return {
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
  };
};

export default useJournalEditor;
