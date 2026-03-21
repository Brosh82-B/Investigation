import React, { useEffect, useState } from "react";
import axios from "axios";
import Hebcal from "hebcal";
import { NotificationManager } from "react-notifications";
import "./MainForm.css";
import SignatureInput from "../SignatureInput/SignatureInput";

// Reusable Input Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  dir = "rtl",
}) => (
  <div className="input-block">
    <label className="form-input-label">{label}</label>
    <input
      type={type}
      name={name}
      className="form-input"
      dir={dir}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable Select Component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  dir = "rtl",
}) => (
  <div className="input-block">
    <label className="form-input-label">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      dir={dir}
      className="form-input"
    >
      <option value="">בחר {label}...</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Reusable Textarea Component with auto-resize
const TextareaField = ({ label, name, value, onChange, dir = "rtl" }) => {
  const textareaRef = React.useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  React.useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="input-block">
      <label className="form-input-label">{label}</label>
      <textarea
        ref={textareaRef}
        name={name}
        className="form-input"
        dir={dir}
        value={value}
        onChange={onChange}
        style={{ minHeight: "60px", resize: "vertical" }}
      />
    </div>
  );
};

const MainForm = ({
  formConfig,
  onSubmit,
  scriptUrl,
  hebrewMonthNames = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ],
}) => {
  // Initialize formState including signature
  const [formState, setFormState] = useState(
    formConfig.reduce((state, field) => {
      state[field.name] = field.defaultValue || "";
      return state;
    }, {})
  );

  const handleSignatureChange = (dataURL) => {
    setFormState((prev) => ({ ...prev, signature: dataURL }));
  };

  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) =>
          prevDots === "..." ? "" : prevDots + "."
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate all fields including signature
      const isFormValid = Object.values(formState).every((val) => val !== "");

      if (!isFormValid) {
        NotificationManager.error("בבקשה למלא את כל הפרטים", "שגיאה", 3000);
        return;
      }

      setLoading(true);

      const currentDate = new Date();
      const today = new Hebcal.HDate();
      const hebrewDateStr = today.toString("h");
      const hebrewDateArray = hebrewDateStr.split(" ");

      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("g_day", currentDate.getDate());
      formData.append(
        "g_month",
        "ב" + hebrewMonthNames[currentDate.getMonth()]
      );
      formData.append("g_year", currentDate.getFullYear());
      formData.append("h_day", hebrewDateArray[0]);
      formData.append("h_month", hebrewDateArray[1]);
      formData.append("h_year", hebrewDateArray[2]);

      const response = await axios.post(scriptUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);

      window.location.href = response.data.pdfURL;
      NotificationManager.success("הקובץ ירד תוך מספר שניות", "המתן", 3000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      NotificationManager.error("לא הצליח לייצר את הקובץ", "שגיאה", 3000);
    }
  };

  const topMessage = `חיילים יקרים שימו לב,
לאחר מילוי התשובות, הקובץ יורד כ-pdf.
יש לכתוב את התחקיר בצורה ממוקדת ועניינית.`;

  const bottomMessage = `
  כאן בשבילכם,
מדור נפגעים חטיבת גבעתי

אחיה ס׳ רמ״ד נפגעים - 058-5970777  
יעל ע׳ רמ״ד נפגעים - 054-3377526`;

  return (
    <div className="main-form">
      <p
        style={{ justifySelf: "center", fontSize: "0.9rem", direction: "rtl" }}
      >
        {topMessage.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>

      {formConfig.map((field) =>
        field.type === "select" ? (
          <SelectField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formState[field.name]}
            onChange={handleInputChange}
            options={field.options}
            dir={field.dir}
          />
        ) : field.type === "textarea" ? (
          <TextareaField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formState[field.name]}
            onChange={handleInputChange}
            dir={field.dir}
          />
        ) : field.type === "signature" ? (
          <div
            key={field.name}
            style={{ direction: "rtl", marginBottom: "10px" }}
          >
            <h4 style={{ marginBottom: "0" }}>{field.label}</h4>
            <SignatureInput onChange={handleSignatureChange} />
          </div>
        ) : (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formState[field.name]}
            onChange={handleInputChange}
            type={field.type}
            dir={field.dir}
          />
        )
      )}

      <button
        className={`submit-button ${loading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? `${loadingDots}מייצר את המסמך` : `הורד מסמך`}
      </button>

      {/* <p style={{ marginTop: "0vh", textAlign: "center", direction: "rtl" }}>
        {bottomMessage.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p> */}
    </div>
  );
};

export default MainForm;
