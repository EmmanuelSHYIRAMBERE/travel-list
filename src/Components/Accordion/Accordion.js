import AccrodionItem from "./AccrodionItem";
import "./accrordionStyles.css";

const frequentlyAskedQuestions = [
  {
    title: "What is your return policy?",
    text: "Our return policy allows you to return items within 30 days of the purchase date for a full refund. Please review our detailed return policy for more information.",
  },
  {
    title: "How can I track my order?",
    text: "You can easily track your order by visiting the 'Order Tracking' section on our website. Enter your order number and email address to get real-time updates on your shipment.",
  },
  {
    title: "Do you offer international shipping?",
    text: "Yes, we do offer international shipping. Please check our shipping page for a list of countries we ship to and the associated shipping fees.",
  },
  {
    title: "What payment methods do you accept?",
    text: "We accept major credit cards, debit cards, and PayPal as forms of payment. For a complete list of accepted payment methods, please visit our 'Payment Options' page.",
  },
  {
    title: "How do I reset my password?",
    text: "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions sent to your email to create a new password for your account.",
  },
  {
    title: "Can I modify or cancel my order after placing it?",
    text: "Unfortunately, once an order is placed, it cannot be modified or canceled. Please double-check your order before completing the purchase. If you have concerns, contact our customer support for assistance.",
  },
];

export default function Accordion() {
  return (
    <div>
      <div className="accrodion">
        {frequentlyAskedQuestions.map((element, index) => (
          <AccrodionItem
            title={element.title}
            text={element.text}
            num={index}
            key={element.title}
          />
        ))}
      </div>
    </div>
  );
}
