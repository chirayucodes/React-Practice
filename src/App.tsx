import { useCallback, useState } from 'react';
import BookDetails from './components/BookDetails';
import './App.css';


function App() {
    const [value, setValue] = useState('');
    
     const handleClick = useCallback(() => {
    setValue('Book List');
  }, []);

    return (
        <div className="css-class">
            <h1>{value}</h1>
            <button onClick ={handleClick}>Click</button>

        <BookDetails/>
        </div>
    );

}


export default App;
