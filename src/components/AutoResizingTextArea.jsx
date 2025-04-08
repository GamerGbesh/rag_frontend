import React, { useState, useRef, useEffect } from 'react';
import styles from "../css/autoresizing.module.css";

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

        const minHeight = lineHeight * minRows;
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
        <div className={styles.textareaContainer}>
            <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={minRows}
                {...props}
            />
            <button className={styles.submit} type="button" onClick={() => {
                handleClick(textareaRef.current.value)
                setValue("")
            }}>
                ↑
            </button>
        </div>
    );
};

export default AutoResizingTextarea;
