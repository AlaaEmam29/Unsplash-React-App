import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [newImage, setNewImage] = useState(false);
  const mounted = useRef(false);
  const mainURl = `https://api.unsplash.com/photos/?client_id=`;
  const apiKey = `${process.env.REACT_APP_ACCESS_KEY}`;
  const searchURL = `https://api.unsplash.com/search/photos/?client_id=`;
  const fetchApi = async () => {
    setLoading(true);
    const pageURL = `&page=${page}`;
    const queryURL = `&query=${query}`;
    let url = ``;
if (query) {
  url = `${searchURL}${apiKey}${pageURL}${queryURL}`;
}
else{
   url = `${mainURl}${apiKey}${pageURL}`;

}
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((prevState) => {
        if (query && page === 1) {
          return data.results;
        } 
        else if (query ) {

          return [...prevState, ...data.results];
        }
       
        else {
          return [...prevState, ...data];
        }
      });
      setNewImage(false);
      setLoading(false);
    } catch (error) {
      setNewImage(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [page]);


  useEffect(() => {
    if(!mounted.current){
      mounted.current = true;
      return;
    }
    if (!newImage) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);

  }, [newImage]);
  const event = () => {
    if ( window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImage(true);
    }
  };

useEffect(() => {
  window.addEventListener("scroll", event);
  return () => window.removeEventListener("scroll", event);

}, );

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!query) return;
    if(page ===1) {
      fetchApi();
      return;
    }
    setPage(1);
    }
    const handleQuery = (e) => {
      setQuery(e.target.value);
    }
  
  return (
    <AppContext.Provider value={{loading,photos,handleSubmit,handleQuery,query }}>
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { useGlobalContext, AppProvider };
