import qs from "../json/faq.json";
import Question from "./question";

const renderQs = () => {
  const QList: JSX.Element[] = [];

  qs.map((q, i) => {
    QList.push(<Question title={q.q} content={q.a} key={i} />);
  });

  return QList;
};

const Questions: React.FC = () => {
  return (
    <div className="w-screen h-full overflow-scroll flex flex-col items-center m-12 gap-4">
      {renderQs()}
    </div>
  );
};

export default Questions;
