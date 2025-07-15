document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.getElementById('start-page');
    const questionPage = document.getElementById('question-page');
    const resultPage = document.getElementById('result-page');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const questionText = document.getElementById('question-text');
    const answerBtns = document.querySelectorAll('.answer-btn');
    const progressBar = document.querySelector('.progress');

    const mbtiTypeEl = document.getElementById('mbti-type');
    const mbtiTitleEl = document.getElementById('mbti-title');
    const mbtiDescriptionEl = document.getElementById('mbti-description');

    const questions = [
        { q: '금요일 저녁, 갑자기 친구에게서 전화가 왔다. "지금 나올래?" 당신의 대답은? ', a: [{ text: '"당연하지! 어디로 가면 돼?"라며 신나서 준비한다.', type: 'E' }, { text: '"미안, 오늘은 좀 쉬고 싶어."라며 집에서의 휴식을 택한다.', type: 'I' }] },
        { q: '새로운 프로젝트 팀에 합류했다. 가장 먼저 무엇을 할 것인가?', a: [{ text: '전체적인 목표와 일정을 파악하고 내 역할을 정리한다.', type: 'J' }, { text: '팀원들과 자유롭게 아이디어를 내며 가능성을 탐색한다.', type: 'P' }] },
        { q: '친구가 "나 요즘 너무 우울해"라고 말한다. 당신의 반응은?', a: [{ text: '"왜? 무슨 일 있었어?"라며 원인을 파악하고 해결책을 찾아보려 한다.', type: 'T' }, { text: '"저런... 많이 힘들었겠다."라며 친구의 감정을 먼저 위로한다.', type: 'F' }] },
        { q: '가본 적 없는 도시로 즉흥 여행을 떠났다. 당신의 행동은?', a: [{ text: '유명한 명소나 맛집 리스트를 빠르게 검색해 동선을 짠다.', type: 'S' }, { text: '발길 닿는 대로 걸으며 마음에 드는 곳에 무작정 들어가 본다.', type: 'N' }] },
        { q: '오랜만에 만난 동창회, 당신은 어떤 모습일까?', a: [{ text: '여러 테이블을 돌아다니며 많은 친구들과 인사하고 대화한다.', type: 'E' }, { text: '마음 맞는 몇 명의 친구와 깊이 있는 이야기를 나눈다.', type: 'I' }] },
        { q: '휴가 계획을 세울 때, 당신의 스타일은?', a: [{ text: '항공권, 숙소, 방문할 곳까지 시간대별로 정리된 계획표가 있어야 마음이 편하다.', type: 'J' }, { text: '왕복 항공권과 첫날 숙소만 예약하고 나머지는 현지에서 결정한다.', type: 'P' }] },
        { q: '영화나 책을 볼 때, 당신을 더 끄는 것은?', a: [{ text: '탄탄한 스토리와 현실적인 캐릭터 묘사', type: 'S' }, { text: '작품에 담긴 상징이나 숨겨진 의미를 해석하는 것', type: 'N' }] },
        { q: '팀 과제에서 의견 충돌이 생겼다. 당신의 선택은?', a: [{ text: '객관적인 데이터와 논리적인 근거를 들어 내 의견을 주장한다.', type: 'T' }, { text: '팀의 조화를 위해 내 의견을 조금 양보하더라도 타협점을 찾는다.', type: 'F' }] },
        { q: '관심 있던 취미 클래스에 처음 갔다. 당신의 모습은?', a: [{ text: '먼저 다른 사람들에게 말을 걸며 어색함을 푼다.', type: 'E' }, { text: '조용히 수업에 집중하며 자연스럽게 친해지기를 기다린다.', type: 'I' }] },
        { q: '해야 할 일이 산더미처럼 쌓였다. 당신은 어떻게 해결하는가?', a: [{ text: '중요도와 마감 기한에 따라 목록을 만들고 차근차근 처리한다.', type: 'J' }, { text: '그때그때 가장 끌리는 일부터 시작하며 유연하게 처리한다.', type: 'P' }] },
        { q: '"만약 내일 초능력이 생긴다면?" 이라는 질문에 당신의 대답은?', a: [{ text: '"하늘을 나는 능력! 출퇴근이 편해지겠네." (현실적 적용)', type: 'S' }, { text: '"시간을 조종하는 능력! 과거와 미래를 탐험하고 싶어." (추상적 상상)', type: 'N' }] },
        { q: '친구가 내 실수로 상처를 받았다. 당신은 어떻게 사과할까?', a: [{ text: '"내가 이런 부분에서 잘못 생각했어. 미안해." 라며 상황을 객관적으로 설명하고 사과한다.', type: 'T' }, { text: '"네가 속상했다니 정말 미안해. 마음이 좀 괜찮아?" 라며 친구의 감정을 먼저 살피고 사과한다.', type: 'F' }] },
    ];

    const results = {
        ISTJ: { title: '청렴결백한 논리주의자', description: '현실적이고 책임감이 강하며, 한번 시작한 일은 끝까지 해내는 성격입니다.' },
        ISFJ: { title: '용감한 수호자', description: '차분하고 헌신적이며, 주변 사람들을 돕는 것에서 보람을 느낍니다.' },
        INFJ: { title: '선의의 옹호자', description: '통찰력이 뛰어나고, 다른 사람에게 영감을 주며, 세상을 더 나은 곳으로 만들고자 합니다.' },
        INTJ: { title: '용의주도한 전략가', description: '상상력이 풍부하며, 철두철미한 계획을 세워 목표를 달성합니다.' },
        ISTP: { title: '만능 재주꾼', description: '대담하고 현실적이며, 다양한 도구를 능숙하게 다루는 탐험가형입니다.' },
        ISFP: { title: '호기심 많은 예술가', description: '항상 새로운 것을 찾아 도전하는 예술가적인 감각을 지닌 성격입니다.' },
        INFP: { title: '열정적인 중재자', description: '상냥하고 이타적이며, 건강하고 긍정적인 관계를 만들어나갑니다.' },
        INTP: { title: '논리적인 사색가', description: '끊임없이 새로운 지식에 목말라 하는 혁신가형입니다.' },
        ESTP: { title: '모험을 즐기는 사업가', description: '명석한 두뇌와 넘치는 에너지로, 주변 사람들을 즐겁게 만드는 재주가 있습니다.' },
        ESFP: { title: '자유로운 영혼의 연예인', description: '즉흥적이고 열정적이며, 주변에 긍정적인 에너지를 발산합니다.' },
        ENFP: { title: '재기발랄한 활동가', description: '창의적이고 사교적이며, 항상 웃을 거리를 찾아다니는 긍정적인 성격입니다.' },
        ENTP: { title: '뜨거운 논쟁을 즐기는 변론가', description: '지적인 도전을 두려워하지 않으며, 문제 해결에 뛰어난 능력을 보입니다.' },
        ESTJ: { title: '엄격한 관리자', description: '사물이나 사람을 관리하는 데 뛰어난 재능을 지닌, 현실적인 리더입니다.' },
        ESFJ: { title: '사교적인 외교관', description: '타인을 돕는 것을 즐기며, 주변 사람들에게 인기가 많고 사교성이 풍부합니다.' },
        ENFJ: { title: '정의로운 사회운동가', description: '넘치는 카리스마와 열정으로, 다른 사람들을 이끌고 긍정적인 영향을 미칩니다.' },
        ENTJ: { title: '대담한 통솔자', description: '타고난 리더십으로, 항상 문제 해결을 위한 방법을 찾아내는 전략가입니다.' },
    };

    let currentQuestionIndex = 0;
    let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    function startTest() {
        startPage.style.display = 'none';
        resultPage.style.display = 'none';
        questionPage.style.display = 'block';
        currentQuestionIndex = 0;
        scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionText.textContent = question.q;
            answerBtns[0].textContent = question.a[0].text;
            answerBtns[0].dataset.type = question.a[0].type;
            answerBtns[1].textContent = question.a[1].text;
            answerBtns[1].dataset.type = question.a[1].type;
            updateProgress();
        } else {
            showResult();
        }
    }

    function handleAnswer(e) {
        const type = e.target.dataset.type;
        scores[type]++;
        currentQuestionIndex++;
        showQuestion();
    }

    function updateProgress() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showResult() {
        questionPage.style.display = 'none';
        resultPage.style.display = 'block';

        let mbtiType = '';
        mbtiType += scores.E > scores.I ? 'E' : 'I';
        mbtiType += scores.S > scores.N ? 'S' : 'N';
        mbtiType += scores.T > scores.F ? 'T' : 'F';
        mbtiType += scores.J > scores.P ? 'J' : 'P';

        const result = results[mbtiType];
        mbtiTypeEl.textContent = mbtiType;
        mbtiTitleEl.textContent = result.title;
        mbtiDescriptionEl.textContent = result.description;
    }

    startBtn.addEventListener('click', startTest);
    restartBtn.addEventListener('click', startTest);
    answerBtns.forEach(btn => btn.addEventListener('click', handleAnswer));
});
