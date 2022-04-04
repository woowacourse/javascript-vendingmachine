// TODO: 회원가입 컴포넌트와 동일함. 회원정보수정 기능으로 변경할 것

const profileEditTemplate = document.createElement('template');
profileEditTemplate.innerHTML = `
  <style>
    section {
      font-family: 'Roboto', sans-serif;
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    button {
      background: var(--primary);
      border-radius: 4px;
      height: 36px;
      border-style: none;
      color: var(--white);
      margin: 20px 0;
    }

    button:hover {
      background: var(--primary-darken);
      cursor: pointer;
    }

    input {
      padding: 0 8px;
      border: 1px solid var(--secondary);
      box-sizing: border-box;
      border-radius: 4px;
      height: 36px;
      line-height: 36px;
      font-weight: 400;
      font-size: 16px;
      margin: 7px 0;
    }

    input::placeholder {
      color: var(--secondary-darken);
    }

    form {
      display: flex;
      flex-direction: column;
      width: 300px;
    }
  </style>

  <section>
    <h1>회원 정보 수정</h1>
    <form>
      <label>이메일</label>
      <input type="email" placeholder="이메일 주소를 입력해주세요" />
      <label>이름</label>
      <input type="text" placeholder="이름을 입력해주세요" />
      <label>비밀번호</label>
      <input type="password" placeholder="비밀번호를 입력해주세요" />
      <label>비밀번호 확인</label>
      <input type="password" placeholder="비밀번호를 입력해주세요" />
      <button type="submit">확인</button>
    </form>
    <h3>👋🏼 <span id="welcome-name"></span>님 안녕하세요.</h3>
    <h4>이름</h4>
    <p id="name">마르코</p>
    <h4>이메일</h4>
    <p id="email">nextjws@gmail.com</p>
    <button id="logout-button">로그아웃</button>
  </section>
`;

class ProfileEdit extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(profileEditTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // 이벤트 추가
    this.shadowRoot.querySelector('form').addEventListener('submit', this.signup);
  }

  disconnectedCallback() {
    // 이벤트 삭제
    this.shadowRoot.querySelector('form').removeEventListener('submit', this.signup);
  }

  signup = (event: SubmitEvent) => {
    event.preventDefault();
    const name = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='text']")).value;
    const email = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='email']")).value;
    const password = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='password']"))
      .value;

    const url = 'https://json-server-marco.herokuapp.com/users/signup/';
    const data = {
      email,
      password,
      name,
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log('회원정보 수정 실패');
          return;
        }
        return res.json();
      })
      .then((response) => {
        const userAuth = {
          accessToken: response.accessToken,
          id: response.user.id,
        };
        localStorage.setItem('userAuth', JSON.stringify(userAuth));
        console.log('회원정보 수정 성공');
        // TODO 회원정보 수정 성공 후 라우트
      })
      .catch((error) => console.error('에러', error));
  };
}

customElements.define('profile-edit', ProfileEdit);
