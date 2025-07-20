import { BrowserRouter as Router, Route, Routes, Link as RouterLink, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Link, CssBaseline, Button } from '@mui/material';
import ClientListPage from './pages/ClientListPage';
import ClientFormPage from './pages/ClientFormPage';
import EstimateListPage from './pages/EstimateListPage';
import EstimateFormPage from './pages/EstimateFormPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';



function Navigation() {
  const { currentUser, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
            BuildMas
          </Link>
        </Typography>
        {currentUser && (
          <>
            <Link component={RouterLink} to="/clients" color="inherit" sx={{ mr: 2, textDecoration: 'none' }}>
              Clients
            </Link>
            <Link component={RouterLink} to="/estimates" color="inherit" sx={{ textDecoration: 'none' }}>
              Estimates
            </Link>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Navigation />
        <Container component="main" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/clients" element={<ProtectedRoute><ClientListPage /></ProtectedRoute>} />
            <Route path="/clients/new" element={<ProtectedRoute><ClientFormPage /></ProtectedRoute>} />
            <Route path="/clients/edit/:id" element={<ProtectedRoute><ClientFormPage /></ProtectedRoute>} />
            <Route path="/estimates" element={<ProtectedRoute><EstimateListPage /></ProtectedRoute>} />
            <Route path="/estimates/new" element={<ProtectedRoute><EstimateFormPage /></ProtectedRoute>} />
            <Route path="/estimates/edit/:id" element={<ProtectedRoute><EstimateFormPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/clients" />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
