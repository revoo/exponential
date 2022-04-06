import React from 'react';

// quote and light bar

const QuoteDecoration = (props) => {

    let quotes = [
        "Only you can take your life into your hands. Nobody can do it for you. Live your life with passion!",
        "Each new day is a new opportunity. Don't give up. You're closer than you think.",
        "It does not matter how slowly you go as long as you do not stop.",
        "Change the process, change the outcome.",
        "If you do what you always do, you'll get what you always got.",
        "Just when the caterpillar thought the world was ending, he turned into a butterfly.",
        "You will fail your way to success.",
        "If you're going through hell, keep going.",
        "When you stop chasing the wrong things, you give the right things a chance to catch you.",
        "If you can't explain it simply, you don't understand it well enough.",
        "Greatness is a choice you make everyday.",
        "Greatness is a habit.",
        "Quality is laying down a brick in the best possible way every day, eventually you build a house.",
        "All progress takes place outside the comfort zone.",
        "Growth is painful; therefore, pain is your friend. It makes you stronger for tougher challenges.",
        "Courage is not the absence of fear, it's feeling the fear and doing it anyway.",
        "Together we can climb out of hell. One inch at a time.",
        "Quite often, the best lessons stem from failure. Through failure you grow significantly.",
        "Success is the fruit of many failures.",  
        "Get up from the darkness, you don't belong there.",
        "Misery is a black hole, take a glance and keep going, don't get sucked in.",
        "The mind is incredible and you have more control than you think. Take control.",
        "Momentum is tough to build, start small but don't stop. You'll eventually be going very fast.",
        "What would you do if you weren't afraid?",
        "what would you do if you weren't always worried?",
        "Negative emotion is a stop not a destination. Keep going.",
        "Accept what you can't change, there is no perfect in life. Make the best out of your situation."
    ];

    let lightBarStyle = {
        borderStyle: 'solid',
        color: 'hsl(0, 100%, 50%)',
        borderWidth: '1px',
        width: '50%',
        marginLeft: '25%',
    };


    return (
        <div style={{color: 'white', fontStyle: 'italic', marginBottom: '2%'}}>
            <p>{quotes[props.quoteSelection]}</p>
            <hr style={{width: "50%", marginLeft: "25%", borderStyle: "solid", color: `hsl(${props.workSecondsElapsed % 255}, 100%, 50%)`}}></hr>
        </div>
    );

}

export default QuoteDecoration;