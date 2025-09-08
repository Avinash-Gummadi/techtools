import React from 'react';
import DocumentMeta from 'react-document-meta';
import Header from './Header';
import Footer from './Footer';

const TypingTips = () => {
    const meta = {
        title: 'Tips for Typing | Techtools Store',
        description: 'List your Bucket of Works. You can edit, complete, delete the list',
        canonical: 'https://techtools.gummadii.com/todo',
        meta: {
            name: {
                keywords: 'ToDo, Bucket, Works, Tasks'
            }
        }
    };
    return (
        <DocumentMeta {...meta}>
            <Header />
            <div className='container' style={{ marginTop: "100px" }}>
                <div className='d-flex align-items-center'>
                    <div className="w-50">
                        <div className="w-75">
                            <h1 className='fs-2rem fw-800'>5 Tips for Improving Your Typing Speed & Accuracy</h1>
                            <p className='fs-125rem'>Knowing the placement of your computer keyboard is fastly becoming a standard skill. Here are five tips to keep you up to speed on your keyboard skills.</p>
                        </div>
                    </div>
                    <div className="w-50">
                        <img src="images/typing_rules.png" width={"700px"} height={"470px"} style={{ borderRadius: "5px" }} alt="" />
                    </div>
                </div>
                <div className='mt-5'>
                    <div key={1}>
                        <div className='w-100'>
                            <h1 className='fs-125rem fw-800'>1) Use the correct starting position</h1>
                            <p className='fs-108rem'>When practicing your typing skills, it’s important to use proper hand placement. To start, keep your fingers positioned over the home row keys (left hand over the A, S, D, and F keys, and the right hand over the J, K, L, and ; keys), with your thumbs hovering over the space bar. From here, you can move your fingers slightly to reach neighboring keys. Your hands should always return this starting position.</p>
                            <div className='w-75 m-auto'>
                                <img src="images/keyboard_pos.png" width={"900px"} height={"500px"} style={{ borderRadius: "5px" }} alt="" />
                            </div>
                            <p className='fs-108rem mt-3'>These conventions are meant to help you familiarize yourself with the keyboard. As you become more experienced, you can experiment with different variations of this starting position to find the placement that is most comfortable and natural for you.</p>
                        </div>
                    </div>
                    <div key={2} className='d-flex align-items-center gap-20 m-3'>
                        <div className='w-60'>
                            <h1 className='fs-125rem fw-800'>2) Don’t look down your hands</h1>
                            <p className='fs-108rem'>Instead of looking down at your hands, focus on your screen. This can be difficult at first, especially if you have not yet mastered the exact placement of the keys. However, looking at the screen will help improve your accuracy because you will be able to catch your typos as they occur. You’ll also begin to memorize the placement of the keys, so you’ll be able to type more quickly as you practice.</p>
                        </div>
                        <div className='w-35'>
                            <img src="images/typing_hero.png" width={"390px"} height={"200px"} style={{ borderRadius: "5px" }} alt="" />
                        </div>
                    </div>
                    <div key={3} className='d-flex align-items-center gap-20 m-3'>
                        <div className='w-60'>
                            <h1 className='fs-125rem fw-800'>3) Maintain good posture</h1>
                            <p className='fs-108rem'>Sitting in an upright position is going to make it easier to type faster. If you are used to slouching in your chair or working from the couch, try moving to a straight-backed chair or working at your desk.</p>
                        </div>
                        <div className='w-35'>
                            <img src="images/good_pos_typing.webp" width={"390px"} height={"200px"} style={{ borderRadius: "5px" }} alt="" />
                        </div>
                    </div>
                    <div key={4} className='d-flex align-items-center gap-20 m-3'>
                        <div className='w-60'>
                            <h1 className='fs-125rem fw-800'>4) Find a comfortable position for your hands</h1>
                            <p className='fs-108rem'>The wrong hand placement can make it uncomfortable to type for extended periods of time. The space bar of your keyboard should be centered with your body, so that you are not reading your screen or typing from an angle. As you type, rest your elbows on the table and keep your wrists slightly elevated. You should never bend or angle your wrists dramatically.</p>
                        </div>
                        <div className='w-35'>
                            <img src="images/hands_pose.webp" width={"390px"} height={"200px"} style={{ borderRadius: "5px" }} alt="" />
                        </div>
                    </div>
                    <div key={5} className='d-flex align-items-center gap-20 m-3'>
                        <div className='w-60'>
                            <h1 className='fs-125rem fw-800'>5) Practice!</h1>
                            <p className='fs-108rem'>Nothing is mastered overnight, and in order to really improve your typing accuracy and speed, you need to practice every day. There are many websites that offer free typing skills tests and practice, such as Typing Academy, TypingClub and How To Type. It’s important to take your time with these typing exercises and assessments. Attempting to rush through them will only result in more errors at first. Trust that your speed will improve naturally as you become more familiar with the keyboard.</p>
                            <p className='fs-108rem'>Improving your typing skills will not only make your student life much easier, it will benefit you in your future career as well. It might take a lot of practice to see improvement, but don’t give up. You’ll be typing like a pro in no time!</p>
                        </div>
                        <div className='w-35'>
                            <img src="images/practice_pose.png" width={"390px"} height={"200px"} style={{ borderRadius: "5px" }} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </DocumentMeta>
    )
}

export default TypingTips
