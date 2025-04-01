import React, { useState, useRef, useEffect } from 'react';

const AutoResizingTextarea = ({
                                  placeholder = 'Type here...',
                                  minRows = 1,
                                  maxRows = 10,
                                  ...props
                              }) => {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to get accurate scrollHeight
            textareaRef.current.style.height = 'auto';

            // Calculate the required height
            const scrollHeight = textareaRef.current.scrollHeight;
            const rowHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight, 10);
            const minHeight = rowHeight * minRows;
            const maxHeight = rowHeight * maxRows;

            // Set the height
            textareaRef.current.style.height = `${Math.min(
                Math.max(scrollHeight, minHeight),
                maxHeight
            )}px`;
        }
    }, [value, minRows, maxRows]);

    const handleChange = (e) => {
        setValue(e.target.value);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            style={{
                width: '100%',
                resize: 'none', // Disable user resizing
                overflow: 'hidden', // Hide scrollbar
                minHeight: `${parseInt(getComputedStyle(document.documentElement).lineHeight, 10) * minRows}px`,
                boxSizing: 'border-box', // Include padding in height calculation
                ...props.style,
            }}
            {...props}
        />
    );
};

export default AutoResizingTextarea;