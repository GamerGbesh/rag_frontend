import React, { useState, useRef, useEffect } from 'react';

const AutoResizingTextarea = ({
                                  placeholder = 'Type here...',
                                  minRows = 1,
                                  maxRows = 10,
                                  handleClick,
                                  ...props
                              }) => {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';
        const style = window.getComputedStyle(textarea);
        const lineHeight = parseFloat(style.lineHeight);

        const maxHeight = lineHeight * maxRows;

        textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    };

    useEffect(() => {
        resizeTextarea();
    }, [value]);

    const handleChange = (e) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.ctrlKey || e.metaKey) {
                // Insert newline manually
                const start = textareaRef.current.selectionStart;
                const end = textareaRef.current.selectionEnd;

                const newValue =
                    value.substring(0, start) + "\n" + value.substring(end);

                setValue(newValue);

                // Move the cursor after the new line
                requestAnimationFrame(() => {
                    textareaRef.current.selectionStart =
                        textareaRef.current.selectionEnd = start + 1;
                });

                e.preventDefault(); // prevent default newline just in case
            } else {
                e.preventDefault();
                handleClick?.(textareaRef.current.value);
                setValue("")
            }
        }
    };


    return (
        <div className="fixed bottom-4 left-0 right-0 px-4 md:absolute md:bottom-16 md:right-[14%] md:left-auto md:w-2/3">
            <div className="flex items-end gap-2 w-full bg-white p-2 rounded-t-xl shadow-lg md:shadow-none md:bg-transparent">
    <textarea
        ref={textareaRef}
        className="flex-1 min-h-[48px] max-h-[120px] p-3 border border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                resize-none transition-all text-base md:max-h-[15em] md:rounded-2xl bg-white"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={minRows}
        {...props}
    />
                <button
                    className="mb-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full
                transition-all active:scale-95 flex-shrink-0"
                    type="button"
                    onClick={() => {
                        handleClick(textareaRef.current.value);
                        setValue("");
                    }}
                    aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AutoResizingTextarea;
