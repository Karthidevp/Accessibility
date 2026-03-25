import AccessibilityWidget from "./accessibility/ui/AccessibilityWidget";
import AccessibilityTestPage from "./pages/AccessibilityTestPage";

function App() {
  return (
    <>

      <AccessibilityWidget />
         <AccessibilityTestPage />
      <h1>Hello</h1>

      <img src="test.jpg" alt="demo" />

      <p>
        Sample text for accessibility testing
      </p>

    </>
  );
}

export default App;