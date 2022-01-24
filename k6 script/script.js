import http from 'k6/http';
// import { check } from 'k6';

export default function () {
  var req = []; 
  // // 1. signup
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Md. Masud",
  //       "email": "masud@gmail.com",
  //       "password": "123456",
  //       "position": "Director"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Md. Liton",
  //       "email": "liton@gmail.com",
  //       "password": "123456",
  //       "position": "GM"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Mr. Babu",
  //       "email": "babu@gmail.com",
  //       "password": "123456",
  //       "position": "Jr. Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Mr. Nayeem",
  //       "email": "nayeem@gmail.com",
  //       "password": "123456",
  //       "position": "Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Mr. Dalim",
  //       "email": "dalim@gmail.com",
  //       "password": "123456",
  //       "position": "Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Mr. Rajon",
  //       "email": "rajon@gmail.com",
  //       "password": "123456",
  //       "position": "Jr. Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Mr. FRabbi",
  //       "email": "frabbi@gmail.com",
  //       "password": "123456",
  //       "position": "Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Mr. Sazzat",
  //       "email": "sazzat@gmail.com",
  //       "password": "123456",
  //       "position": "Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Md. Mahfuzur Rahman",
  //       "email": "mahfuzak08@gmail.com",
  //       "password": "123456",
  //       "position": "Sr. Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  // req.push({
  //   method: 'POST',
  //   url: 'http://localhost:3000/api/auth/signup',
  //   body: JSON.stringify({
  //       "full_name": "Md. Mahfuz Hossain",
  //       "email": "mahfuz.hossain@gmail.com",
  //       "password": "123456",
  //       "position": "Sr. Programmer"
  //   }),
  //   params: {
  //     headers: { 
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });
  
  // 1. login
  req.push({
    method: 'POST',
    url: 'http://localhost:3000/api/auth/signin',
    body: JSON.stringify({
      "email": "mahfuzak08@gmail.com",
      "password": "123456"
    }),
    params: {
      headers: { 
        'Content-Type': 'application/json',
      },
    },
  });

  // 2. get employee
  req.push({
    method: 'GET',
    url: 'http://localhost:3000/api/get/all/employee',
    params: {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQyOTQwNjQzLCJleHAiOjE2NDMwMjcwNDN9.E0lxHohU_MLcUtwlsqHzsvMTelg1UHa8Fslea7XA45w'
      }
    }
  });
  
  // 3. get employee by position
  req.push({
    method: 'GET',
    url: 'http://localhost:3000/api/get/employee_by_position?position_id=5',
    params: {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQyOTQwNjQzLCJleHAiOjE2NDMwMjcwNDN9.E0lxHohU_MLcUtwlsqHzsvMTelg1UHa8Fslea7XA45w'
      }
    }
  });
  
  req.push({
    method: 'GET',
    url: 'http://localhost:3000/api/get/employee_by_position?position_name=Programmer',
    params: {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQyOTQwNjQzLCJleHAiOjE2NDMwMjcwNDN9.E0lxHohU_MLcUtwlsqHzsvMTelg1UHa8Fslea7XA45w'
      }
    }
  });

  http.batch(req);
}