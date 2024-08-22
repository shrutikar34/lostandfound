import React from "react";
import ReportCard from "./ReportCard";
import styles from "./Body.module.css";
export default function Body() {
  return (
    <div className={`${styles.body}`}>
      <ReportCard
        title={"Report Lost Item"}
        body={"Fill up the form to report lost item."}
        link={"reportlostitem"}
      />
      <ReportCard
        title={"Report Found Item"}
        body={"Fill up the form to report found item."}
        link={"reportfounditem"}
      />

      <ReportCard
        title={"Contact Us"}
        body={"Get in touch with us for any questions or feedback."}
        link={"Contactus"}
      />
    </div>
  );
}
