import BillForm from "./components/BillForm";
import Dashboard from "./components/Dashboard";
import InvoiceList from "./components/InvoiceList";

function App() {
  return (
    <>
      <BillForm />
      <hr />
      <InvoiceList />
      <hr />
      <Dashboard />
      <footer style={{ textAlign: "center", margin: "20px 0", paddingTop: "10px", borderTop: "1px solid #ccc" }}>
        &copy; {new Date().getFullYear()} Bill Generator App - All rights reserved by Teja Munikrishna Geddam
      </footer>
    </>
  );
}

export default App;
