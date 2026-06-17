import { useState } from "react";
import "./ProductAccordion.css";

const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <div
        className="accordion-header"
        onClick={() => setOpen(!open)}
      >
        <h4>{title}</h4>
        <span className="accordion-icon">
          {open ? "−" : "+"}
        </span>
      </div>

      <div className={`accordion-content ${open ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
