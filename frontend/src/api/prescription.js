const BASE_URL = "http://localhost:3000";

export const createPrescription = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/doctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // if you're using cookies/session
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to create prescription:", error);
    throw error;
  }
};
