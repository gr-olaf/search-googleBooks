import SearchBar from './components/searchBar/SearchBar';
import BookList from './components/bookList/BookList';

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
