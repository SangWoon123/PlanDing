export const getCookie = (cookieName) => {
  console.log('쿠키값',document.cookie)
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  
  // 쿠키 배열을 순회하면서 원하는 쿠키를 찾음
  const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
  
  if (cookie) {
    console.log('zz',cookie)
    return cookie.split('=')[1];
  }
  return null;

}