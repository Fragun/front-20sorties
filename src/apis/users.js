//  const API_USERS = "/api/users";

// export async function createUser(newUser) {
//     const response = await fetch(API_USERS, { 
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newUser)
//     })

//     const backResponse = await response.json();
//     if (response.ok) {
//         return backResponse;
//     } else {
//         if (backResponse) {
//             throw backResponse
//         } else {
//             throw new Error("Error Api CreateUser")
//         }
//     }
// }