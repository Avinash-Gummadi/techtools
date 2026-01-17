import React, { useState } from "react";
import TypingThroughInput from "./components/TypingThroughInput";
import { loremIpsum } from 'react-lorem-ipsum';
import SEO from '../../../../components/SEO';
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
  return (
    <>
      <SEO
        title="Speed Typing Practice | Improve Your Typing Speed Free"
        description="Master touch typing with our free speed typing practice tool. Advance through progressive difficulty levels and improve your WPM and accuracy instantly."
        canonical="https://techtools.gummadii.com/learn-typing"
        keywords="typing practice, speed typing test, improve typing speed, touch typing, free typing tools"
      />
      <Header />
      <div className="container mb-5" style={{ marginTop: "100px" }}>
        <div className="unit-5 text-center">
          <div className="unit-4-icon mr-4">
            <span className="feather-bootstrap bi bi-keyboard text-primary" style={{ fontSize: '2.5rem' }}></span>
          </div>
          <div>
            <h3>Learn Typing <a href="/typing-tips" target="_blank" title="typing tips"><span className="bi bi-info-circle-fill small text-muted"></span></a></h3>
            <p className="text-muted">Master your typing speed with progressive difficulty levels.</p>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-3" style={{ gap: "40px" }}>
          <h5 className="font-weight-bold">Level: {count}</h5>
          <h5 className="font-weight-bold text-danger">{paraSize < 5 ? "Easy" : paraSize < 10 ? "Medium" : "Difficult"}</h5>
        </div>
        <div className="p-4 rounded-lg border border-dark shadow-sm bg-white">
          <TypingThroughInput
            {...{ text: text, paraSize: paraSize }}
          />
          <div className="mt-4 border-top pt-3 d-flex justify-content-center gap-2">
            {count > 0 && <button className="btn btn-outline-danger btn-sm px-4" onClick={() => { settext("The quick brown fox jumps over the lazy dog"); setcount(0); setparaSize(0) }}>Start Over</button>}
            <button className="btn btn-primary btn-sm px-4" onClick={() => NextText()}>Next Question</button>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-5 pt-4 border-top">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h6 className="font-weight-bold text-dark mb-2">Why Practice Typing?</h6>
              <p className="text-muted small">
                In today's digital world, fast and accurate typing is a fundamental skill. It increases productivity, reduces physical strain, and allows you to communicate your ideas as fast as you think them.
              </p>
            </div>
            <div className="col-md-6 mb-4">
              <h6 className="font-weight-bold text-dark mb-2">Progressive Difficulty</h6>
              <p className="text-muted small">
                Our typing engine adapts to your progress. Start with simple sentences and advance to complex paragraphs as your speed (WPM) and accuracy improve over time.
              </p>
            </div>
            <div className="col-md-6 mb-4">
              <h6 className="font-weight-bold text-dark mb-2">Real-time Feedback</h6>
              <p className="text-muted small">
                The interactive input field provides instant visual cues on your performance, helping you identify and correct common mistakes before they become habits.
              </p>
            </div>
            <div className="col-md-6 mb-4">
              <h6 className="font-weight-bold text-dark mb-2">Completely Free</h6>
              <p className="text-muted small">
                Techtools Store offers unlimited typing practice without any paywalls or registration. Practice as much as you need to reach your professional goals.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TypingSkill;
