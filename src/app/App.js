import '../style/index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Episodes from '../components/Episodes';
import EpisodePage from '../components/EpisodePage';
import Contact from '../components/Contact';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episodes/:episodeId" element={<EpisodePage />} />
            <Route path="/contact" element={<Contact />} />
        </Route>
    )
);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
