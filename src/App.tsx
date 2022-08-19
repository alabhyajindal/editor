import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [isWordSelected, setIsWordSelected] = useState(false);

  useEffect(() => {
    if (isWordSelected && selectedWord !== '') console.log(selectedWord);
  }, [isWordSelected, selectedWord]);

  const getSelectedText = (
    e: SyntheticEvent<HTMLTextAreaElement, Event>
  ): void => {
    // const startPosition = e.target.selectionStart;
    // const endPosition = e.target.selectionEnd;
    // const selection = e.target.value.substring(startPosition, endPosition);
    // setSelectedWord(selection.trim());
    // setIsWordSelected(true);
  };

  const getSuggestions = (): void => {};

  return (
    <div className='App'>
      <p>
        Start writing. You'll get suggestions for words when you highlight one.
      </p>
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
          setIsWordSelected(false);
        }}
        onSelect={getSelectedText}
      ></textarea>
    </div>
  );
}

export default App;
