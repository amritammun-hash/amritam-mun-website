document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. CORE UI EFFECTS
       ========================================= */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('bx-menu-alt-right');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu-alt-right');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu-alt-right');
        });
    });

    const glowPoint = document.querySelector('.glow-point');
    if (glowPoint) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glowPoint.style.left = `${e.clientX}px`;
                glowPoint.style.top = `${e.clientY}px`;
            });
        });
    }

    const dustContainer = document.getElementById('dust-container');
    if (dustContainer) {
        const createDust = () => {
            const particle = document.createElement('div');
            particle.classList.add('dust-particle');
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            
            dustContainer.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        };
        for(let i=0; i<30; i++) setTimeout(createDust, Math.random() * 5000);
        setInterval(createDust, 500);
    }

    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-top');
    setTimeout(() => { document.querySelectorAll('.reveal-top').forEach(el => el.classList.add('active')); }, 100);

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealOnScroll.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                     top: targetElement.getBoundingClientRect().top + window.pageYOffset - 90,
                     behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       2. INTERACTIVE Q&A ACCORDION & TABS
       ========================================= */
    const qaTabs = document.querySelectorAll('.qa-tab');
    const qaGroups = document.querySelectorAll('.qa-group');

    qaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            qaTabs.forEach(t => t.classList.remove('active'));
            qaGroups.forEach(g => g.classList.remove('active'));
            
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    const qaItems = document.querySelectorAll('.qa-item');
    qaItems.forEach(item => {
        const question = item.querySelector('.qa-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Allow multiple open or close others? Let's close others for a neat accordion
            qaItems.forEach(otherItem => otherItem.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });


    const questionBank = {
        beginner: [
            { q: "What does MUN stand for?", options: ["Model United Nations", "Modern Union of Nations", "Mutual Understanding Network", "Multiple United Nations"], correct: 0, explanation: "Model United Nations (MUN) is an educational simulation where students learn about diplomacy, international relations, and the UN.", motivate: "Great start! You're already sounding like a diplomat." },
            { q: "What is the purpose of the 'Roll Call'?", options: ["To check who is wearing formal attire", "To establish quorum and voting rights", "To announce the lunch break", "To vote on resolutions"], correct: 1, explanation: "Roll Call establishes the quorum (minimum number of delegates required) and determines if a delegate is 'Present' or 'Present and Voting'.", motivate: "Spot on! Every successful committee starts with a solid Roll Call." },
            { q: "What is a 'Working Paper'?", options: ["A piece of scratch paper for notes", "The final binding law passed", "A rough draft of ideas formed by a bloc", "A document the Chair reads at the start"], correct: 2, explanation: "A Working Paper is an informal document where blocs (groups of delegates) write down their proposed solutions before formalizing them into a Draft Resolution.", motivate: "Excellent! Collaboration is key, and working papers are where ideas come to life." },
            { q: "In an Unmoderated Caucus, delegates are expected to...", options: ["Sit quietly and listen", "Speak in a strict order set by the Chair", "Leave their seats, network, and form blocs", "Vote on the final resolution"], correct: 2, explanation: "An 'Unmod' is the time for informal lobbying. You leave your seat, talk to others, and negotiate freely.", motivate: "Yes! The Unmod is where the real diplomatic magic happens." },
            { q: "If a delegate says 'Present and Voting' during Roll Call, they cannot...", options: ["Speak during GSL", "Vote 'Abstain' on substantive matters", "Pass chits", "Raise points of order"], correct: 1, explanation: "If you are 'Present and Voting', you MUST vote Yes or No on substantive matters (like Draft Resolutions). You cannot Abstain.", motivate: "Sharp answer! Knowing the rules gives you a massive advantage." },
            { q: "What is the 'GSL'?", options: ["Global Security List", "General Speaker's List", "Guided Speech Limit", "General Strategic Lobbying"], correct: 1, explanation: "The General Speaker's List is the default state of the committee where delegates give broad speeches about their country's stance on the agenda.", motivate: "Correct! Mastering the GSL is your first step to commanding the room." },
            { q: "If you need to use the restroom, you should raise a...", options: ["Point of Order", "Point of Personal Privilege", "Point of Information", "Point of Inquiry"], correct: 1, explanation: "A Point of Personal Privilege is used when you experience physical discomfort, like needing the restroom or if you can't hear the speaker.", motivate: "Exactly! Never be afraid to use a Point of Personal Privilege when you need it." },
            { q: "What is a 'Placard'?", options: ["A written note passed between delegates", "The nameplate used to request to speak and vote", "A type of resolution", "The Chair's gavel"], correct: 1, explanation: "A placard is a sign with your assigned country's name on it. You raise it to signal the Chair that you wish to speak or vote.", motivate: "Nice! Keep that placard high and be heard." },
            { q: "Who leads the committee and moderates the debate?", options: ["The Secretary-General", "The Executive Board (Chair/Director)", "The Head Delegate", "The Security Council"], correct: 1, explanation: "The Executive Board (often referred to as 'The Dais' or 'The Chair') runs the committee, maintains order, and facilitates debate.", motivate: "Right on! Always respect the Chair." },
            { q: "What do we call a formal vote on a Draft Resolution?", options: ["Procedural Vote", "Substantive Vote", "General Vote", "Executive Vote"], correct: 1, explanation: "A Substantive Vote is a vote on the actual content of the committee (like resolutions or amendments). Procedural votes are for motions like caucuses.", motivate: "Awesome! You know the difference that counts at the end of the day." },
            { q: "How should a delegate refer to themselves while speaking?", options: ["'I' or 'Me'", "'We' or 'The Delegate of [Country]'", "By their real name", "'The Speaker'"], correct: 1, explanation: "In MUN, you do not represent yourself; you represent your country. Therefore, you use third-person ('The delegate of India believes...') or first-person plural ('We believe...').", motivate: "Perfect diplomacy! Never break character." },
            { q: "What is the purpose of passing 'Chits'?", options: ["To doodle during speeches", "To formally communicate with other delegates without interrupting the speaker", "To order food", "To complain about the Chair"], correct: 1, explanation: "Chits are written notes passed via the logistics team to negotiate, form alliances, or ask questions silently while debate continues.", motivate: "Spot on. Chits are the lifeblood of secret diplomacy." },
            { q: "If you want to ask a question to a delegate who just finished a speech, you use a...", options: ["Point of Order", "Point of Personal Privilege", "Point of Information (POI)", "Right of Reply"], correct: 2, explanation: "A Point of Information is a formal question directed at a speaker who has yielded to points of information after their speech.", motivate: "Excellent! Asking sharp POIs is how you dismantle opposing arguments." },
            { q: "A 'Bloc' in MUN refers to...", options: ["A physical barrier in the room", "A group of countries with similar policies working together", "A voting procedure", "A section of the resolution"], correct: 1, explanation: "A bloc is an alliance of delegates who share similar foreign policies and work together to draft a resolution.", motivate: "Yes! Finding your bloc early is a winning strategy." },
            { q: "To suggest a 10-minute discussion on 'Economic Impacts', you propose a...", options: ["Draft Resolution", "Moderated Caucus", "General Speaker's List", "Unmoderated Caucus"], correct: 1, explanation: "A Moderated Caucus focuses the debate on a highly specific sub-topic for a set total time and speaking time.", motivate: "Correct! Mod caucuses keep the debate focused and sharp." },
            { q: "Can an Observer State (like the Holy See) vote on substantive matters (Draft Resolutions)?", options: ["Yes, unconditionally", "No, they only have procedural voting rights", "Only if the Chair likes them", "Yes, but their vote counts as half"], correct: 1, explanation: "Observer States can speak, sponsor resolutions, and vote on procedural motions (like caucuses), but they CANNOT vote on substantive matters like passing resolutions.", motivate: "Impressive! That's a tricky rule many forget." },
            { q: "What is 'Yielding'?", options: ["Giving up your turn entirely", "Giving your remaining speaking time to the Chair, another delegate, or to questions", "Surrendering your placard", "Agreeing with another country"], correct: 1, explanation: "If you finish speaking before your time is up, you must yield your remaining time to the Chair, another delegate, or to Points of Information.", motivate: "Exactly. Time is a resource, use your yields wisely!" }
        ],
        experienced: [
            { q: "A Draft Resolution requires what to be introduced to the floor?", options: ["Only sponsors", "Only signatories", "A specific combination of Sponsors and Signatories approved by the Chair", "A 2/3rds majority vote"], correct: 2, explanation: "A Draft Resolution must have a required number of Sponsors (authors) and Signatories (supporters wanting it discussed) before the Chair accepts it.", motivate: "Excellent! You know how to get your policies on the table." },
            { q: "What motion is used to immediately end the committee session until the next day?", options: ["Motion to Adjourn the Meeting", "Motion to Suspend the Meeting", "Motion to Close Debate", "Point of Order"], correct: 0, explanation: "Adjourning the meeting ends it until the next major session (or the end of the conference). Suspending is used for short breaks like lunch.", motivate: "Perfect! Knowing procedural motions gives you control over the committee's flow." },
            { q: "In a Crisis Committee, what is a 'Directive'?", options: ["An order given by the Chair to be quiet", "An action order passed by the committee to alter the crisis timeline", "A long, multi-page resolution", "A request to change the topic"], correct: 1, explanation: "Unlike GA committees that write long resolutions, Crisis Committees pass rapid 'Directives' to take immediate action on unfolding events.", motivate: "Spot on! Crisis requires quick thinking and decisive Directives." },
            { q: "What is a 'Right of Reply'?", options: ["The right to answer any question asked", "A request to respond when a delegate's national integrity is directly impugned", "The right to reply to a chit", "The right to speak twice in a row"], correct: 1, explanation: "A Right of Reply is strictly used when another delegate explicitly insults or attacks your country's national integrity.", motivate: "Well played! Defending your nation's honor is paramount." },
            { q: "Which of the following requires a Two-Thirds (2/3) majority to pass?", options: ["Motion for an Unmoderated Caucus", "Motion for a Moderated Caucus", "Motion to Close Debate", "Passing a Draft Resolution"], correct: 2, explanation: "Closing Debate (moving straight to voting procedure) generally requires a 2/3 majority because it cuts off further discussion.", motivate: "Brilliant! You clearly know your parliamentary procedure." },
            { q: "If a delegate notices the Chair has made a procedural error, they should raise a...", options: ["Point of Information", "Point of Parliamentary Inquiry", "Point of Order", "Right of Reply"], correct: 2, explanation: "A Point of Order is specifically used to call out an error in parliamentary procedure by the Chair or another delegate.", motivate: "Correct! A sharp delegate keeps the committee running strictly by the rules." },
            { q: "What is the difference between a Sponsor and a Signatory on a Draft Resolution?", options: ["No difference", "Sponsors wrote it; Signatories just want it debated", "Signatories wrote it; Sponsors fund it", "Sponsors must vote 'Yes', Signatories can vote however they want"], correct: 1, explanation: "Sponsors are the primary authors and actively support the resolution. Signatories merely wish to see it debated and do not necessarily agree with its contents.", motivate: "Exactly! Never be afraid to be a signatory to an opposing bloc's paper just to debate it." },
            { q: "During Voting Procedure, what does 'Voting with Rights' mean?", options: ["Voting twice", "Reserving the right to explain your 'Yes' or 'No' vote to the committee afterwards", "Voting on behalf of an absent delegate", "Demanding the right to veto"], correct: 1, explanation: "During Roll Call Voting, voting 'Yes with Rights' or 'No with Rights' allows a delegate to briefly explain their decision after voting concludes.", motivate: "Very advanced! Using rights is a great way to make a final political statement." },
            { q: "What are 'Preambulatory Clauses'?", options: ["Clauses that demand action", "Clauses that establish the context, history, and reasoning behind the resolution", "Clauses that punish countries", "The signatures at the bottom"], correct: 1, explanation: "Preambulatory clauses set the stage. They cite past UN resolutions, acknowledge problems, and provide the justification for the Operative clauses.", motivate: "Spot on. A strong preamble builds an unbreakable foundation for your resolution." },
            { q: "What happens if a Motion to Reconsider a Resolution passes?", options: ["The resolution is instantly deleted", "A previously failed resolution is brought back to the floor for a re-vote", "The Chair is replaced", "The committee restarts from Roll Call"], correct: 1, explanation: "A Motion to Reconsider is used in rare cases to bring a resolution that just failed back to a vote, usually because someone changed their mind.", motivate: "Masterful! Reconsideration is a powerful tool in high-stakes diplomacy." },
            { q: "In a Joint Crisis Committee (JCC), what is unique about the structure?", options: ["There are no chairs", "Two or more interconnected committees interact and compete in real-time", "It only lasts one hour", "Delegates represent historical figures, never countries"], correct: 1, explanation: "A JCC features multiple rooms (e.g., USA vs USSR) whose actions directly impact each other through a centralized crisis team.", motivate: "Yes! JCCs are the ultimate test of strategy and espionage." },
            { q: "What does it mean to 'Divide the Question'?", options: ["To take a break in the middle of a question", "To vote on separating specific clauses from a Draft Resolution to be voted on individually", "To split the committee into two rooms", "To ask two POIs at once"], correct: 1, explanation: "Dividing the question allows the committee to isolate highly controversial clauses and vote on them separately from the main document.", motivate: "Brilliant tactic! Dividing the question can save a good resolution from failing due to one bad clause." },
            { q: "If the P5 (Permanent 5) in the UNSC uses a Veto, what happens?", options: ["The resolution passes anyway if it has a majority", "The resolution instantly fails, regardless of other votes", "The Secretary-General decides", "The voting is delayed by one day"], correct: 1, explanation: "In the UN Security Council, any substantive resolution fails immediately if a Permanent 5 member (USA, UK, France, Russia, China) casts a 'No' vote.", motivate: "Correct. The veto is the ultimate weapon in the Security Council." },
            { q: "What is an 'Amendment of the Second Degree'?", options: ["A really bad amendment", "An amendment to a previously submitted amendment", "An amendment submitted by a first-timer", "A late amendment"], correct: 1, explanation: "An amendment of the second degree modifies an existing amendment before it is voted upon.", motivate: "Incredible procedural knowledge. You truly are an experienced delegate." },
            { q: "When is a 'Point of Parliamentary Inquiry' used?", options: ["To correct the Chair", "To ask the Chair a question regarding the rules of procedure", "To insult another delegate", "To ask about the lunch menu"], correct: 1, explanation: "If you are confused about the rules (e.g., 'Do we need a 2/3 majority for this?'), you raise a Point of Parliamentary Inquiry to ask the Chair.", motivate: "Exactly. The Chair is there to help, use POPIs to your advantage." }
        ]
    };

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const screens = {
        start: document.getElementById('game-start-screen'),
        play: document.getElementById('game-play-screen'),
        end: document.getElementById('game-end-screen')
    };

    const ui = {
        qTracker: document.getElementById('question-tracker'),
        scoreDisplay: document.getElementById('current-score'),
        progressBar: document.getElementById('game-progress'),
        qText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        feedbackBox: document.getElementById('feedback-box'),
        feedbackTitle: document.getElementById('feedback-title'),
        feedbackText: document.getElementById('feedback-text'),
        nextBtn: document.getElementById('next-btn'),
        finalScore: document.getElementById('final-score'),
        finalMessage: document.getElementById('final-message'),
        playAgainBtn: document.getElementById('play-again-btn')
    };

    function switchScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    // Utility: Shuffle Array
    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Only attach game event listeners if we are on the page with the game
    if (ui.nextBtn) {
        // Start Game
        document.querySelectorAll('.track-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const track = e.target.getAttribute('data-track');
                
                // Shuffle and pick 5 questions
                const pool = questionBank[track];
                currentQuestions = shuffleArray(pool).slice(0, 5);
                
                currentQuestionIndex = 0;
                score = 0;
                ui.scoreDisplay.textContent = score;
                
                switchScreen('play');
                loadQuestion();
            });
        });

        ui.nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < 5) {
                loadQuestion();
            } else {
                showEndScreen();
            }
        });

        ui.playAgainBtn.addEventListener('click', () => {
            switchScreen('start');
        });
    }

    function loadQuestion() {
        const qData = currentQuestions[currentQuestionIndex];
        
        ui.qTracker.textContent = `Question ${currentQuestionIndex + 1}/5`;
        ui.progressBar.style.width = `${((currentQuestionIndex) / 5) * 100}%`;
        
        ui.qText.textContent = qData.q;
        ui.optionsContainer.innerHTML = '';
        ui.feedbackBox.classList.add('hidden');
        ui.feedbackBox.classList.remove('success', 'error');
        
        qData.options.forEach((optText, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = optText;
            btn.onclick = () => handleAnswer(index, btn);
            ui.optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(selectedIndex, clickedBtn) {
        const qData = currentQuestions[currentQuestionIndex];
        const isCorrect = (selectedIndex === qData.correct);
        
        // Disable all buttons
        const allBtns = ui.optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === qData.correct) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        if (isCorrect) {
            score++;
            ui.scoreDisplay.textContent = score;
            ui.feedbackTitle.textContent = "Excellent!";
            ui.feedbackBox.classList.add('success');
            ui.feedbackText.innerHTML = `<strong>${qData.motivate}</strong><br><br>${qData.explanation}`;
        } else {
            ui.feedbackTitle.textContent = "Not quite!";
            ui.feedbackBox.classList.add('error');
            ui.feedbackText.innerHTML = `<strong>Don't worry, every delegate learns!</strong><br><br>${qData.explanation}`;
        }

        ui.feedbackBox.classList.remove('hidden');
    }

    function showEndScreen() {
        ui.progressBar.style.width = `100%`;
        switchScreen('end');
        ui.finalScore.textContent = score;
        
        if (score === 5) {
            ui.finalMessage.textContent = "Flawless! You are a master diplomat ready to lead the committee.";
            // Grant Gamification Stamp
            localStorage.setItem('amritam_stamp_trivia', 'true');
        } else if (score >= 3) {
            ui.finalMessage.textContent = "Great job! You have a solid grasp of procedure. Amritam MUN awaits you!";
        } else {
            ui.finalMessage.textContent = "Good effort! The best way to learn is by doing. We can't wait to see you at Amritam MUN!";
        }
    }
});

/* =========================================
   4. INTERACTIVE 3D GLOBE
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globeViz');
    if (globeContainer && typeof Globe !== 'undefined') {
        const crisisData = [
            // North America
            { lat: 37.0902, lng: -95.7129, label: 'United States', desc: 'The USA hosts the United Nations Headquarters in New York City.', tip: 'Fact: The US is one of the 5 permanent members (P5) with Veto power in the Security Council.', color: '#e74c3c' },
            { lat: 56.1304, lng: -106.3468, label: 'Canada', desc: 'Canada is known for its strong peacekeeping history, heavily involved in early UN missions.', tip: 'Fact: A Canadian, Lester B. Pearson, is considered the father of the modern concept of UN peacekeeping.', color: '#d8b15d' },
            { lat: 23.6345, lng: -102.5528, label: 'Mexico', desc: 'Mexico is a major Latin American voice in the General Assembly.', tip: 'Fact: Mexico is one of the top contributors to the UN budget from Latin America.', color: '#2ecc71' },
            // South America
            { lat: -14.2350, lng: -51.9253, label: 'Brazil', desc: 'Brazil is a massive agricultural and economic powerhouse in South America.', tip: 'Fact: Brazil is the country that has served the most years as a non-permanent member of the UNSC!', color: '#2ecc71' },
            { lat: -38.4161, lng: -63.6167, label: 'Argentina', desc: 'Argentina frequently leads discussions on sovereign debt and human rights in the UN.', tip: 'Fact: In MUNs, Argentina is a vital ally for passing resolutions in the Latin American bloc.', color: '#3498db' },
            // Europe
            { lat: 48.2082, lng: 16.3738, label: 'Austria (Vienna)', desc: 'Vienna hosts one of the four major headquarters of the United Nations (UNOV).', tip: 'Fact: The UN Office at Vienna focuses heavily on peaceful uses of outer space and international trade law.', color: '#3498db' },
            { lat: 55.3781, lng: -3.4360, label: 'United Kingdom', desc: 'The UK is a founding member of the UN and a permanent Security Council member.', tip: 'Fact: The very first meetings of the UN General Assembly were held in London in 1946.', color: '#e74c3c' },
            { lat: 46.2276, lng: 2.2137, label: 'France', desc: 'France is a P5 member and a leader in global climate initiatives.', tip: 'Fact: The Paris Agreement (2015) was a landmark UN climate treaty adopted in France.', color: '#d8b15d' },
            { lat: 51.1657, lng: 10.4515, label: 'Germany', desc: 'Germany is a massive financial contributor to the United Nations.', tip: 'Fact: Despite not being a P5 member, Germany is the 4th largest contributor to the UN regular budget.', color: '#f1c40f' },
            // Asia
            { lat: 20.5937, lng: 78.9629, label: 'India', desc: 'India is a founding member of the UN and a massive contributor to UN Peacekeeping forces.', tip: 'Fact: India has been a non-permanent member of the UN Security Council 8 times!', color: '#d8b15d' },
            { lat: 35.8617, lng: 104.1954, label: 'China', desc: 'China is a P5 member and holds significant geopolitical and economic influence.', tip: 'Fact: China replaced the Republic of China (Taiwan) in the UN seat in 1971.', color: '#e74c3c' },
            { lat: 36.2048, lng: 138.2529, label: 'Japan', desc: 'Japan focuses heavily on human security and nuclear disarmament in the UN.', tip: 'Fact: Japan is the only country to have suffered a nuclear attack, driving its strong anti-nuclear stance in MUNs.', color: '#3498db' },
            { lat: 61.5240, lng: 105.3188, label: 'Russia', desc: 'Russia (successor to the USSR) is a P5 member with extensive veto power usage.', tip: 'Fact: The USSR/Russia has used the veto power more times than any other P5 nation.', color: '#e74c3c' },
            { lat: 23.8859, lng: 45.0792, label: 'Saudi Arabia', desc: 'A major player in the Middle East and a leading voice in OPEC.', tip: 'Fact: Saudi Arabia was a founding member of the UN in 1945.', color: '#2ecc71' },
            // Africa
            { lat: -1.2921, lng: 36.8219, label: 'Kenya (Nairobi)', desc: 'Nairobi is the UN headquarters in Africa, focusing heavily on the environment (UNEP).', tip: 'Fact: Environmental agendas are a massive part of modern MUNs. Always know your climate policy!', color: '#2ecc71' },
            { lat: 26.8206, lng: 30.8025, label: 'Egypt', desc: 'Egypt is a key diplomatic bridge between the Middle East and Africa.', tip: 'Fact: Former UN Secretary-General Boutros Boutros-Ghali was from Egypt.', color: '#d8b15d' },
            { lat: -30.5595, lng: 22.9375, label: 'South Africa', desc: 'South Africa is a powerful voice for the African continent in the General Assembly.', tip: 'Fact: The UN played a massive role in ending Apartheid in South Africa through embargoes and resolutions.', color: '#f1c40f' },
            { lat: 9.0820, lng: 8.6753, label: 'Nigeria', desc: 'Nigeria is the most populous country in Africa and heavily involved in ECOWAS.', tip: 'Fact: Nigeria is one of the largest contributors of peacekeeping troops in Africa.', color: '#3498db' },
            // Oceania
            { lat: -25.2744, lng: 133.7751, label: 'Australia', desc: 'Australia is a strong proponent of international law and human rights in the Indo-Pacific.', tip: 'Fact: An Australian, Dr. H.V. Evatt, was the 3rd President of the UN General Assembly.', color: '#d8b15d' }
        ];

        const myGlobe = Globe()
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundColor('rgba(0,0,0,0)')
            .labelsData(crisisData)
            .labelLat(d => d.lat)
            .labelLng(d => d.lng)
            .labelText(d => d.label)
            .labelSize(1.5)
            .labelDotRadius(0.5)
            .labelColor(d => d.color)
            .labelResolution(2)
            .onLabelClick((d) => {
                const panel = document.getElementById('crisis-panel');
                document.getElementById('crisis-title').textContent = d.label;
                document.getElementById('crisis-desc').innerHTML = `${d.desc}<br><br><strong style="color:var(--gold-primary);">${d.tip}</strong>`;
                panel.classList.remove('hidden');
            })
            (globeContainer);
            
        // Auto-rotate and fix scroll trap
        myGlobe.controls().autoRotate = true;
        myGlobe.controls().autoRotateSpeed = 1.5;
        myGlobe.controls().enableZoom = false; 
        
        // Disable manual rotation on mobile so users don't get trapped while scrolling
        if (window.innerWidth < 768) {
            myGlobe.controls().enableRotate = false;
        }

        // Close crisis panel
        document.getElementById('close-crisis').addEventListener('click', () => {
            document.getElementById('crisis-panel').classList.add('hidden');
        });
    }
});

/* =========================================
   5. GAMIFIED PASSPORT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // If we are on learn.html, give the masterclass stamp automatically after 2 seconds
    if (document.querySelector('.learn-page')) {
        setTimeout(() => {
            localStorage.setItem('amritam_stamp_masterclass', 'true');
        }, 2000);
    }

    const passportBtn = document.getElementById('passport-btn');
    const passportModal = document.getElementById('passport-modal');
    const closePassport = document.getElementById('close-passport');
    const stampsContainer = document.getElementById('stamps-container');

    if (passportBtn && passportModal) {
        passportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderStamps();
            passportModal.classList.remove('hidden');
        });

        closePassport.addEventListener('click', () => {
            passportModal.classList.add('hidden');
        });

        // Close if clicked outside
        passportModal.addEventListener('click', (e) => {
            if (e.target === passportModal) {
                passportModal.classList.add('hidden');
            }
        });
    }

    function renderStamps() {
        if (!stampsContainer) return;
        stampsContainer.innerHTML = '';
        
        let hasStamps = false;

        if (localStorage.getItem('amritam_stamp_trivia') === 'true') {
            hasStamps = true;
            stampsContainer.innerHTML += `
                <div class="stamp stamp-trivia" style="--rotation: 15deg">
                    <i class='bx bxs-graduation'></i>
                    <span>Trivia<br>Master</span>
                </div>
            `;
        }

        if (localStorage.getItem('amritam_stamp_masterclass') === 'true') {
            hasStamps = true;
            stampsContainer.innerHTML += `
                <div class="stamp stamp-learn" style="--rotation: -5deg">
                    <i class='bx bxs-book-reader'></i>
                    <span>Learned<br>Delegate</span>
                </div>
            `;
        }

        if (!hasStamps) {
            stampsContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); font-size: 0.9rem;">No stamps yet.<br>Complete the Masterclass or get 5/5 in Trivia to earn them!</p>`;
        }
    }
});
