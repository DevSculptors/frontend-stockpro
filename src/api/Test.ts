import axios from "@/api/config";

export const getLogin = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  
console.log(res.headers.get('Authorization'));


  const user = await res.json();
  console.log(user);
};
