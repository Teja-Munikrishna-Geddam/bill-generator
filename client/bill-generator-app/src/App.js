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
    </>
  );
}

export default App;
