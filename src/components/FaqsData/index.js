import './index.css'

const FaqsData = props => {
  const {faqDetails} = props
  const {answer, question} = faqDetails

  return (
    <li className="each-faq-container">
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}

export default FaqsData
