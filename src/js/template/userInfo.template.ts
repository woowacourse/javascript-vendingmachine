const userInfoTemplate = {
  inputCollection: (email, name) =>
    `<div class="secondary-input-container">
     <label for="email">이메일</label>
     <input id="email" class="input" placeholder=${email} type="email" disabled>
   </div>
   <div  class="secondary-input-container">
     <label for="name">이름</label>
     <input id="name" class="input" placeholder=${name} >
   </div>
   <div  class="secondary-input-container">
     <label for="password">비밀번호</label>
     <input id="password" class="input" placeholder="비밀번호를 입력해주세요" type="password">
   </div>
   <div  class="secondary-input-container">
     <label for="confirm-password">비밀번호</label>
     <input id="confirm-password" class="input" placeholder="비밀번호를 다시 입력해주세요" type="password">
   </div>
     <button  class="primary-button">완료</button>`,
};

export default userInfoTemplate;
