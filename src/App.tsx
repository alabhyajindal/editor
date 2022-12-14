import { SyntheticEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [isWordSelected, setIsWordSelected] = useState(false);

  useEffect(() => {
    if (isWordSelected && selectedWord !== '') {
      const getDefinition = async () => {
        const definition = await getSuggestions(selectedWord);
        definition !== undefined
          ? toast(definition)
          : toast('no definition found');
      };
      getDefinition();
    }
  }, [isWordSelected, selectedWord]);

  const getSelectedText = (
    e: SyntheticEvent<HTMLTextAreaElement, Event>
  ): void => {
    /**@ts-ignore */
    const startPosition = e.target.selectionStart;
    /**@ts-ignore */
    const endPosition = e.target.selectionEnd;
    /**@ts-ignore */
    const selection = e.target.value.substring(startPosition, endPosition);
    setSelectedWord(selection.trim());
    setIsWordSelected(true);
  };

  const getSuggestions = async (word: string) => {
    const endpoint = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${
      import.meta.env.VITE_MERRIAM_WEBSTER_API_KEY
    }`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const definition = data && data?.[0]?.shortdef?.[0];
    return definition;
  };

  return (
    <div className='App'>
      <p>
        start writing. you'll get suggestions for words when you highlight one.
      </p>
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
          setIsWordSelected(false);
        }}
        onSelect={getSelectedText}
      ></textarea>
      <Toaster
        position='bottom-center'
        toastOptions={{ style: { background: 'black', color: '#eee' } }}
      />
    </div>
  );
}

export default App;
