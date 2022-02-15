import Card from './Components/Card';
function App() {
  return (
    <div className='App'>
      <Card values={[1, 3, 'A', 'A']} />
      <Card values={[6, 6, 6, 6]} />
      <Card values={[0, 1, 2, 3]} />
    </div>
  );
}

export default App;
