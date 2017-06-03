
var quotes= [
			 {"quote" :"Tension is who you think you should be. Relaxation is who you are.", "author":"Zen Saying"},
			 {"quote": "In the stillness of the mind I saw myself as I am - unbound.", "author" : "Sri Nisargadatta Maharaj"},
			 {"quote": "What was never lost can never be found.","author" : "Zen Saying"},
			 {"quote": "When you plant a seed of love, it is you that blossoms.","author" : "Ma Jaya Sati Bhagavati"},
			 {"quote": "If you have inner peace, nobody can force you to be a slave to the outer reality.", "author" : "Sri Chinmoy"},
             {"quote": "People living deeply have no fear of death.","author" : "Anais Nin"},
             {"quote": "The only thing that is ultimately real about your journey is the step that you are taking at this moment. That\'s all there ever is.", "author":"Eckhart Tolle"},
             {"quote": "Wherever you are, be there totally.", "author":"Eckhart Tolle"},
             {"quote": "I am here to tell you that the path to peace is right there, when you want to get away.", "author":"Pema Chodron"},
             {"quote": "When you are present, you can allow the mind to be as it is without getting entangled in it.","author":"Eckhart Tolle"},
             {"quote": "If you miss the present moment, you miss your appointment with life. That is very serious!","author":"Thich Nhat Han"},
             {"quote": "Practice is this life, and realization is this life, and this life is revealed right here and now.", "author":"Maezumi Roshi"},
             {"quote": "If you want to change the world, start with the next person who comes to you in need.", "author":"B.D. Schiers"},
             {"quote": "My experience is that the teachers we need most are the people we\'re living with right now.","author":"Byron Katie"},
             {"quote": "Guilt, regret, resentment, sadness & all forms of nonforgiveness are caused by too much past & not enough presence.", "author":"Eckhart Tolle"},
             {"quote": "Throughout this life, you can never be certain of living long enough to take another breath.","author":"Huang Po"},
             {"quote": "Awareness is the greatest agent for change.","author":"Eckhart Tolle"},
             {"quote": "When you do something, you should burn yourself up completely, like a good bonfire, leaving no trace of yourself.", "author":"Shunryu Suzuki"},
             {"quote": "The intuitive recognition of the instant, thus reality is the highest act of wisdom.","author":"D.T. Suzuki"},
             {"quote": "Nothing ever exists entirely alone. Everything is in relation to everything else.", "author":"Buddha"},
             {"quote": "Heaven and earth and I are of the same root, The ten-thousand things and I are of one substance.", "author":"Seng-chao"},
	         {"quote": "The practice of Zen is forgetting the self in the act of uniting with something.","author":"Koun Yamada"},
			 {"quote": "The Zen expression \"Kill the Buddha!\" means to kill any concept of the Buddha as something apart from oneself.","author":"Peter Matthiessen"},
			 {"quote": "When you hear that all beings are Buddha, don\'t fall into the error of thinking there\'s more than one Buddha.","author":"Zen Graffiti"},
			 {"quote": "The self divides into ten billion distinct illuminating spirits. Distinguish these without falling into names and classifications.","author":"Hongzhi"},
			 {"quote": "To study Buddhism is to study the self. To study the self is to forget the self. To forget the self is to be awakened by all things.","author":"Dogen"},
			 {"quote": "Melting our attachment to self is the most powerful medication for bringing mental and emotional imbalances in check.","author":"Dzigar Kongtrul Rinpoche"},
			 {"quote": "When an ordinary man attains knowledge, he is a sage; when a sage attains understanding, he is an ordinary man.","author":"Zen Proverb"},
			 {"quote": "If we do not occupy ourself with everything, then peaceful mind will have nowhere to abide.","author":"Shen-hui"},
			 {"quote": "The Buddha talked about saving all beings from delusion, not converting them to a new religion.","author":"Buddihism now"},
			 {"quote": "Let your mind wander in the pure and simple. Be one with the infinite. Let all things take their course.","author":"Chuang Tzu"},
			 {"quote": "Let go over a cliff, die completely, and then come back to life - after that you cannot be deceived.","author":"Zen Proverb"},
			 {"quote": "The personal life deeply lived always expands into truths beyond itself.","author":" Anais Nin"},
			 {"quote": "Only when you can be extremely pliable and soft can you be extremely hard and strong.","author":" Zen Proverb"} 
];
		
 


function getNextQuote() {
	//var obj = JSON.parse(quotes);
    var index = Math.floor((Math.random() * quotes.length) );    
    document.getElementById("quote").textContent = quotes[index].quote;  
    document.getElementById("author").textContent = '-' + quotes[index].author;
    
};

function tweet(){
	console.log( document.getElementById("quote").textContent + ' ' +  document.getElementById("author").textContent + ' #quotes');
	var text = '"' + document.getElementById("quote").textContent + '" ' +  (document.getElementById("author").textContent).replace('-','');
	var url = "https://twitter.com/intent/tweet?text=";
	window.open(url + text + '&hashtags=quotes');
}
