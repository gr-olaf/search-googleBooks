import SearchBar from './components/SearchBar/SearchBar';
import BookList from './components/BookList/BookList';
import './App.css';

function App() {
	return (
		<div className="app" data-testid="app">
			<SearchBar />
			<BookList />
		</div>
	);
}

export default App;
