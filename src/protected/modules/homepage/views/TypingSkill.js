import React, { useState } from "react";
import TypingThroughInput from "./components/TypingThroughInput";
import { loremIpsum } from 'react-lorem-ipsum';
import DocumentMeta from 'react-document-meta';
import Header from "./Header";
import Footer from "./Footer";

const TypingSkill = () => {
  const [text, settext] = useState("The quick brown fox jumps over the lazy dog");
  const [count, setcount] = useState(0);
  const [paraSize, setparaSize] = useState(0);
  const NextText = () => {
    setcount(count + 1);
    var level = 4;
    if (count > 30) {
      level = 20;
    } else if (count > 20) {
      level = 15;
    } else if (count > 12) {
      level = 12;
    } else if (count > 8) {
      level = 10;
    } else if (count > 6) {
      level = 8;
    } else if (count > 3) {
      level = 6;
    }
    settext(loremIpsum({ startWithLoremIpsum: false, random: true, avgWordsPerSentence: level, avgSentencesPerParagraph: level })[0]);
    setparaSize(level);
  }
  const meta = {
    title: 'Learn Typing in WebLaunch Store',
    description: 'You can practice typing unlimited times level wise',
    canonical: 'https://techtools.gummadii.com/learn-typing',
    meta: {
      name: {
        keywords: 'typing, speed typing, fast typing'
      }
    }
  };
  return (
    <DocumentMeta {...meta}>
      <Header />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="unit-5 text-center">
          <div className="unit-4-icon mr-4">
            <span className="feather-bootstrap bi bi-keyboard"></span>
          </div>
          <div>
            <h3>Learn Typing <a href="/typing-tips" target="_blank" title="typing tips"><span className="bi bi-info-circle-fill"></span></a></h3>
            <p>You can practice typing with unlimited levels</p>
          </div>
        </div>
        <div className="d-flex justify-content-center" style={{ gap: "40px" }}>
          <h5 className="font-weight-bold">Level: {count}</h5>
          <h5 className="font-weight-bold text-danger">{paraSize < 5 ? "Easy" : paraSize < 10 ? "Medium" : "Difficult"}</h5>
        </div>
        <div className="p-4 rounded-lg border border-dark">
          <TypingThroughInput
            // text={
            //   "Uploaded and generated files are deleted 1 hour after upload. Read more"
            // }
            {...{ text: text, paraSize: paraSize }}
          // text={
          //   "What is an example of a paragraph? A good example of a paragraph contains a topic sentence, details and a conclusion. 'There are many different kinds of animals that live in China. Tigers and leopards are animals that live in China's forests in the north"
          // }
          />
          {count>0 && <button className="btn-danger btn-sm rounded border mr-3" onClick={() => {settext("The quick brown fox jumps over the lazy dog"); setcount(0); setparaSize(0)}}>Start Over</button>}
          <button className="btn-primary btn-sm rounded border" onClick={() => NextText()}>next</button>
        </div>
      </div>
      <Footer />
    </DocumentMeta>
  );
};

export default TypingSkill;
