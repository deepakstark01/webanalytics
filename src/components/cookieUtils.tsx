

export const getCookie = (name : string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};
console.log(getCookie('access_token'));
var myHeaders = new Headers();
myHeaders.append("Authorization",`Bearer ${getCookie('access_token')}` );
myHeaders.append("Content-Type", "application/json");
myHeaders.append("access-control-allow-credentials", "true");
myHeaders.append("Referer", "https://automartz.vercel.app/");
myHeaders.append("Origin", "https://automartz.vercel.app");
myHeaders.append("Connection", "keep-alive");
const generateRequest = (method : string) => {
  const requestOp: RequestInit ={
    method,
    headers: myHeaders,
    redirect: 'follow'
  };

  return requestOp;
};


// Function to get the access token
export const requestOption = (method : string) => {
  return generateRequest(method);
};












  