import './App.css';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import TodoList from './components/TodoList/TodoList';
import AuthForm from './components/Auth/AuthForm';

function App() {
    return (
        <GlobalContextProvider>
            <Router>
                <Routes>
                    {/* 로그인 페이지 */}
                    <Route path="/" element={<AuthForm />} />
                    {/* 투두리스트 페이지 */}
                    <Route
                        path="/todo"
                        element={
                            <>
                                <Calendar />
                                <TodoList />
                            </>
                        }
                    />
                </Routes>
            </Router>
        </GlobalContextProvider>
    );
}

export default App;