import React from 'react';

const App: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('aaa');
  };

  return (
    <div className="App">
      <button onClick={handleClick}>aaaa</button>
    </div>
  );
};
export default App;
