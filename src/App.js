import { useState, useEffect } from "react"; 
import axios from "axios";
import ArticleCard from './components/ArticleCard';
import ReactPaginate from "react-paginate";
import './index.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState(""); // empty string
  const [searchInput, setSearchInput] = useState("");
  // const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setQuery(searchInput);
  }

  const handlePageChange = (e) => {
    console.log(e);
    setCurrentPage(e.selected);
  }

  // const handleCheckBoxChange = (e) => {
  //   e.preventDefault();
  //   setTags(tags => [...tags, e.target.value]);
  // }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async() => {
      try{
        // fetch data from api
        const {data} = await axios.get("http://hn.algolia.com/api/v1/search?", 
        {
          params: {page: currentPage, query},
        }
        );
        const {hits, nbPages} = data;
        setArticles(hits);
        setTotalPages(nbPages);
        console.log(data);
      } catch(err){
        console.log(err);
      } finally{
        setIsLoading(false);
      }

    };
    
    fetchData();

  }, [currentPage, query])




  return (
    <> 
    <h1 className="font-bold text-[30px] bg-orange-400 w-full p-2 text-center">Hacker news</h1>
      
      <form className="flex justify-center mt-3" onSubmit={handleSubmit}>
        <input
          className="p-2 bg-yellow-50 m-2" 
          type="text"
          placeholder="Search for the news"
          onChange={e => setSearchInput(e.target.value)} 
        />
        <button className="bg-blue-100 p-2 m-2 rounded-lg" type="submit">Search</button>
        <p className="mt-2 mb-2 p-2 text-semibold">Filters :</p>
        <label className="mt-2 mb-2 p-2" htmlFor="story">Story</label>
        <input 
          type="checkbox"
          placeholder="story"
          // onChange={handleCheckBoxChange}
        />
         <label className="mt-2 mb-2 p-2" htmlFor="Popularity">Popularity</label>
        <input
          type="checkbox"
          placeholder="poll"
          // onChange={handleCheckBoxChange}
        />
        {/* <input
          type="checkbox"
          placeholder="All-time"
          onChange={setTags(tags => [...tags, 'all-time'])}
        /> */}
       
      </form>

      <div>
        {
          isLoading ? <p>Loading .....</p> : 
          (articles.map(article => <ArticleCard article = {article} key = {article.objectID} />))
        }
      </div>
      <ReactPaginate
        nextLabel = ">>"
        previousLabel = "<<"
        breakLabel = "...."
        forcePage={currentPage}
        pageCount = {totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        className = "pagination flex justify-center m-2 p-2"
        activeClassName="active-page"
        previousClassName="previous-page"
        nextClassName="next-page"
      />
    </>
  );
}

export default App;
