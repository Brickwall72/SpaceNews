import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpaceImages } from '../features/spaceImagesSlice.js';
import WelcomePage from '../containers/welcomePage/WelcomePage.jsx';
import SpaceImageCarousel from '../components/spaceImageCarousel/SpaceImageCarousel.jsx';
import SearchResultsPage from '../containers/searchResultsPage/SearchResultsPage.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <WelcomePage /> } >
    <Route index element={ <SpaceImageCarousel />} />
    <Route path="/search" element={<SearchResultsPage />}/>
  </Route>
))

function App() {
  const dispatch = useDispatch();
  const cachedImages = useSelector((state) => state.spaceImages.images);

  useEffect(() => {
    if (cachedImages.length === 0) {
      dispatch(fetchSpaceImages());
    }
  }, [cachedImages.length, dispatch]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
