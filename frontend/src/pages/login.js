const LoginPage = () => {
  const clientId = "301532834482-trf0vqmnetu7t58ghh9soubb21bnhpp6.apps.googleusercontent.com";

  // Check if the current URL matches the intended page where you want to display the login button
  const isLoginPage = window.location.pathname === "/login"; // Adjust the pathname as needed

  // Only append the login button if it's the intended page
  if (isLoginPage) {
    // Check if the login button container already exists in the DOM
    let loginContainer = document.querySelector(".login-container");
    
    // If loginContainer is null, create and append the login button container
    if (!loginContainer) {
      loginContainer = document.createElement("div");
      loginContainer.className = "login-container"; // Add class for styling if needed

      const googleLogin = document.createElement("button");
      googleLogin.type = "button";
      googleLogin.textContent = "Google Login";
      googleLogin.addEventListener("click", () => {
        // Handle Google login logic here
        console.log("Google login button clicked!");
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${window.location.origin}&response_type=token&scope=email%20profile`;

      });

      loginContainer.appendChild(googleLogin);
      document.body.appendChild(loginContainer);
    }
    
    loginContainer.style.marginTop = "60px"; // Adjust as needed
  }

  return null;
};

export default LoginPage;
