import { Route, Routes } from "react-router-dom";
import AmaraaInvoiceGenerator from "./pages/dashboard/InvoiceGenrater";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./pages/components/ProtactiveRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AmaraaInvoiceGenerator />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
