// __mocks__/react-router-dom.js
const react = require('react');

// Mock Link component
const Link = ({ to, children, className }) => 
  react.createElement('a', { href: to, className }, children);

// Mock useNavigate hook
const useNavigate = () => jest.fn();

// Mock useParams hook
const useParams = () => ({});

// Mock useLocation hook
const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null
});

// Mock Routes component
const Routes = ({ children }) => react.createElement('div', null, children);

// Mock Route component
const Route = ({ path, element }) => react.createElement('div', { 'data-testid': `route-${path}` }, element);

// Mock Navigate component
const Navigate = ({ to }) => react.createElement('div', { 'data-testid': `navigate-${to}` });

// Mock Router component
const BrowserRouter = ({ children }) => react.createElement('div', null, children);

module.exports = {
  Link,
  useNavigate,
  useParams,
  useLocation,
  Routes,
  Route,
  Navigate,
  BrowserRouter
};