/**
 * Simple API test harness for local backend
 * Requires Node 18+ (global fetch).
 */

const BASE_URL = process.env.API_URL || "http://localhost:8000";

async function run() {
  try {
    // Example: register user
    const registerPayload = {
      name: "Utkarsh",
      username: "Utkarsh13",
      password: "Utkarsh13",
    };

    const registerRes = await fetch(`${BASE_URL}/api/v1/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerPayload),
    });
    const registerJson = await registerRes
      .json()
      .catch(() => ({ status: registerRes.status }));
    console.log("register:", registerRes.status, registerJson);

    // Example: login to get token
    const loginPayload = {
      username: registerPayload.username,
      password: registerPayload.password,
    };

    const loginRes = await fetch(`${BASE_URL}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginPayload),
    });
    const loginJson = await loginRes
      .json()
      .catch(() => ({ status: loginRes.status }));
    console.log("login:", loginRes.status, loginJson);

    // Example: add activity with issued token
    if (loginJson?.token) {
      const activityPayload = { token: loginJson.token, meeting_code: "aa" };
      const activityRes = await fetch(
        `${BASE_URL}/api/v1/users/add_to_activity`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activityPayload),
        }
      );
      const activityJson = await activityRes
        .json()
        .catch(() => ({ status: activityRes.status }));
      console.log("add_to_activity:", activityRes.status, activityJson);
    } else {
      console.log("Skipping add_to_activity: no token from login");
    }
  } catch (err) {
    console.error("API test error:", err.message);
    process.exitCode = 1;
  }
}

run();
