import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingOverlay from './components/loadingOverlay'; // ✅ Spinner used while lazy loading
import LoadingPage from './Pages/LoadingPage';

// Public
const Homepage = lazy(() => import('./Pages/homepage'));
const Slider = lazy(() => import('./components/slider'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const SignIn = lazy(() => import('./Pages/SignIn'));

// Student
const StudentDashboard = lazy(() => import('./Pages/Student/StudentDashboard'));
const Attendance = lazy(() => import('./Pages/Student/Attendance'));
const Resources = lazy(() => import('./Pages/Student/Resources'));
const Journal = lazy(() => import('./Pages/Student/Journal'));
const ViewJournal = lazy(() => import('./Pages/Student/ViewJounal'));
const Explore = lazy(() => import('./Pages/Explore'));
const PM = lazy(() => import('./Pages/Student/PM'));
const CD = lazy(() => import('./Pages/Student/CD'));
const UIUX = lazy(() => import('./Pages/Student/UIUX'));
const SQA = lazy(() => import('./Pages/Student/SQA'));

// Coordinator
const CompanyDashboard = lazy(() => import('./Pages/Coordinator/CompanyDashboard'));
const CompanyAttendance = lazy(() => import('./Pages/Coordinator/CompanyAttendance'));
const CompanyJournal = lazy(() => import('./Pages/Coordinator/CompanyJournal'));
const CompanyViewJournal = lazy(() => import('./Pages/Coordinator/CompanyViewJournal'));

// Admin
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));
const CompanyList = lazy(() => import('./Pages/Admin/CompanyList'));

// Route Protection
import ProtectedRoute from './components/ProtectedRoute';

//For Recently Accessed Role
import TrackRoleVisit from "./components/TrackRoleVisit";

function App() {
  return (
    <Router>
      <TrackRoleVisit> {/* ✅ Wrap the entire routing tree */}
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoadingPage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Explore" element={<Explore />} />

            {/* Student Routes */}
            <Route
              path="/StudentDashboard"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Attendance"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Resources"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <Resources />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Journal"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <Journal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ViewJournal"
              element={
                <ProtectedRoute allowedRoles={["Student"]}>
                  <ViewJournal />
                </ProtectedRoute>
              }
            />

            {/* Coordinator Routes */}
            <Route
              path="/CompanyDashboard"
              element={
                <ProtectedRoute allowedRoles={["Coordinator"]}>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CompanyAttendance"
              element={
                <ProtectedRoute allowedRoles={["Coordinator"]}>
                  <CompanyAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CompanyJournal"
              element={
                <ProtectedRoute allowedRoles={["Coordinator"]}>
                  <CompanyJournal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CompanyViewJournal/:id"
              element={
                <ProtectedRoute allowedRoles={["Coordinator"]}>
                  <CompanyViewJournal />
                </ProtectedRoute>
              }
            />

            {/* Admin Route */}
            <Route
              path="/AdminDashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CompanyList"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <CompanyList />
                </ProtectedRoute>
              }
            />

            {/* Recently Accessed Role Routes */}
            <Route path="/PM" element={<PM />} />
            <Route path="/CD" element={<CD />} />
            <Route path="/UIUX" element={<UIUX />} />
            <Route path="/SQA" element={<SQA />} />

            {/* Unauthorized Fallback */}
            <Route
              path="/unauthorized"
              element={
                <div className="text-center mt-20 text-2xl text-red-500">
                  Unauthorized Access
                </div>
              }
            />
          </Routes>
        </Suspense>
      </TrackRoleVisit>
    </Router>
  );
}


export default App;
