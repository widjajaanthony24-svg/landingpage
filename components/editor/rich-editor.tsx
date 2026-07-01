"use client";

import { useState } from "react";
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Link, Minus, Eye, Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichEditorProps {
  content: string;
  onChange: (value: string) => void;
}

type ToolbarAction = {
  icon: React.ReactNode;
  label: string;
  action: (text: string, selStart: number, selEnd: number) => { text: string; cursor: number };
};

function wrap(before: string, after: string, text: string, start: number, end: number) {
  const selected = text.slice(start, end);
  const newText = text.slice(0, start) + before + selected + after + text.slice(end);
  return { text: newText, cursor: end + before.length + after.length };
}

function insertLine(prefix: string, text: string, start: number, end: number) {
  const lineStart = text.lastIndexOf("\n", start - 1) + 1;
  const newText = text.slice(0, lineStart) + prefix + text.slice(lineStart);
  return { text: newText, cursor: start + prefix.length };
}

const tools: ToolbarAction[] = [
  { icon: <Bold size={14} />, label: "Bold", action: (t, s, e) => wrap("**", "**", t, s, e) },
  { icon: <Italic size={14} />, label: "Italic", action: (t, s, e) => wrap("_", "_", t, s, e) },
  { icon: <Heading2 size={14} />, label: "H2", action: (t, s, e) => insertLine("## ", t, s, e) },
  { icon: <Heading3 size={14} />, label: "H3", action: (t, s, e) => insertLine("### ", t, s, e) },
  { icon: <List size={14} />, label: "List", action: (t, s, e) => insertLine("- ", t, s, e) },
  { icon: <ListOrdered size={14} />, label: "Ordered List", action: (t, s, e) => insertLine("1. ", t, s, e) },
  { icon: <Quote size={14} />, label: "Quote", action: (t, s, e) => insertLine("> ", t, s, e) },
  { icon: <Code size={14} />, label: "Code", action: (t, s, e) => wrap("`", "`", t, s, e) },
  { icon: <Minus size={14} />, label: "Divider", action: (t, s, e) => ({ text: t.slice(0, s) + "\n---\n" + t.slice(e), cursor: s + 5 }) },
];

// Very simple markdown preview
function renderMarkdown(md: string) {
  return md
    .replace(/^### (.+)$/gm, "<h3 class='text-lg font-semibold mt-4 mb-1'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-xl font-semibold mt-6 mb-2'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-2xl font-bold mt-8 mb-3'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-muted px-1 py-0.5 rounded text-xs font-mono'>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote class='border-l-2 border-muted-foreground/30 pl-4 text-muted-foreground my-2'>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li class='ml-4 list-decimal'>$1</li>")
    .replace(/^---$/gm, "<hr class='border-border my-4' />")
    .replace(/\n\n/g, "</p><p class='mb-3'>")
    .replace(/\n/g, "<br />");
}

export function RichEditor({ content, onChange }: RichEditorProps) {
  const [preview, setPreview] = useState(false);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  const applyTool = (tool: ToolbarAction) => {
    if (!textareaRef) return;
    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const result = tool.action(content, start, end);
    onChange(result.text);
    setTimeout(() => {
      textareaRef.focus();
      textareaRef.setSelectionRange(result.cursor, result.cursor);
    }, 0);
  };

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 p-2 border-b border-border bg-muted/30 flex-wrap">
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            title={tool.label}
            onClick={() => applyTool(tool)}
            className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            {tool.icon}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPreview(false)}
            className={cn("flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors", !preview ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <Edit3 size={12} /> Write
          </button>
          <button
            type="button"
            onClick={() => setPreview(true)}
            className={cn("flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors", preview ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <Eye size={12} /> Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div
          className="p-4 min-h-[400px] text-sm leading-relaxed prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: `<p class='mb-3'>${renderMarkdown(content)}</p>` }}
        />
      ) : (
        <textarea
          ref={setTextareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your post in Markdown...

## Introduction

Start writing here. Use the toolbar above or type Markdown directly.

**Bold**, _italic_, `code`, > quotes all work."
          className="w-full min-h-[400px] p-4 text-sm font-mono bg-transparent outline-none resize-none placeholder:text-muted-foreground/40 leading-relaxed"
        />
      )}
    </div>
  );
}
