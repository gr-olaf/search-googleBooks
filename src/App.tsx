import SearchBar from './components/SearchBar';
import BookList from './components/BookList';

function App() {
	return (
		<div
			style={{
				width: '80%',
				margin: '0 auto',
			}}
		>
			<SearchBar />
			<BookList />
		</div>
	);
}

export default App;
