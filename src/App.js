import './App.css';
import AppRouter from './router/AppRouter';
import AuthContextProvider from "./context/AuthContext"
import MovieContextProvider from './context/MovieContext';

function App() {
  
  return (
    <>
      <AuthContextProvider>
        <MovieContextProvider>
          <AppRouter />
        </MovieContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
