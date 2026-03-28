import "./App.css";
import AppFooter from "./components/AppFooter/AppFooter";
import AppHeader from "./components/AppHeader/AppHeader";
import MainForm from "./components/MainForm/MainForm";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signature Image Data:", signature);
    // You can send this base64 string to your backend
  };

  const formConfig = [
    { name: "fullName", label: "שם מלא", type: "text", defaultValue: "" },
    { name: "title", label: "כותרת", type: "text", defaultValue: "" },
    {
      name: "date",
      label: "(תאריך ושעה) מועד האירוע",
      type: "date",
      defaultValue: "",
    },
    { name: "time", label: "שעת האירוע", type: "text", defaultValue: " " },
    { name: "location", label: "מקום", type: "text", defaultValue: "" },
    { name: "unit", label: "יחידה", type: "text", defaultValue: "" },
    {
      name: "description",
      label: "תיאור האירוע",
      type: "text",
      defaultValue: "",
    },
    {
      name: "result",
      label: "תוצאות האירוע",
      type: "text",
      defaultValue: "",
    },
    {
      name: "investigator",
      label: "גורם מתחקר",
      type: "text",
      defaultValue: "",
    },
    {
      name: "participants",
      label: "משתתפים בתחקיר (שם, תפקיד, מספר אישי)",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "background",
      label: "ממצאים - רקע",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "findings",
      label: "ממצאים - רצף כרונולוגי",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "more",
      label: "ממצאים נוספים",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "factors",
      label: "גורמים לאירוע",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "errors1",
      label: "תקלות",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "errors2",
      label: "שגיאות",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "lessons",
      label: "לקחים",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "recommendations",
      label: "המלצות",
      type: "textarea",
      defaultValue: "",
    },
    {
      name: "summary",
      label: "סיכום מפקד",
      type: "textarea",
      defaultValue: " ",
    },
    // {
    //   name: "background",
    //   label: "חתימה",
    //   type: "signature",
    //   defaultValue: "",
    // },

    {
      name: "WORD_PDF",
      label: "WORD או PDF?",
      type: "select",
      options: ["WORD", "PDF"],
      defaultValue: "לא",
    },
  ];
  return (
    <div className="App">
      <AppHeader />
      <div className="main">
        <MainForm
          formConfig={formConfig}
          scriptUrl="https://script.google.com/macros/s/AKfycbyPW_DnDXKy6qlmOPst4MWdMkVv9KYhA07I1EC3OEdYSHaCFb5FGnrM03gQlXnfLkyZLg/exec"
        />
      </div>
      {/* <form onSubmit={handleSubmit}>
      <h2>Please Sign Below:</h2>
      <SignatureInput onChange={(data) => setSignature(data)} />
      <br />
      <button type="submit">Submit</button>

      {signature && (
        <>
          <h3>Preview:</h3>
          <img src={signature} alt="Signature" style={{ border: "1px solid #000" }} />
        </>
      )}
    </form> */}
      <AppFooter />
      <NotificationContainer />
    </div>
  );
}

export default App;
