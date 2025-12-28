"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classess from "./Editor.module.css";

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={classess.editor} 
      style={{lineHeight: "5px",
      outline: "none",}}/>
    </div>
  );
}

function MenuBar({ editor }) {
  return (
    <div className={classess.menu}>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        B      
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        I
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        H2
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        L
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .updateAttributes("paragraph", { dir: "rtl" })
            .run()
        }
      >
        RTL
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .updateAttributes("paragraph", { dir: "ltr" })
            .run()
        }
      >
        LTR
      </button>
    </div>
  );
}
