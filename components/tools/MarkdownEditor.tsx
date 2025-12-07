import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateStandardResponse } from '../../services/geminiService';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Hello Markdown\n\nStart writing in **Markdown** on the left, and see the *preview* on the right!\n\n- Use the toolbar above to format.\n- Use the AI button to improve your writing.\n\n```javascript\nconsole.log("Code blocks are supported too!");\n```');
  const [isThinking, setIsThinking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end);

    const newText = previousText.substring(0, start) + before + selectedText + after + previousText.substring(end);
    setMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleAiImprove = async () => {
    if (!markdown.trim()) return;
    setIsThinking(true);
    try {
      const prompt = `Act as a professional editor. Improve the grammar, flow, and clarity of the following markdown text while strictly preserving all markdown formatting syntax (headers, bold, lists, code blocks, etc). Return only the improved markdown content:\n\n${markdown}`;
      const improvedText = await generateStandardResponse(prompt);
      setMarkdown(improvedText);
    } catch (error) {
      console.error("AI Error:", error);
      alert("Failed to improve text.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4 animate-fade-in">
      {/* Toolbar */}
      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="material-icons mr-3 text-sky-400">code</span>
          <h2 className="text-xl font-bold text-white">Markdown Editor</h2>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700 overflow-x-auto max-w-full">
          <button onClick={() => insertText('**', '**')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Bold">
            <span className="material-icons text-lg">format_bold</span>
          </button>
          <button onClick={() => insertText('*', '*')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Italic">
            <span className="material-icons text-lg">format_italic</span>
          </button>
          <button onClick={() => insertText('~~', '~~')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Strikethrough">
            <span className="material-icons text-lg">strikethrough_s</span>
          </button>
          <div className="w-px h-6 bg-slate-700 mx-1"></div>
          <button onClick={() => insertText('# ')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Heading 1">
            <span className="material-icons text-lg">title</span>
          </button>
          <button onClick={() => insertText('## ')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded text-xs font-bold w-8 flex items-center justify-center transition" title="Heading 2">H2</button>
          <div className="w-px h-6 bg-slate-700 mx-1"></div>
          <button onClick={() => insertText('- ')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Bullet List">
            <span className="material-icons text-lg">format_list_bulleted</span>
          </button>
          <button onClick={() => insertText('1. ')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Numbered List">
            <span className="material-icons text-lg">format_list_numbered</span>
          </button>
          <div className="w-px h-6 bg-slate-700 mx-1"></div>
          <button onClick={() => insertText('`', '`')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Inline Code">
            <span className="material-icons text-lg">code</span>
          </button>
          <button onClick={() => insertText('```\n', '\n```')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Code Block">
            <span className="material-icons text-lg">terminal</span>
          </button>
          <button onClick={() => insertText('> ')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Quote">
            <span className="material-icons text-lg">format_quote</span>
          </button>
          <button onClick={() => insertText('[', '](url)')} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition" title="Link">
            <span className="material-icons text-lg">link</span>
          </button>
        </div>

        <button 
          onClick={handleAiImprove}
          disabled={isThinking || !markdown.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition shadow-lg ${isThinking ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white'}`}
        >
          {isThinking ? (
            <>
              <span className="material-icons animate-spin text-sm">refresh</span>
              <span>Refining...</span>
            </>
          ) : (
            <>
              <span className="material-icons text-sm">auto_fix_high</span>
              <span>AI Improve</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        {/* Editor Input */}
        <div className="flex-1 flex flex-col bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-700 text-xs text-slate-500 uppercase tracking-widest font-semibold flex justify-between items-center">
            <span>Editor</span>
            <span className="text-[10px]">{markdown.length} chars</span>
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full bg-slate-800 p-6 text-slate-300 focus:outline-none font-mono text-sm leading-relaxed resize-none custom-scrollbar"
            spellCheck={false}
            placeholder="Type markdown here..."
          />
        </div>

        {/* Live Preview */}
        <div className="flex-1 flex flex-col bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-700 text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Preview
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-slate-800 prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 custom-scrollbar">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;