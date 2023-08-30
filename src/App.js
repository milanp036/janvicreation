import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./components/auth/Login";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import PrivateLayout from "./components/PrivateLayout";
import Customer from "./components/Customer";
import CreateCustomer from "./components/CreateCustomer";
import EditCustomer from "./components/EditCustomer";
import DeletedCustomers from "./components/DeletedCustomers";
import CreateBill from "./components/CreteBill";

function App() {
  return (
    <>
      <AuthProvider>
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <Routes>
          <Route path="/" element={<PrivateLayout />}>
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" index element={<Dashboard />} />
              <Route path="/bill" element={<CreateBill />} />
              <Route path="/customer" element={<Customer />} />
              <Route
                path="/customer/create-customer"
                element={<CreateCustomer />}
              />
              <Route path="customer/edit-customer" element={<EditCustomer />} />
              <Route path="/deleted-customer" element={<DeletedCustomers />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
